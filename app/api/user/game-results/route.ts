import { NextRequest } from "next/server";
import mongoose from "mongoose";
import db from "@/lib/mongodb";
import { getCurrentUserId } from "@/lib/auth";
import {
  badRequestResponse,
  createdResponse,
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse,
} from "@/lib/api-utils";

// Helper to get the GameResult model dynamically
const getGameResultModel = async () => {
  await db.connect();
  try {
    return mongoose.model('GameResult');
  } catch {
    // If model doesn't exist yet, this will import it
    const { default: GameResultModel } = await import("@/lib/models/GameResult");
    return GameResultModel;
  }
};

// Helper to get the User model dynamically
const getUserModel = async () => {
  await db.connect();
  try {
    return mongoose.model('User');
  } catch {
    // If model doesn't exist yet, this will import it
    const { default: UserModel } = await import("@/lib/models/User");
    return UserModel;
  }
};

// Define type for query object
interface GameResultQuery {
  user: mongoose.Types.ObjectId;
  gameType?: string;
  difficulty?: string;
}

// GET /api/user/game-results - Get the current user's game results
export async function GET(req: NextRequest) {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      return unauthorizedResponse("You must be logged in to access your game results");
    }

    // Connect to the database
    await db.connect();
    const User = await getUserModel();
    const GameResult = await getGameResultModel();

    // Find the user in the database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return notFoundResponse("User not found");
    }

    // Parse query parameters
    const searchParams = req.nextUrl.searchParams;
    const gameType = searchParams.get("gameType");
    const difficulty = searchParams.get("difficulty");
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * limit;

    // Build query with proper typing
    const query: GameResultQuery = { user: user._id };
    if (gameType) query.gameType = gameType;
    if (difficulty) query.difficulty = difficulty;

    // Get total count for pagination
    const total = await GameResult.countDocuments(query);

    // Get results with pagination
    const results = await GameResult.find(query)
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return successResponse({
      results,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error getting game results:", error);
    return serverErrorResponse("Failed to fetch game results");
  }
}

// POST /api/user/game-results - Create a new game result
export async function POST(req: NextRequest) {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      return unauthorizedResponse("You must be logged in to save game results");
    }

    // Parse the request body
    const data = await req.json();
    
    // Validate required fields
    const requiredFields = ["gameType", "score", "difficulty"];
    for (const field of requiredFields) {
      if (!data[field]) {
        return badRequestResponse(`Missing required field: ${field}`);
      }
    }

    // Connect to the database
    await db.connect();
    const User = await getUserModel();
    const GameResult = await getGameResultModel();

    // Find the user in the database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return notFoundResponse("User not found");
    }

    // Create the game result
    const gameResult = await GameResult.create({
      user: user._id,
      gameType: data.gameType,
      score: data.score,
      difficulty: data.difficulty,
      timeSpent: data.timeSpent,
      movesOrAttempts: data.movesOrAttempts,
      completedAt: data.completedAt || new Date(),
      cognitiveDomainsAffected: data.cognitiveDomainsAffected || [],
    });

    // Create an activity record for this game result
    try {
      // Get the Activity model
      const Activity = mongoose.models.Activity || 
        (await import("@/lib/models/Activity")).default;
      
      await Activity.create({
        user: user._id,
        activityType: `GAME_${data.gameType.toUpperCase()}`,
        completedAt: data.completedAt || new Date(),
        duration: data.timeSpent,
        metadata: {
          gameResult: gameResult._id,
          difficulty: data.difficulty,
          score: data.score
        }
      });
    } catch (activityError) {
      console.error("Error creating activity record:", activityError);
      // Continue even if activity creation fails
    }

    return createdResponse(gameResult, "Game result saved successfully");
  } catch (error) {
    console.error("Error saving game result:", error);
    return serverErrorResponse("Failed to save game result");
  }
} 