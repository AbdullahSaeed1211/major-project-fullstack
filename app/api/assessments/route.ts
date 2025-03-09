import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";

export async function GET(request: Request) {
  try {
    const { userId } = getAuth(request);
    
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

export async function POST(request: Request) {
  try {
    const { userId } = getAuth(request);
    
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