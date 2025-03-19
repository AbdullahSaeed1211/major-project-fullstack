import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import db from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";

export const GET = withAuth(async (request: NextRequest, userId: string) => {
  try {
    await db.connect();
    
    // Get query parameters
    const url = new URL(request.url);
    const type = url.searchParams.get("type"); // Optional filter by type
    
    // Build query
    interface AssessmentQuery {
      userId: string;
      type?: string;
    }
    
    const query: AssessmentQuery = { userId };
    if (type) {
      query.type = type;
    }
    
    const assessments = await Assessment.find(query)
      .sort({ date: -1 })
      .limit(20);
    
    return NextResponse.json({ assessments });
    
  } catch (error) {
    console.error("Error retrieving assessments:", error);
    return createErrorResponse("Failed to retrieve assessments", 500);
  }
}); 