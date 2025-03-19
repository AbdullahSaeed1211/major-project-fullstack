import mongoose, { Schema, Document } from "mongoose";

export interface IGameResult extends Document {
  user: mongoose.Types.ObjectId;
  gameType: string;
  score: number;
  timeSpent: number; // in milliseconds
  movesOrAttempts: number;
  difficulty: string;
  completedAt: Date;
  cognitiveDomainsAffected: string[]; // e.g., ["Memory", "Attention"]
}

const GameResultSchema = new Schema<IGameResult>(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    gameType: { 
      type: String, 
      required: true,
      enum: ["memory-game", "concentration-game", "reaction-game"]
    },
    score: { 
      type: Number, 
      required: true 
    },
    timeSpent: { 
      type: Number, 
      required: true 
    },
    movesOrAttempts: { 
      type: Number, 
      required: true 
    },
    difficulty: { 
      type: String, 
      required: true,
      enum: ["easy", "medium", "hard"]
    },
    completedAt: { 
      type: Date, 
      default: Date.now 
    },
    cognitiveDomainsAffected: [{ 
      type: String,
      enum: ["Memory", "Attention", "Processing", "Executive", "Language"]
    }]
  },
  { timestamps: true }
);

// Index for faster queries
GameResultSchema.index({ user: 1, gameType: 1, completedAt: -1 });

export default mongoose.models.GameResult || 
  mongoose.model<IGameResult>("GameResult", GameResultSchema); 