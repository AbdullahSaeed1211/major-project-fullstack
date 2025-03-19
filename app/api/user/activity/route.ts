import { NextRequest } from "next/server";
import mongoose from "mongoose";
import db from "@/lib/mongodb";
import { getCurrentUserId } from "@/lib/auth";
import {
  notFoundResponse,
  serverErrorResponse,
  successResponse,
  unauthorizedResponse,
} from "@/lib/api-utils";

// Helper to get the Activity model dynamically
const getActivityModel = async () => {
  await db.connect();
  try {
    return mongoose.model('Activity');
  } catch {
    // If model doesn't exist yet, this will import it
    const { default: ActivityModel } = await import("@/lib/models/Activity");
    return ActivityModel;
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
interface ActivityQuery {
  user: mongoose.Types.ObjectId;
  activityType?: string;
  completedAt?: {
    $gte?: Date;
    $lte?: Date;
  };
}

// GET /api/user/activity - Get the current user's activity history
export async function GET(req: NextRequest) {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      return unauthorizedResponse("You must be logged in to access your activity history");
    }

    // Connect to the database
    await db.connect();
    const User = await getUserModel();
    const Activity = await getActivityModel();

    // Find the user in the database
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return notFoundResponse("User not found");
    }

    // Parse query parameters
    const searchParams = req.nextUrl.searchParams;
    const activityType = searchParams.get("activityType");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * limit;

    // Build query
    const query: ActivityQuery = { user: user._id };
    
    // Add activity type filter if provided
    if (activityType) {
      query.activityType = activityType;
    }
    
    // Add date range filters if provided
    if (startDate || endDate) {
      query.completedAt = {};
      
      if (startDate) {
        query.completedAt.$gte = new Date(startDate);
      }
      
      if (endDate) {
        query.completedAt.$lte = new Date(endDate);
      }
    }

    // Get total count for pagination
    const total = await Activity.countDocuments(query);

    // Get results with pagination
    const activities = await Activity.find(query)
      .sort({ completedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Group activities by date for better presentation
    const groupedActivities = activities.reduce((acc, activity) => {
      const date = new Date(activity.completedAt).toISOString().split('T')[0];
      
      if (!acc[date]) {
        acc[date] = [];
      }
      
      acc[date].push(activity);
      return acc;
    }, {} as Record<string, typeof activities>);

    return successResponse({
      activities: groupedActivities,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error getting activity history:", error);
    return serverErrorResponse("Failed to fetch activity history");
  }
} 