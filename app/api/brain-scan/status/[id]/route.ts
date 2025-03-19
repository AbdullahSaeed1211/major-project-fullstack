import { NextRequest, NextResponse } from "next/server";
import { protectApiRoute, createErrorResponse } from "@/lib/auth";
import db from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";

// Flag to indicate ML model is under construction
const ML_MODEL_UNDER_CONSTRUCTION = true;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return protectApiRoute(async (userId) => {
    try {
      // Get params
      const resolvedParams = await params;
      const assessmentId = resolvedParams.id;
      
      if (!assessmentId) {
        return createErrorResponse("Assessment ID is required", 400);
      }
      
      await db.connect();
      
      const assessment = await Assessment.findById(assessmentId);
      
      if (!assessment) {
        return createErrorResponse("Assessment not found", 404);
      }
      
      // Verify ownership
      if (assessment.userId !== userId) {
        return createErrorResponse("Unauthorized", 403);
      }
      
      // Return the current status with construction info if appropriate
      return NextResponse.json({
        status: assessment.data.status || "unknown",
        result: assessment.data.status === "completed" ? assessment.data.result : null,
        modelStatus: ML_MODEL_UNDER_CONSTRUCTION ? "under_construction" : "production",
        note: ML_MODEL_UNDER_CONSTRUCTION && assessment.data.status !== "completed" ? 
          "ML model integration pending. Status updates will be simulated." : undefined
      });
      
    } catch (error) {
      console.error("Error retrieving brain scan status:", error);
      return createErrorResponse("Failed to retrieve scan status", 500);
    }
  });
} 