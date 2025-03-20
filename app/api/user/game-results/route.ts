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
  try {
    await db.connect();
    try {
      return mongoose.model('GameResult');
    } catch {
      // If model doesn't exist yet, this will import it
      const { default: GameResultModel } = await import("@/lib/models/GameResult");
      return GameResultModel;
    }
  } catch (error) {
    console.error("MongoDB connection error in getGameResultModel:", error);
    throw new Error("Database connection failed");
  }
};

// Helper to get the User model dynamically
const getUserModel = async () => {
  try {
    await db.connect();
    try {
      return mongoose.model('User');
    } catch {
      // If model doesn't exist yet, this will import it
      const { default: UserModel } = await import("@/lib/models/User");
      return UserModel;
    }
  } catch (error) {
    console.error("MongoDB connection error in getUserModel:", error);
    throw new Error("Database connection failed");
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
    try {
      await db.connect();
    } catch (dbError) {
      console.error("Database connection failed:", dbError);
      return serverErrorResponse("Database connection failed. Please try again later.");
    }

    let User, GameResult;
    try {
      User = await getUserModel();
      GameResult = await getGameResultModel();
    } catch (modelError) {
      console.error("Error loading database models:", modelError);
      return serverErrorResponse("Error initializing database models. Please try again later.");
    }

    // Find the user in the database
    let user;
    try {
      user = await User.findOne({ clerkId: userId });
      if (!user) {
        return notFoundResponse("User not found");
      }
    } catch (userError) {
      console.error("Error finding user:", userError);
      return serverErrorResponse("Error retrieving user data. Please try again later.");
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
    let total, results;
    try {
      total = await GameResult.countDocuments(query);

      // Get results with pagination
      results = await GameResult.find(query)
        .sort({ completedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
    } catch (queryError) {
      console.error("Error querying game results:", queryError);
      if (queryError instanceof mongoose.Error.CastError) {
        return serverErrorResponse("Invalid query parameters");
      }
      return serverErrorResponse("Error retrieving game results. Please try again later.");
    }

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
    
    // Provide more specific error messages for common errors
    if (error instanceof mongoose.Error.ValidationError) {
      return serverErrorResponse("Data validation error");
    } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
      return notFoundResponse("Requested data not found");
    } else if (error instanceof mongoose.Error.CastError) {
      return serverErrorResponse("Invalid data format");
    }
    
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