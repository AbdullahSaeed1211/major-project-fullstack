import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import AssessmentModel from "@/lib/models/Assessment";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = withAuth(async (request: NextRequest, userId: string) => {
  try {
    // Handle file upload (we need a multipart parser here)
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return createErrorResponse("No file provided", 400);
    }
    
    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "application/dicom"];
    if (!validTypes.includes(file.type)) {
      return createErrorResponse("Invalid file type. Supported formats: JPEG, PNG, DICOM", 400);
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
    const assessment = await AssessmentModel.create({
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
    return createErrorResponse("Failed to process brain scan", 500);
  }
}); 