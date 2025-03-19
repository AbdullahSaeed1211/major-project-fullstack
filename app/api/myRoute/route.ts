import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
) {
  const paramValues = await params;
  const testBody = await request.json();
  // Function continues here
  
  // Return a response using the variables
  return NextResponse.json({ 
    success: true,
    receivedParams: paramValues,
    receivedBody: testBody
  });
} 