"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ReactionTest() {
  const [gameState, setGameState] = useState<"idle" | "waiting" | "ready" | "clicked" | "finished">("idle");
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [trials, setTrials] = useState<number[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up any timers when component unmounts
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Start the game
  const handleStart = () => {
    setGameState("waiting");
    setCountdown(3);
    setAttemptsLeft(5);
    setTrials([]);
    setBestTime(null);
    
    // Start countdown
    const intervalId = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          startTrial();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Start a single trial
  const startTrial = () => {
    // Random delay between 1-5 seconds
    const randomDelay = 1000 + Math.random() * 4000;
    
    setGameState("waiting");
    
    // Set a timeout to show the target
    timerRef.current = setTimeout(() => {
      setStartTime(Date.now());
      setGameState("ready");
    }, randomDelay);
  };

  // Handle the user's click
  const handleClick = () => {
    // If clicked too early (before the target appears)
    if (gameState === "waiting") {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setGameState("clicked");
      setReactionTime(-1); // Indicate a false start
      
      // After a pause, start the next trial or end the game
      setTimeout(() => {
        if (attemptsLeft > 1) {
          setAttemptsLeft((prev) => prev - 1);
          startTrial();
        } else {
          setGameState("finished");
        }
      }, 1500);
      
      return;
    }
    
    // If clicked when the target is visible
    if (gameState === "ready") {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      
      // Update trials array
      const newTrials = [...trials, time];
      setTrials(newTrials);
      
      // Update best time
      if (bestTime === null || time < bestTime) {
        setBestTime(time);
      }
      
      setGameState("clicked");
      
      // After a pause, start the next trial or end the game
      setTimeout(() => {
        if (attemptsLeft > 1) {
          setAttemptsLeft((prev) => prev - 1);
          startTrial();
        } else {
          setGameState("finished");
        }
      }, 1500);
    }
  };

  // Get the average reaction time
  const getAverageTime = () => {
    const validTrials = trials.filter(time => time > 0);
    if (validTrials.length === 0) return 0;
    
    const sum = validTrials.reduce((acc, time) => acc + time, 0);
    return sum / validTrials.length;
  };

  // Get feedback on reaction time
  const getFeedback = (averageTime: number) => {
    // Based on general reaction time ranges
    if (averageTime === 0) return "No valid attempts";
    if (averageTime < 200) return "Extremely fast! This is exceptional.";
    if (averageTime < 250) return "Very fast! Your reflexes are excellent.";
    if (averageTime < 300) return "Good reflexes! Above average performance.";
    if (averageTime < 350) return "Average reaction time. This is normal.";
    if (averageTime < 450) return "Slightly slower than average. Consider regular practice.";
    return "Your reaction time could use some improvement with practice.";
  };

  // Get health insights
  const getHealthInsights = (averageTime: number) => {
    if (averageTime === 0) return "";
    
    // General brain health insights based on reaction time
    if (averageTime > 450) {
      return "Slower reaction times can be affected by fatigue, stress, or dehydration. Regular exercise and adequate sleep may help improve your reaction time.";
    }
    
    if (averageTime > 350) {
      return "Your reaction time is within normal range. Staying physically active and maintaining good sleep habits can help maintain or improve your reaction time.";
    }
    
    return "Your quick reaction time suggests good neurological health. Continue with brain-stimulating activities to maintain this performance.";
  };

  // Render the current state
  const renderGameState = () => {
    switch (gameState) {
      case "idle":
        return (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-center text-muted-foreground">
              This test measures how quickly you can respond to a visual stimulus. Click the button when it turns green!
            </p>
            <Button onClick={handleStart}>Start Test</Button>
          </div>
        );
        
      case "waiting":
        if (countdown > 0) {
          return (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-xl font-bold">Get Ready!</p>
              <p className="text-4xl font-bold">{countdown}</p>
            </div>
          );
        }
        
        return (
          <div 
            className="w-full aspect-square bg-yellow-500 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={handleClick}
          >
            <p className="text-xl font-bold text-black">Wait...</p>
          </div>
        );
        
      case "ready":
        return (
          <div 
            className="w-full aspect-square bg-green-500 rounded-lg flex items-center justify-center cursor-pointer"
            onClick={handleClick}
          >
            <p className="text-xl font-bold text-black">Click Now!</p>
          </div>
        );
        
      case "clicked":
        return (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-xl font-bold">
              {reactionTime === -1 
                ? "Too early! Wait for green." 
                : `Your reaction time: ${reactionTime} ms`}
            </p>
            <Progress value={(5 - attemptsLeft) * 20} className="w-full" />
            <p className="text-sm text-muted-foreground">{attemptsLeft} attempts left</p>
          </div>
        );
        
      case "finished":
        const averageTime = getAverageTime();
        
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{averageTime.toFixed(0)} ms</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Best Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{bestTime || 0} ms</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Results</CardTitle>
                <CardDescription>
                  {getFeedback(averageTime)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {getHealthInsights(averageTime)}
                </p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Health Connection:</h4>
                  <p className="text-sm text-muted-foreground">
                    Reaction time is linked to brain processing speed and can be an indicator of neurological health. 
                    Slower reaction times can sometimes be associated with increased stroke risk factors such as high blood pressure or poor sleep habits.
                  </p>
                </div>
                
                <Button onClick={handleStart} className="w-full mt-4">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Reaction Time Test</h2>
        <p className="text-muted-foreground">
          Test your brain's processing speed and reflex time.
        </p>
      </div>
      
      {renderGameState()}
    </div>
  );
} 