"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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

  // Initialize the game when difficulty changes
  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  // Initialize the game
  const initializeGame = () => {
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

  // Provide feedback based on performance
  const provideFeedback = (timeElapsed: number, moves: number, totalPairs: number) => {
    const seconds = timeElapsed / 1000;
    const perfectMoves = totalPairs * 2; // Ideal minimum moves
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">Memory Card Game</h2>
        <p className="text-muted-foreground">
          Test and improve your short-term memory. Match pairs of cards to complete the game.
        </p>
      </div>

      <Tabs defaultValue="easy" className="w-full" onValueChange={(value) => setDifficulty(value as Difficulty)}>
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
        </div>
        <Button onClick={initializeGame}>Restart Game</Button>
      </div>

      <div className={cn(
        "grid gap-2",
        difficulty === "easy" ? "grid-cols-3 sm:grid-cols-4" : 
        difficulty === "medium" ? "grid-cols-4 sm:grid-cols-4" : 
        "grid-cols-4 sm:grid-cols-6"
      )}>
        {cards.map((card) => (
          <div
            key={card.id}
            className={cn(
              "aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300",
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
          </CardContent>
        </Card>
      )}
    </div>
  );
} 