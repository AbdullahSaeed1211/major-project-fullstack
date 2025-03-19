import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";
import { withAuth, createErrorResponse } from "@/lib/auth";

interface AssessmentQuery {
  userId: string;
  type?: string;
}

export const GET = withAuth(async (req: NextRequest, userId: string) => {
  try {
    const url = new URL(req.url);
    const type = url.searchParams.get("type");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    await db.connect();

    const query: AssessmentQuery = { userId };
    if (type) {
      query.type = type;
    }

    const total = await Assessment.countDocuments(query);
    const assessments = await Assessment.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v");

    return NextResponse.json({
      status: "success",
      data: assessments,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    return createErrorResponse("Failed to fetch assessments", 500);
  }
});

export const POST = withAuth(async (req: NextRequest, userId: string) => {
  try {
    const body = await req.json();

    if (!body.type || !body.data) {
      return createErrorResponse("Missing required fields", 400);
    }

    await db.connect();

    const assessment = await Assessment.create({
      userId,
      type: body.type,
      data: body.data,
      result: body.result || "Unknown",
      risk: body.risk || "moderate",
      createdAt: new Date(),
    });

    return NextResponse.json({
      status: "success",
      data: assessment,
    });
  } catch (error) {
    console.error("Error creating assessment:", error);
    return createErrorResponse("Failed to create assessment", 500);
  }
}); 