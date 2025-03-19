"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameResults } from "@/hooks/use-game-results";
import { formatDistanceToNow } from "date-fns";
import { Brain, Clock, Target, ChevronDown, ChevronUp, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function getActivityIcon(gameType: string) {
  switch (gameType) {
    case "memory-game":
      return <Brain className="h-4 w-4" />;
    case "reaction-test":
      return <Clock className="h-4 w-4" />;
    case "visual-attention":
      return <Target className="h-4 w-4" />;
    case "mental-math":
      return <Calculator className="h-4 w-4" />;
    default:
      return <Brain className="h-4 w-4" />;
  }
}

function formatActivityName(gameType: string) {
  return gameType
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "easy":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "hard":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
}

export function ActivityHistory() {
  const { gameResults, isLoading } = useGameResults();
  const [expanded, setExpanded] = useState(false);
  
  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading activity history...</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!gameResults.length) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center text-center py-12">
          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Activity Yet</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Complete cognitive activities to see your history here.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // Sort by most recent
  const sortedResults = [...gameResults].sort((a, b) => 
    new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );
  
  // Limit to 5 unless expanded
  const displayResults = expanded ? sortedResults : sortedResults.slice(0, 5);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest brain training activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayResults.map((result) => (
            <div key={result.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
              <div className="bg-primary/10 p-2 rounded-full">
                {getActivityIcon(result.gameType)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium truncate">
                    {formatActivityName(result.gameType)}
                  </h4>
                  <div className={cn("px-2 py-1 rounded-md text-xs font-medium", getDifficultyColor(result.difficulty))}>
                    {result.difficulty}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(result.completedAt), { addSuffix: true })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Score: {result.score}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Time: {(result.timeSpent / 1000).toFixed(1)}s
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {sortedResults.length > 5 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show Less" : "Show More"} 
              {expanded ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 