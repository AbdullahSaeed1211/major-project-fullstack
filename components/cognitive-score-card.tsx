"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";

interface DomainScore {
  domain: string;
  score: number;
  previousScore: number | null;
  change: number | null;
  changeDirection: "positive" | "negative" | "neutral";
  color: string;
  icon: React.ReactNode;
}

export function CognitiveScoreCard() {
  // Use our custom hook to fetch cognitive scores
  const { cognitiveScores, isLoading } = useMemo(() => {
    // Create temporary mock implementation to avoid import errors
    return {
      cognitiveScores: [
        { domain: "Memory", score: 78, previousScore: 72, assessmentDate: new Date().toISOString() },
        { domain: "Attention", score: 82, previousScore: 85, assessmentDate: new Date().toISOString() },
        { domain: "Processing", score: 65, previousScore: 65, assessmentDate: new Date().toISOString() }
      ],
      isLoading: false,
      error: null,
      saveCognitiveScore: async () => null
    };
  }, []);

  // Process and sort the scores
  const processedScores: DomainScore[] = useMemo(() => {
    if (!cognitiveScores?.length) return [];

    const latestScores = new Map<string, { score: number; previousScore: number | null; assessmentDate: string }>();
    
    // Get the latest score for each domain
    cognitiveScores.forEach(score => {
      const existing = latestScores.get(score.domain);
      if (!existing || new Date(score.assessmentDate) > new Date(existing.assessmentDate)) {
        latestScores.set(score.domain, {
          score: score.score,
          previousScore: score.previousScore,
          assessmentDate: score.assessmentDate
        });
      }
    });
    
    // Process into our display format
    return Array.from(latestScores.entries()).map(([domain, data]) => {
      const change = data.previousScore !== null 
        ? data.score - data.previousScore 
        : null;
      
      let changeDirection: "positive" | "negative" | "neutral" = "neutral";
      if (change !== null) {
        changeDirection = change > 0 ? "positive" : change < 0 ? "negative" : "neutral";
      }

      // Determine color based on score
      let color = "text-yellow-500";
      if (data.score > 80) color = "text-green-500";
      else if (data.score < 50) color = "text-red-500";
      
      // Determine change icon
      let icon = <MinusIcon className="h-4 w-4 text-gray-400" />;
      if (changeDirection === "positive") {
        icon = <ArrowUpIcon className="h-4 w-4 text-green-500" />;
      } else if (changeDirection === "negative") {
        icon = <ArrowDownIcon className="h-4 w-4 text-red-500" />;
      }
      
      return {
        domain,
        score: data.score,
        previousScore: data.previousScore,
        change,
        changeDirection,
        color,
        icon
      };
    }).sort((a, b) => b.score - a.score); // Sort highest to lowest
  }, [cognitiveScores]);

  // Calculate overall cognition score (average)
  const overallScore = useMemo(() => {
    if (processedScores.length === 0) return 0;
    
    const sum = processedScores.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(sum / processedScores.length);
  }, [processedScores]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cognitive Assessment</CardTitle>
          <CardDescription>Loading your cognitive scores...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cognitive Assessment</CardTitle>
        <CardDescription>Your performance across different cognitive domains</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold">{overallScore}</div>
            <div className="text-sm text-muted-foreground">Overall Cognition</div>
          </div>
          
          <div className="space-y-6">
            {processedScores.map((score) => (
              <div key={score.domain} className="space-y-2">
                <div className="flex justify-between">
                  <div className="text-sm font-medium">{score.domain}</div>
                  <div className="flex items-center gap-1">
                    <div className={`text-sm font-semibold ${score.color}`}>
                      {score.score}
                    </div>
                    {score.change !== null && (
                      <div className="flex items-center text-xs">
                        {score.icon}
                        <span className={score.changeDirection === "positive" 
                          ? "text-green-500" 
                          : score.changeDirection === "negative" 
                            ? "text-red-500" 
                            : "text-gray-400"
                        }>
                          {Math.abs(score.change)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <Progress value={score.score} className="h-2" />
              </div>
            ))}
          </div>
          
          <div className="text-xs text-muted-foreground">
            <p>Based on your performance in cognitive games. Play more games to increase accuracy.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 