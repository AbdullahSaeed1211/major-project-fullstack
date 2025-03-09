import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import HealthMetric from "@/lib/models/HealthMetric";

export async function GET(request: Request) {
  try {
    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "10");
    
    await connectToDatabase();
    
    const metrics = await HealthMetric.find({ userId })
      .sort({ date: -1 })
      .limit(limit);
    
    return NextResponse.json({ metrics });
  } catch (error) {
    console.error("Error fetching health metrics:", error);
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
    const { name, value, unit, status, date } = body;
    
    if (!name || value === undefined || !unit || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    await connectToDatabase();
    
    const metric = await HealthMetric.create({
      userId,
      name,
      value,
      unit,
      status,
      date: date || new Date(),
    });
    
    return NextResponse.json({ metric });
  } catch (error) {
    console.error("Error creating health metric:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 