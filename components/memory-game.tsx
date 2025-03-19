"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { GameResult, CognitiveScore } from "@/lib/types";

// Card icons for the memory game
const CARD_ICONS = [
  "🧠", "❤️", "🏥", "💊", "🩺", "🍎", "🥦", "🏃", 
  "💧", "🛌", "🧘", "⏱️", "🚭", "🥗", "📊", "🧪"
];

type MemoryCard = {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
};

type Difficulty = "easy" | "medium" | "hard";

interface GameStats {
  moves: number;
  matches: number;
  startTime: number;
  endTime: number | null;
}

export function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [gameStats, setGameStats] = useState<GameStats>({
    moves: 0,
    matches: 0,
    startTime: Date.now(),
    endTime: null,
  });
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  
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

  // Shuffle an array using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Initialize the game
  const initializeGame = useCallback(() => {
    const cardCount = difficulty === "easy" ? 12 : difficulty === "medium" ? 16 : 24;
    const iconCount = cardCount / 2;
    const selectedIcons = CARD_ICONS.slice(0, iconCount);
    
    // Create pairs of cards with the same icon
    const cardPairs = [...selectedIcons, ...selectedIcons].map((icon, index) => ({
      id: index,
      icon,
      isFlipped: false,
      isMatched: false,
    }));
    
    // Shuffle the cards
    const shuffledCards = shuffleArray(cardPairs);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setIsGameComplete(false);
    setGameStats({
      moves: 0,
      matches: 0,
      startTime: Date.now(),
      endTime: null,
    });
    setFeedback("");
    setTimeElapsed(0);
  }, [difficulty]);

  // Initialize the game when difficulty changes
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);
  
  // Setup timer for the game
  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    
    if (!isGameComplete && cards.length > 0) {
      timerId = setInterval(() => {
        setTimeElapsed(Date.now() - gameStats.startTime);
      }, 100);
    }
    
    // Cleanup function
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isGameComplete, cards.length, gameStats.startTime]);

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore if the card is already flipped or matched
    if (
      cards[id].isFlipped ||
      cards[id].isMatched ||
      flippedCards.length >= 2
    ) {
      return;
    }

    // Flip the card
    const updatedCards = [...cards];
    updatedCards[id].isFlipped = true;
    setCards(updatedCards);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // If two cards are flipped, check for a match
    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = updatedCards[firstId];
      const secondCard = updatedCards[secondId];

      setGameStats((prev) => ({
        ...prev,
        moves: prev.moves + 1,
      }));

      // Check if the icons match
      if (firstCard.icon === secondCard.icon) {
        // Mark as matched
        updatedCards[firstId].isMatched = true;
        updatedCards[secondId].isMatched = true;
        
        // Update stats
        const newMatches = gameStats.matches + 1;
        setGameStats((prev) => ({
          ...prev,
          matches: newMatches,
        }));

        // Clear flipped cards
        setFlippedCards([]);
        
        // Check if all cards are matched
        const totalPairs = cards.length / 2;
        if (newMatches === totalPairs) {
          const endTime = Date.now();
          setGameStats((prev) => ({
            ...prev,
            endTime,
          }));
          setIsGameComplete(true);
          saveGameData(endTime);
          provideFeedback(endTime - gameStats.startTime, gameStats.moves, totalPairs);
        }
      } else {
        // If no match, flip back after a delay
        setTimeout(() => {
          updatedCards[firstId].isFlipped = false;
          updatedCards[secondId].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Save game data to our persistent storage
  const saveGameData = async (endTime: number) => {
    const timeSpent = endTime - gameStats.startTime;
    const totalPairs = cards.length / 2;
    const perfectMoves = totalPairs;
    const efficiency = Math.min(1, perfectMoves / gameStats.moves);
    
    // Calculate score based on efficiency and time
    // Higher efficiency and lower time = better score
    const maxScore = 100;
    const efficiencyFactor = 0.7; // 70% of score based on efficiency
    const timeFactor = 0.3; // 30% of score based on time
    
    // Time score decreases as time increases
    // Assuming 3 seconds per pair is the optimal time
    const optimalTime = totalPairs * 3000;
    const timeScore = Math.max(0, 1 - (timeSpent - optimalTime) / (optimalTime * 2));
    
    const score = Math.round(
      maxScore * (efficiency * efficiencyFactor + timeScore * timeFactor)
    );
    
    try {
      // Save the game result
      await saveGameResult({
        gameType: "memory-game",
        score,
        timeSpent,
        movesOrAttempts: gameStats.moves,
        difficulty,
      });
      
      // Also save this as a cognitive score for memory domain
      await saveCognitiveScore({
        domain: "Memory",
        score,
      });
    } catch (error) {
      console.error("Failed to save game result:", error);
    }
  };

  // Provide feedback based on performance
  const provideFeedback = (timeElapsed: number, moves: number, totalPairs: number) => {
    const seconds = timeElapsed / 1000;
    const perfectMoves = totalPairs; // Ideal minimum moves (pairs)
    const efficiency = perfectMoves / moves;
    
    let feedbackMessage = "";
    
    if (efficiency > 0.8) {
      feedbackMessage = "Excellent memory! Your brain health is in top shape.";
    } else if (efficiency > 0.6) {
      feedbackMessage = "Good job! Your memory is working well.";
    } else if (efficiency > 0.4) {
      feedbackMessage = "Not bad. Regular memory exercises can help improve your skills.";
    } else {
      feedbackMessage = "Keep practicing! Memory games can help strengthen neural connections.";
    }
    
    feedbackMessage += ` You completed the game in ${seconds.toFixed(1)} seconds.`;
    
    setFeedback(feedbackMessage);
  };

  // Brain health tips related to memory
  const memoryTips = [
    "Regular physical exercise increases blood flow to the brain, enhancing memory formation",
    "A good night's sleep is essential for memory consolidation",
    "Reducing stress through meditation can improve memory recall",
    "A diet rich in antioxidants and omega-3 fatty acids supports brain health",
    "Learning new skills creates new neural pathways, keeping your brain sharp"
  ];
  
  // Format time for display
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Memory Card Game</h2>
        <p className="text-muted-foreground">
          Test and improve your short-term memory. Match pairs of cards to complete the game.
        </p>
      </div>

      <Tabs defaultValue="easy" className="w-full" onValueChange={(value: string) => setDifficulty(value as Difficulty)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="easy">Easy</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="hard">Hard</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium">Moves: {gameStats.moves}</p>
          <p className="text-sm font-medium">Matches: {gameStats.matches} of {cards.length / 2}</p>
          <p className="text-sm font-medium">Time: {formatTime(timeElapsed)}</p>
        </div>
        <Button onClick={initializeGame}>Restart Game</Button>
      </div>

      <div className={cn(
        "grid gap-2",
        difficulty === "easy" 
          ? "grid-cols-2 xs:grid-cols-3 sm:grid-cols-4" 
          : difficulty === "medium" 
            ? "grid-cols-3 xs:grid-cols-4 sm:grid-cols-4" 
            : "grid-cols-3 xs:grid-cols-4 sm:grid-cols-6"
      )}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={cn(
              "aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 min-h-[60px]",
              card.isFlipped || card.isMatched
                ? "bg-primary text-primary-foreground text-3xl"
                : "bg-muted text-transparent hover:bg-muted/80"
            )}
            onClick={() => handleCardClick(card.id)}
          >
            {(card.isFlipped || card.isMatched) ? card.icon : "?"}
          </div>
        ))}
      </div>

      {isGameComplete && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-2">Game Complete!</h3>
            <p>{feedback}</p>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Brain Health Tips:</h4>
              <p className="text-sm text-muted-foreground">{memoryTips[Math.floor(Math.random() * memoryTips.length)]}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={initializeGame}>Play Again</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 