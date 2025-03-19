import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";

interface RouteContext {
  params: { id: string };
}

export const GET = withAuth<RouteContext>(async (
  request: NextRequest,
  userId: string,
  context
) => {
  try {
    // Use optional chaining with nullish coalescing for safer access
    const assessmentId = context?.params?.id;
    if (!assessmentId) {
      return createErrorResponse("Assessment ID is required", 400);
    }
    
    await connectToDatabase();
    
    const assessment = await Assessment.findById(assessmentId);
    
    if (!assessment) {
      return createErrorResponse("Assessment not found", 404);
    }
    
    // Verify ownership
    if (assessment.userId !== userId) {
      return createErrorResponse("Unauthorized", 403);
    }
    
    // Return the current status
    return NextResponse.json({
      status: assessment.data.status || "unknown",
      result: assessment.data.status === "completed" ? assessment.data.result : null,
    });
    
  } catch (error) {
    console.error("Error retrieving brain scan status:", error);
    return createErrorResponse("Failed to retrieve scan status", 500);
  }
}); 