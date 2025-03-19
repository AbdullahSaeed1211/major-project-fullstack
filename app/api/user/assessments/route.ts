import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/database";
import { Assessment } from "@/lib/models/Assessment";

export async function GET(request: NextRequest) {
  try {
    // @ts-expect-error Clerk types don't properly support the request parameter
    const auth = getAuth({ request });
    const userId = auth.userId;
    
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    
    await connectToDatabase();
    
    // Get query parameters
    const url = new URL(request.url);
    const type = url.searchParams.get("type"); // Optional filter by type
    
    // Build query
    const query: any = { userId };
    if (type) {
      query.type = type;
    }
    
    const assessments = await Assessment.find(query)
      .sort({ date: -1 })
      .limit(20);
    
    return NextResponse.json({ assessments });
    
  } catch (error) {
    console.error("Error retrieving assessments:", error);
    return NextResponse.json(
      { error: "Failed to retrieve assessments" },
      { status: 500 }
    );
  }
} 