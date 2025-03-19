import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { HealthMetric } from "@/lib/models/HealthMetric";

interface MetricQuery {
  userId: string;
  name?: string;
}

// Get metrics for the authenticated user
export const GET = withAuth(async (request: NextRequest, userId: string) => {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const type = url.searchParams.get("type");
    
    await connectToDatabase();
    
    const query: MetricQuery = { userId };
    if (type) query.name = type;
    
    const metrics = await HealthMetric.find(query)
      .sort({ date: -1 })
      .limit(limit);
    
    return NextResponse.json({ metrics });
  } catch (error) {
    return createErrorResponse("Failed to fetch health metrics", {
      status: 500,
      code: "health_metrics_fetch_error",
      details: error instanceof Error ? error.message : undefined
    });
  }
});

// Create a new metric for the authenticated user
export const POST = withAuth(async (request: NextRequest, userId: string) => {
  try {
    const body = await request.json();
    const { name, value, unit } = body;
    
    if (!name || value === undefined || !unit) {
      return createErrorResponse("Missing required fields", {
        status: 400,
        code: "invalid_request"
      });
    }
    
    await connectToDatabase();
    
    // Determine status based on metric type and value
    let status = "normal";
    if (name === "Blood Pressure") {
      status = Number(value) > 140 ? "warning" : 
              Number(value) > 160 ? "critical" : "normal";
    } else if (name === "Glucose") {
      status = Number(value) > 100 ? "warning" : 
              Number(value) > 140 ? "critical" : "normal";
    } else if (name === "BMI") {
      status = Number(value) > 25 ? "warning" : 
              Number(value) > 30 ? "critical" : "normal";
    }
    
    const metric = await HealthMetric.create({
      userId,
      name,
      value,
      unit,
      status: body.status || status,
      date: new Date()
    });
    
    return NextResponse.json({ metric });
  } catch (error) {
    return createErrorResponse("Failed to create health metric", {
      status: 500, 
      code: "health_metric_creation_error",
      details: error instanceof Error ? error.message : undefined
    });
  }
}); 