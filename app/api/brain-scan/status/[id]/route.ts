import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/database";
import { Assessment } from "@/lib/models/Assessment";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // @ts-expect-error Clerk types don't properly support the request parameter
    const auth = getAuth({ request });
    const userId = auth.userId;
    
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    
    const assessmentId = params.id;
    
    if (!assessmentId) {
      return NextResponse.json({ error: "Assessment ID is required" }, { status: 400 });
    }
    
    await connectToDatabase();
    
    const assessment = await Assessment.findById(assessmentId);
    
    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }
    
    // Verify ownership
    if (assessment.userId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    
    // Return the current status
    return NextResponse.json({
      status: assessment.data.status || "unknown",
      result: assessment.data.status === "completed" ? assessment.data.result : null,
    });
    
  } catch (error) {
    console.error("Error retrieving brain scan status:", error);
    return NextResponse.json(
      { error: "Failed to retrieve scan status" },
      { status: 500 }
    );
  }
} 