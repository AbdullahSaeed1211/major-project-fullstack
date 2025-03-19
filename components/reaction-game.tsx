"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { GameResult, CognitiveScore } from "@/lib/types";

type Difficulty = "easy" | "medium" | "hard";
type GameState = "idle" | "waiting" | "ready" | "clicked" | "complete";

interface ReactionResult {
  reactionTime: number;
  valid: boolean;
}

export function ReactionGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [gameState, setGameState] = useState<GameState>("idle");
  const [results, setResults] = useState<ReactionResult[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [averageTime, setAverageTime] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [countdownText, setCountdownText] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Save game result function
  const saveGameResult = async (result: Omit<GameResult, "id" | "userId" | "completedAt">) => {
    try {
      // In production, this would save to a database
      console.log("Saving game result:", result);
      // Return a mock result
      return {
        ...result,
        id: Math.random().toString(36).substring(2, 9),
        userId: "current-user",
        completedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error("Failed to save game result:", error);
      throw error;
    }
  };
  
  // Save cognitive score function
  const saveCognitiveScore = async (data: Pick<CognitiveScore, "domain" | "score">) => {
    try {
      // In production, this would save to a database
      console.log("Saving cognitive score:", data);
      // Return a mock result
      return {
        ...data,
        id: Math.random().toString(36).substring(2, 9),
        userId: "current-user",
        previousScore: null,
        assessmentDate: new Date().toISOString()
      };
    } catch (error) {
      console.error("Failed to save cognitive score:", error);
      throw error;
    }
  };

  // Start a new game
  const startGame = () => {
    setGameState("waiting");
    setResults([]);
    setAverageTime(null);
    setFeedback("");
    setCountdownText("Wait for the green color...");
    
    // Set a random time to wait before showing the target
    const waitTime = getRandomWaitTime();
    
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setGameState("ready");
      setStartTime(Date.now());
    }, waitTime);
  };

  // Handle click on the target area
  const handleClick = () => {
    if (gameState === "waiting") {
      // Clicked too early
      if (timerRef.current) clearTimeout(timerRef.current);
      
      setGameState("clicked");
      setCountdownText("Too early! Click to try again.");
      
      // Record as invalid attempt
      setResults(prev => [...prev, { reactionTime: 0, valid: false }]);
      
      return;
    }
    
    if (gameState === "ready") {
      // Calculate reaction time
      const endTime = Date.now();
      const reactionTime = startTime ? endTime - startTime : 0;
      
      // Record the result
      setResults(prev => [...prev, { reactionTime, valid: true }]);
      
      // Check if we've completed all rounds
      if (results.length + 1 >= getRoundsForDifficulty()) {
        completeGame(reactionTime);
      } else {
        // Prepare for next round
        setGameState("clicked");
        setCountdownText(`${reactionTime}ms - Click to continue`);
      }
    }
    
    if (gameState === "clicked" || gameState === "complete") {
      if (results.length >= getRoundsForDifficulty()) {
        // Game is already complete
        setGameState("idle");
      } else {
        // Start next round
        startGame();
      }
    }
  };

  // Complete the game and calculate final results
  const completeGame = (finalReactionTime: number) => {
    const validResults = [...results, { reactionTime: finalReactionTime, valid: true }]
      .filter(r => r.valid);
    
    if (validResults.length > 0) {
      const total = validResults.reduce((sum, r) => sum + r.reactionTime, 0);
      const avg = Math.round(total / validResults.length);
      setAverageTime(avg);
      
      // Save game data
      saveGameData(avg);
      
      // Provide feedback
      provideFeedback(avg);
    }
    
    setGameState("complete");
    setCountdownText(`Average: ${averageTime}ms - Click to restart`);
  };

  // Save game data to our persistent storage
  const saveGameData = async (avgReactionTime: number) => {
    // Convert reaction time to a score (faster = higher score)
    // Baseline: 200ms = 100 points, 400ms = 0 points
    const baselineMax = 200;
    const baselineMin = 400;
    
    const score = Math.round(100 * Math.max(0, Math.min(1, 
      (baselineMin - avgReactionTime) / (baselineMin - baselineMax)
    )));
    
    try {
      // Save the game result
      await saveGameResult({
        gameType: "reaction-game",
        score,
        timeSpent: results.length * 2000, // Approximate time spent
        movesOrAttempts: results.length,
        difficulty,
      });
      
      // Also save this as a cognitive score for processing speed domain
      await saveCognitiveScore({
        domain: "Processing",
        score,
      });
    } catch (error) {
      console.error("Failed to save game result:", error);
    }
  };

  // Provide feedback based on performance
  const provideFeedback = (avgTime: number) => {
    let feedbackMessage = "";
    
    if (avgTime < 220) {
      feedbackMessage = "Lightning fast! Your processing speed is exceptional.";
    } else if (avgTime < 280) {
      feedbackMessage = "Very quick! Your reaction time is above average.";
    } else if (avgTime < 350) {
      feedbackMessage = "Good job! Your reaction time is within normal range.";
    } else {
      feedbackMessage = "Keep practicing! Regular exercises can help improve your processing speed.";
    }
    
    setFeedback(feedbackMessage);
  };

  // Get random wait time based on difficulty
  const getRandomWaitTime = () => {
    const baseTime = 1000; // 1 second minimum
    const maxAdditionalTime = difficulty === "easy" ? 4000 : 
                             difficulty === "medium" ? 6000 : 8000;
    
    return baseTime + Math.random() * maxAdditionalTime;
  };

  // Get number of rounds based on difficulty
  const getRoundsForDifficulty = () => {
    return difficulty === "easy" ? 3 : 
           difficulty === "medium" ? 5 : 7;
  };

  // Processing speed tips
  const processingTips = [
    "Regular cardiovascular exercise can improve neural processing speed",
    "Adequate sleep is essential for optimal brain processing",
    "Practicing quick decision-making games can enhance processing speed",
    "Staying hydrated helps maintain optimal brain function",
    "Reducing stress through relaxation techniques can improve neural efficiency"
  ];

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Get the appropriate color for the reaction area
  const getReactionAreaColor = () => {
    switch (gameState) {
      case "waiting":
        return "bg-red-500 hover:bg-red-600";
      case "ready":
        return "bg-green-500 hover:bg-green-600";
      case "clicked":
      case "complete":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-muted hover:bg-muted/80";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Reaction Time Game</h2>
        <p className="text-muted-foreground">
          Test and improve your processing speed. Click when the color changes to green.
        </p>
      </div>

      <Tabs 
        defaultValue="easy" 
        className="w-full" 
        onValueChange={(value: string) => setDifficulty(value as Difficulty)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="easy" disabled={gameState !== "idle"}>Easy</TabsTrigger>
          <TabsTrigger value="medium" disabled={gameState !== "idle"}>Medium</TabsTrigger>
          <TabsTrigger value="hard" disabled={gameState !== "idle"}>Hard</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col items-center justify-center gap-4">
        {gameState === "idle" ? (
          <Button onClick={startGame} size="lg">Start Game</Button>
        ) : (
          <>
            <div className="text-sm font-medium mb-2">
              Round: {results.length + 1} of {getRoundsForDifficulty()}
            </div>
            
            <div
              className={cn(
                "w-full h-48 rounded-lg flex items-center justify-center cursor-pointer transition-colors",
                getReactionAreaColor()
              )}
              onClick={handleClick}
            >
              <p className="text-center text-white font-medium">
                {countdownText}
              </p>
            </div>
            
            <div className="w-full">
              <div className="text-sm font-medium mb-2">Previous times:</div>
              <div className="flex flex-wrap gap-2">
                {results.filter(r => r.valid).map((result, index) => (
                  <div 
                    key={index}
                    className="px-3 py-1 bg-muted rounded text-sm"
                  >
                    {result.reactionTime}ms
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {gameState === "complete" && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">Game Complete!</h3>
            <p>Your average reaction time: {averageTime}ms</p>
            <p>{feedback}</p>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Brain Health Tips:</h4>
              <p className="text-sm text-muted-foreground">
                {processingTips[Math.floor(Math.random() * processingTips.length)]}
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={startGame}>Play Again</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 