import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/database";
import { Assessment } from "@/lib/models/Assessment";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    // @ts-expect-error Clerk types don't properly support the request parameter
    const auth = getAuth({ request });
    const userId = auth.userId;
    
    // Check if authenticated
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }
    
    // Handle file upload (we need a multipart parser here)
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "application/dicom"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: "Invalid file type. Supported formats: JPEG, PNG, DICOM" 
      }, { status: 400 });
    }
    
    // Create a unique filename
    const ext = file.name.split(".").pop();
    const filename = `${uuidv4()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadDir, filename);
    
    // Save the file
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    
    // In a real implementation, you would:
    // 1. Process the image with your ML model or send to an external API
    // 2. Store the results
    
    // For now, creating a placeholder for the assessment
    await connectToDatabase();
    const assessment = await Assessment.create({
      userId,
      type: 'tumor',
      result: 'Pending analysis',
      risk: 'moderate', // Initial risk level until processing completes
      data: { 
        filePath,
        status: 'processing',
        submitted: new Date()
      },
      date: new Date(),
    });
    
    // Here you would typically:
    // 1. Send the job to a queue for background processing
    // 2. Return a job ID for status polling
    
    // For now, return the assessment ID
    return NextResponse.json({
      message: "Scan uploaded successfully and queued for analysis",
      assessmentId: assessment._id,
      status: "processing"
    });
    
  } catch (error) {
    console.error("Brain scan upload error:", error);
    return NextResponse.json(
      { error: "Failed to process brain scan" },
      { status: 500 }
    );
  }
} 