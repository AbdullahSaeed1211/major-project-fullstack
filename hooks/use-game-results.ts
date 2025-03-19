"use client";

import { useState, useEffect } from "react";
import type { GameResult } from "@/lib/types";
import { useAuth } from "@clerk/nextjs";

// Define the type for game result input
interface GameResultInput {
  gameType: string;
  score: number;
  difficulty: string;
  timeSpent: number;
  movesOrAttempts: number;
  cognitiveDomainsAffected?: string[];
}

export function useGameResults() {
  const [results, setResults] = useState<GameResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoaded, isSignedIn } = useAuth();

  // Fetch game results when the component mounts
  useEffect(() => {
    if (!isLoaded) return; // Wait for auth to load
    
    async function fetchResults() {
      if (!isSignedIn) {
        // Not signed in - use local storage or return empty array
        try {
          const storedResults = localStorage.getItem('gameResults');
          if (storedResults) {
            setResults(JSON.parse(storedResults));
          } else {
            setResults([]);
          }
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching local game results:", err);
          setError("Failed to load game results");
          setIsLoading(false);
        }
      } else {
        // Use API if signed in
        try {
          const response = await fetch("/api/user/game-results");
          
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          
          const data = await response.json();
          
          if (data.success) {
            setResults(data.data.results);
          } else {
            throw new Error(data.error || "Failed to load game results");
          }
          
          setIsLoading(false);
        } catch (err) {
          console.error("Error fetching game results:", err);
          setError(err instanceof Error ? err.message : "Failed to load game results");
          setIsLoading(false);
        }
      }
    }
    
    fetchResults();
  }, [isLoaded, isSignedIn]);

  // Save a game result
  const saveGameResult = async (result: GameResultInput) => {
    try {
      setIsLoading(true);
      
      if (!isSignedIn) {
        // Not signed in - save to local storage
        const newResult: GameResult = {
          id: crypto.randomUUID(),
          userId: "local", // Local user
          gameType: result.gameType,
          score: result.score,
          difficulty: result.difficulty,
          timeSpent: result.timeSpent,
          movesOrAttempts: result.movesOrAttempts,
          completedAt: new Date().toISOString()
        };
        
        const updatedResults = [newResult, ...results];
        
        // Save to localStorage
        localStorage.setItem('gameResults', JSON.stringify(updatedResults));
        
        // Update the state with the new result
        setResults(updatedResults);
      } else {
        // Save to API if signed in
        const response = await fetch("/api/user/game-results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            gameType: result.gameType,
            score: result.score,
            difficulty: result.difficulty,
            timeSpent: result.timeSpent,
            movesOrAttempts: result.movesOrAttempts,
            cognitiveDomainsAffected: result.cognitiveDomainsAffected || [],
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.error || "Failed to save game result");
        }
        
        // Refresh the results after saving
        const refreshResponse = await fetch("/api/user/game-results");
        const refreshData = await refreshResponse.json();
        
        if (refreshData.success) {
          setResults(refreshData.data.results);
        }
      }
      
      setError(null);
    } catch (err) {
      console.error("Error saving game result:", err);
      setError(err instanceof Error ? err.message : "Failed to save game result");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    results,
    isLoading,
    error,
    saveGameResult,
  };
} 