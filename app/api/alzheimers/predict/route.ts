import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import db from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";

export const POST = withAuth(async (request: NextRequest, userId: string) => {
  console.log("🔍 [Alzheimer's Prediction] Processing new prediction request");
  console.log(`👤 [Alzheimer's Prediction] Authenticated user: ${userId}`);
  
  try {
    // Parse request body
    const body = await request.json();
    console.log(`📄 [Alzheimer's Prediction] Received data with ${Object.keys(body).length} fields`);
    
    // Validate required fields
    const requiredFields = ['age', 'sex', 'education', 'memoryComplaints', 'familyHistory', 
                           'cognitiveAssessment', 'mobility', 'independentLiving'];
    const missingFields = requiredFields.filter(field => body[field] == null);
    
    if (missingFields.length > 0) {
      console.error(`❌ [Alzheimer's Prediction] Missing required fields: ${missingFields.join(', ')}`);
      return createErrorResponse(`Missing required fields: ${missingFields.join(', ')}`, 400);
    }
    
    // Process risk factors
    const riskFactors = [];
    if (body.age > 65) riskFactors.push('Age > 65');
    if (body.memoryComplaints) riskFactors.push('Memory Complaints');
    if (body.familyHistory) riskFactors.push('Family History');
    if (body.cognitiveAssessment < 24) riskFactors.push('Low Cognitive Score');
    if (body.mobility === 'limited') riskFactors.push('Limited Mobility');
    if (body.independentLiving === 'needs assistance') riskFactors.push('Needs Assistance');
    
    console.log(`🩺 [Alzheimer's Prediction] Risk factors identified: ${riskFactors.join(', ') || 'None'}`);
    
    // Under construction placeholder logic
    console.log("⚠️ [Alzheimer's Prediction] Using placeholder model - ML integration pending");
    
    // Simulated prediction logic based on risk factors
    const riskCount = riskFactors.length;
    let prediction;
    
    if (riskCount === 0) {
      prediction = { 
        prediction: "Very Low Risk", 
        probability: 0.05,
        recommendation: "Continue regular health check-ups" 
      };
    } else if (riskCount === 1) {
      prediction = { 
        prediction: "Low Risk", 
        probability: 0.15,
        recommendation: "Consider cognitive screening at your next check-up" 
      };
    } else if (riskCount === 2) {
      prediction = { 
        prediction: "Moderate Risk", 
        probability: 0.30,
        recommendation: "Discuss cognitive screening with your doctor"
      };
    } else if (riskCount === 3) {
      prediction = { 
        prediction: "High Risk", 
        probability: 0.60,
        recommendation: "Consult with a neurologist for evaluation"
      };
    } else {
      prediction = { 
        prediction: "Very High Risk", 
        probability: 0.80,
        recommendation: "Urgent consultation with a specialist recommended"
      };
    }
    
    console.log(`🔮 [Alzheimer's Prediction] Prediction result: ${prediction.prediction}`);
    
    // Save the assessment result
    await db.connect();
    
    await Assessment.create({
      userId,
      type: 'alzheimers-risk',
      result: prediction.prediction,
      risk: getRiskLevel(prediction.probability),
      data: {
        ...body,
        riskFactors,
        recommendation: prediction.recommendation,
        modelStatus: 'placeholder'
      },
      date: new Date()
    });
    
    console.log("✅ [Alzheimer's Prediction] Assessment saved to database");
    
    return NextResponse.json({
      ...prediction,
      riskFactors,
      modelStatus: "under_construction"
    });
    
  } catch (error) {
    console.error("❌ [Alzheimer's Prediction] Error:", error);
    return createErrorResponse(
      "Failed to process Alzheimer's risk assessment", 
      500
    );
  }
});

// Helper function to convert probability to risk level
function getRiskLevel(probability: number): string {
  if (probability < 0.1) return 'low';
  if (probability < 0.3) return 'moderate';
  return 'high';
} 