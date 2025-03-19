// Data models for our application

export interface GameResult {
  id: string;
  userId: string;
  gameType: string;
  score: number;
  timeSpent: number;
  movesOrAttempts: number;
  difficulty: string;
  completedAt: string;
}

export interface CognitiveScore {
  id: string;
  userId: string;
  domain: string;
  score: number;
  previousScore: number | null;
  assessmentDate: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  activityType: string;
  completedAt: string;
  duration: number;
  metadata: Record<string, unknown>;
}

export interface UserAchievement {
  id: string;
  userId: string;
  title: string;
  description: string;
  unlockedAt: string | null;
  progress: number;
  requiredValue: number;
  icon: string;
}

export interface BrainHealthMetric {
  id: string;
  userId: string;
  score: number;
  date: string;
  domains: {
    memory: number;
    attention: number;
    processing: number;
    executive: number;
    language: number;
  }
}

export interface TrainingPlan {
  id: string;
  userId: string;
  focus: string[];
  weeklyActivities: {
    day: string;
    activities: {
      type: string;
      duration: number;
      difficulty: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
} 