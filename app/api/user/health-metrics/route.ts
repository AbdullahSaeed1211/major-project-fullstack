import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/database";
import { HealthMetric } from "@/lib/models/HealthMetric"; // You need to create this model

export async function GET(request: NextRequest) {
  try {
    // @ts-expect-error Clerk types don't properly support the request parameter
    const auth = getAuth({ request });
    const userId = auth.userId;
    
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    
    await connectToDatabase();
    
    const metrics = await HealthMetric.find({ userId })
      .sort({ date: -1 })
      .limit(10);
    
    return NextResponse.json({ metrics });
    
  } catch (error) {
    console.error("Error retrieving health metrics:", error);
    return NextResponse.json(
      { error: "Failed to retrieve health metrics" },
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
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    
    const body = await request.json();
    
    if (!body.name || !body.value || !body.unit) {
      return NextResponse.json({ 
        error: "Missing required fields: name, value, unit" 
      }, { status: 400 });
    }
    
    await connectToDatabase();
    
    // Determine status based on metric type and value
    let status = "normal";
    if (body.name === "Blood Pressure") {
      status = Number(body.value) > 140 ? "warning" : 
              Number(body.value) > 160 ? "critical" : "normal";
    } else if (body.name === "Glucose") {
      status = Number(body.value) > 100 ? "warning" : 
              Number(body.value) > 140 ? "critical" : "normal";
    } else if (body.name === "BMI") {
      status = Number(body.value) > 25 ? "warning" : 
              Number(body.value) > 30 ? "critical" : "normal";
    }
    
    const metric = await HealthMetric.create({
      userId,
      name: body.name,
      value: body.value,
      unit: body.unit,
      status,
      date: new Date(),
    });
    
    return NextResponse.json({ metric });
    
  } catch (error) {
    console.error("Error saving health metric:", error);
    return NextResponse.json(
      { error: "Failed to save health metric" },
      { status: 500 }
    );
  }
} 