"use client";

import { useState, useEffect } from "react";
import { saveGameResult as saveResult, getGameResults, getGameResultsByType } from "@/lib/services/game-service";
import type { GameResult } from "@/lib/types";

export function useGameResults(gameType?: string) {
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);
        const results = gameType 
          ? await getGameResultsByType(gameType)
          : await getGameResults();
        setGameResults(results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch game results"));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchResults();
  }, [gameType]);
  
  const saveGameResult = async (result: Omit<GameResult, "id" | "userId" | "completedAt">) => {
    try {
      const savedResult = await saveResult(result);
      setGameResults(prev => [...prev, savedResult]);
      return savedResult;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to save game result");
      setError(error);
      throw error;
    }
  };
  
  return {
    gameResults,
    isLoading,
    error,
    saveGameResult,
  };
} 