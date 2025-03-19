"use client";

import { db } from "@/lib/db";
import { CognitiveScore } from "@/lib/types";

export async function saveCognitiveScore(
  score: Pick<CognitiveScore, "domain" | "score">
): Promise<CognitiveScore> {
  // Get previous score if it exists
  const scores = await getCognitiveScores();
  const previousScore = scores
    .filter(s => s.domain === score.domain)
    .sort((a, b) => new Date(b.assessmentDate).getTime() - new Date(a.assessmentDate).getTime())[0]?.score || null;
  
  const cognitiveScore: CognitiveScore = {
    id: crypto.randomUUID(),
    userId: "current-user", // In a real app, this would be the actual user ID
    domain: score.domain,
    score: score.score,
    previousScore,
    assessmentDate: new Date().toISOString()
  };
  
  return await db.add<CognitiveScore>("cognitiveScores", cognitiveScore);
}

export async function getCognitiveScores(): Promise<CognitiveScore[]> {
  const scores = await db.getAll<CognitiveScore>("cognitiveScores");
  return scores;
}

export async function getCognitiveScoresByDomain(domain: string): Promise<CognitiveScore[]> {
  const scores = await getCognitiveScores();
  return scores.filter(score => score.domain === domain);
} 