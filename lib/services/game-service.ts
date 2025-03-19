"use client";

import { db } from "@/lib/db";
import { GameResult } from "@/lib/types";

export async function saveGameResult(result: Omit<GameResult, "id" | "userId" | "completedAt">): Promise<GameResult> {
  const gameResult: GameResult = {
    id: crypto.randomUUID(),
    userId: "current-user", // In a real app, this would be the actual user ID
    completedAt: new Date().toISOString(),
    ...result
  };
  
  return await db.add<GameResult>("gameResults", gameResult);
}

export async function getGameResults(): Promise<GameResult[]> {
  const results = await db.getAll<GameResult>("gameResults");
  return results;
}

export async function getGameResultsByType(gameType: string): Promise<GameResult[]> {
  const results = await getGameResults();
  return results.filter(result => result.gameType === gameType);
}

export async function deleteGameResult(id: string): Promise<void> {
  await db.delete("gameResults", id);
} 