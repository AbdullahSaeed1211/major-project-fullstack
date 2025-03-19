import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import db from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Flag to indicate ML model is under construction
const ML_MODEL_UNDER_CONSTRUCTION = true;

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
    
    console.log(`📁 [Brain Scan] File saved at: ${filePath}`);
    
    // For now, creating a placeholder for the assessment
    await db.connect();
    
    const assessmentData = {
      userId,
      type: 'tumor',
      result: ML_MODEL_UNDER_CONSTRUCTION ? 'Pending ML integration' : 'Pending analysis',
      risk: 'moderate',
      data: { 
        filePath,
        status: 'processing',
        submitted: new Date(),
        modelStatus: ML_MODEL_UNDER_CONSTRUCTION ? 'under_construction' : 'pending'
      },
      date: new Date(),
    };
    
    const assessment = await Assessment.create(assessmentData);
    
    console.log("✅ [Brain Scan] Assessment record created");
    
    if (ML_MODEL_UNDER_CONSTRUCTION) {
      console.log("⚠️ [Brain Scan] ML model under construction - using placeholder");
      
      // Simulating a scheduled analysis completion in a real system
      // In production, this would be handled by a background worker
      setTimeout(async () => {
        try {
          await db.connect();
          
          // Simulate analysis results with placeholder data
          await Assessment.findByIdAndUpdate(assessment._id, {
            result: "No anomalies detected (simulated)",
            risk: "low",
            "data.status": "completed",
            "data.result": {
              conclusion: "No anomalies detected (simulated)",
              confidence: 0.87,
              processingTime: "00:12:34",
              note: "This is placeholder data. Real ML analysis pending implementation."
            }
          });
          
          console.log(`✅ [Brain Scan] Simulated analysis completed for ${assessment._id}`);
        } catch (err) {
          console.error("❌ [Brain Scan] Error in simulated analysis:", err);
        }
      }, 30000); // Simulate 30 second processing time
    }
    
    return NextResponse.json({
      message: "Scan uploaded successfully and queued for analysis",
      assessmentId: assessment._id,
      status: "processing",
      modelStatus: ML_MODEL_UNDER_CONSTRUCTION ? "under_construction" : "production",
      estimatedTime: ML_MODEL_UNDER_CONSTRUCTION ? "30 seconds (simulated)" : "5-10 minutes"
    });
    
  } catch (error) {
    console.error("Brain scan upload error:", error);
    return createErrorResponse("Failed to process brain scan", 500);
  }
}); 