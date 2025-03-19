import { NextRequest, NextResponse } from "next/server";
import { withAuth, createErrorResponse } from "@/lib/auth";
import { mapFormToModelInput, predictStroke } from "@/lib/stroke-model";
import db from "@/lib/mongodb";
import Assessment from "@/lib/models/Assessment";

// Flag to indicate ML model is under construction
const ML_MODEL_UNDER_CONSTRUCTION = true;

export const POST = withAuth(async (request: NextRequest, userId: string) => {
  console.log("🔍 [Stroke Prediction] Processing new prediction request");
  console.log(`👤 [Stroke Prediction] Authenticated user: ${userId}`);
  
  try {
    // Parse request body
    const body = await request.json();
    console.log(`📄 [Stroke Prediction] Received data with ${Object.keys(body).length} fields`);
    
    // Validate required fields
    const requiredFields = ['gender', 'age', 'hypertension', 'heartDisease', 'avgGlucoseLevel', 'bmi'];
    const missingFields = requiredFields.filter(field => body[field] == null);
    
    if (missingFields.length > 0) {
      console.error(`❌ [Stroke Prediction] Missing required fields: ${missingFields.join(', ')}`);
      return createErrorResponse(`Missing required fields: ${missingFields.join(', ')}`, 400);
    }
    
    // Convert form data to model input format
    console.log("🔄 [Stroke Prediction] Converting input data to model format");
    const modelInput = mapFormToModelInput(body);
    
    // Log risk factors
    const riskFactors = [];
    if (modelInput.hypertension === 1) riskFactors.push('Hypertension');
    if (modelInput.heartDisease === 1) riskFactors.push('Heart Disease');
    if (modelInput.age > 65) riskFactors.push('Age > 65');
    if (modelInput.smokingStatus === 'smokes') riskFactors.push('Smoking');
    if (modelInput.avgGlucoseLevel > 140) riskFactors.push('High Blood Glucose');
    if (modelInput.bmi > 30) riskFactors.push('Obesity');
    
    console.log(`🩺 [Stroke Prediction] Risk factors identified: ${riskFactors.join(', ') || 'None'}`);
    
    let prediction;
    
    if (ML_MODEL_UNDER_CONSTRUCTION) {
      console.log("⚠️ [Stroke Prediction] Using placeholder model - ML integration pending");
      // Determine prediction based on risk factors count
      const riskCount = riskFactors.length;
      
      // Simple placeholder logic
      if (riskCount === 0) {
        prediction = { prediction: "Very Low Risk", probability: 0.05 };
      } else if (riskCount === 1) {
        prediction = { prediction: "Low Risk", probability: 0.15 };
      } else if (riskCount === 2) {
        prediction = { prediction: "Moderate Risk", probability: 0.30 };
      } else if (riskCount === 3) {
        prediction = { prediction: "High Risk", probability: 0.60 };
      } else {
        prediction = { prediction: "Very High Risk", probability: 0.80 };
      }
    } else {
      // Predict stroke risk using the actual model
      console.log("🧠 [Stroke Prediction] Running prediction model");
      prediction = await predictStroke(modelInput);
    }
    
    console.log(`🔮 [Stroke Prediction] Prediction result: ${prediction.prediction}, Probability: ${prediction.probability}`);
    
    // Save the assessment result
    await db.connect();
    
    await Assessment.create({
      userId,
      type: 'stroke-risk',
      result: prediction.prediction,
      risk: getRiskLevel(prediction.probability),
      data: {
        ...modelInput,
        riskFactors,
        modelStatus: ML_MODEL_UNDER_CONSTRUCTION ? 'placeholder' : 'production'
      },
      date: new Date()
    });
    
    console.log("✅ [Stroke Prediction] Assessment saved to database");
    
    return NextResponse.json({
      ...prediction,
      riskFactors,
      modelStatus: ML_MODEL_UNDER_CONSTRUCTION ? 'under_construction' : 'production'
    });
    
  } catch (error) {
    console.error("❌ [Stroke Prediction] Error:", error);
    return createErrorResponse(
      "Failed to process stroke risk assessment", 
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