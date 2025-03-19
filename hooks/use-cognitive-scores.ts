"use client";

import { useState, useEffect } from "react";
import { saveCognitiveScore as saveScore, getCognitiveScores, getCognitiveScoresByDomain } from "@/lib/services/cognitive-service";
import type { CognitiveScore } from "@/lib/types";

export function useCognitiveScores(domain?: string) {
  const [cognitiveScores, setCognitiveScores] = useState<CognitiveScore[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchScores = async () => {
      try {
        setIsLoading(true);
        const scores = domain 
          ? await getCognitiveScoresByDomain(domain)
          : await getCognitiveScores();
        setCognitiveScores(scores);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch cognitive scores"));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchScores();
  }, [domain]);
  
  const saveCognitiveScore = async (score: Pick<CognitiveScore, "domain" | "score">) => {
    try {
      const savedScore = await saveScore(score);
      setCognitiveScores(prev => [...prev, savedScore]);
      return savedScore;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to save cognitive score");
      setError(error);
      throw error;
    }
  };
  
  return {
    cognitiveScores,
    isLoading,
    error,
    saveCognitiveScore,
  };
} 