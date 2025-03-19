import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";

export const GET = withAuth(async (request: NextRequest, userId: string) => {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    
    await connectToDatabase();
    
    const query = { userId };
    if (type) {
      Object.assign(query, { type });
    }
    
    const assessments = await Assessment.find(query)
      .sort({ date: -1 })
      .limit(limit);
    
    return NextResponse.json({ assessments });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    return createErrorResponse("Internal server error", 500);
  }
});

export const POST = withAuth(async (request: NextRequest, userId: string) => {
  try {
    const body = await request.json();
    const { type, result, risk, data } = body;
    
    if (!type || !result || !risk) {
      return createErrorResponse("Missing required fields", 400);
    }
    
    await connectToDatabase();
    
    const assessment = await Assessment.create({
      userId,
      type,
      result,
      risk,
      data: data || {},
      date: new Date()
    });
    
    return NextResponse.json({ assessment });
  } catch (error) {
    console.error("Error creating assessment:", error);
    return createErrorResponse("Internal server error", 500);
  }
}); 