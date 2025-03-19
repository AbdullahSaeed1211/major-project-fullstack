import { getAuth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";

export async function GET(request: NextRequest) {
  try {
    // @ts-expect-error Clerk types don't properly support the request parameter
    const auth = getAuth({ request });
    const userId = auth.userId;
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
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
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // @ts-expect-error Clerk types don't properly support the request parameter
    const auth = getAuth({ request });
    const userId = auth.userId;
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    const { type, result, risk, data, date } = body;
    
    if (!type || !result || !risk) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    const assessment = await Assessment.create({
      userId,
      type,
      result,
      risk,
      data: data || {},
      date: date || new Date(),
    });
    
    return NextResponse.json({ assessment });
  } catch (error) {
    console.error("Error creating assessment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 