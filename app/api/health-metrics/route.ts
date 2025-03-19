import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { HealthMetric } from "@/lib/models/HealthMetric";

export const GET = withAuth(async (request: NextRequest, userId: string) => {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    
    await connectToDatabase();
    
    const metrics = await HealthMetric.find({ userId })
      .sort({ date: -1 })
      .limit(limit);
    
    return NextResponse.json({ metrics });
  } catch (error) {
    console.error("Error fetching health metrics:", error);
    return createErrorResponse("Internal server error", 500);
  }
});

export const POST = withAuth(async (request: NextRequest, userId: string) => {
  try {
    const body = await request.json();
    const { name, value, unit, status } = body;
    
    if (!name || value === undefined || !unit) {
      return createErrorResponse("Missing required fields", 400);
    }
    
    await connectToDatabase();
    
    const metric = await HealthMetric.create({
      userId,
      name,
      value,
      unit,
      status: status || 'normal',
      date: new Date()
    });
    
    return NextResponse.json({ metric });
  } catch (error) {
    console.error("Error creating health metric:", error);
    return createErrorResponse("Internal server error", 500);
  }
}); 