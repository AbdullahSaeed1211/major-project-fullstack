import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/mongodb";
import { withAuth, createErrorResponse } from "@/lib/auth";
import { HealthMetric } from "@/lib/models/HealthMetric";

interface MetricQuery {
  userId: string;
  date?: {
    $gte?: Date;
    $lte?: Date;
  };
}

// Get metrics for the authenticated user
export const GET = withAuth(async (request: NextRequest, userId: string) => {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;
    
    const startDate = url.searchParams.get("startDate");
    const endDate = url.searchParams.get("endDate");
    
    await db.connect();
    
    // Build query
    const query: MetricQuery = { userId };
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    
    const [metrics, total] = await Promise.all([
      HealthMetric.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit),
      HealthMetric.countDocuments(query)
    ]);
    
    return NextResponse.json({
      metrics,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
    
  } catch (error) {
    console.error("Error fetching health metrics:", error);
    return createErrorResponse("Internal server error", 500);
  }
});

// Create a new metric for the authenticated user
export const POST = withAuth(async (request: NextRequest, userId: string) => {
  try {
    const body = await request.json();
    
    await db.connect();
    
    const healthMetric = await HealthMetric.create({
      userId,
      ...body,
      date: body.date ? new Date(body.date) : new Date()
    });
    
    return NextResponse.json({ healthMetric });
  } catch (error) {
    console.error("Error creating health metric:", error);
    return createErrorResponse("Internal server error", 500);
  }
}); 