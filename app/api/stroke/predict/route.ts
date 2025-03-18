import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { mapFormToModelInput, predictStroke } from "@/lib/ml/stroke-model";

export async function POST(request: NextRequest) {
  console.log("🔍 [Stroke Prediction] Processing new prediction request");
  
  try {
    // Get user ID if authenticated
    // @ts-expect-error Clerk types don't properly support the request parameter
    const auth = getAuth({ request });
    const userId = auth.userId;
    
    if (userId) {
      console.log(`👤 [Stroke Prediction] Authenticated user: ${userId}`);
    } else {
      console.log("👤 [Stroke Prediction] Anonymous user request");
    }
    
    // Parse request body
    const body = await request.json();
    console.log(`📄 [Stroke Prediction] Received data with ${Object.keys(body).length} fields`);
    
    // Validate required fields
    const requiredFields = ['gender', 'age', 'hypertension', 'heartDisease', 'avgGlucoseLevel', 'bmi'];
    const missingFields = requiredFields.filter(field => body[field] == null);
    
    if (missingFields.length > 0) {
      console.error(`❌ [Stroke Prediction] Missing required fields: ${missingFields.join(', ')}`);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
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
    if (modelInput.avgGlucoseLevel > 140) riskFactors.push('High Glucose');
    if (modelInput.bmi > 30) riskFactors.push('Obesity');
    
    if (riskFactors.length > 0) {
      console.log(`⚠️ [Stroke Prediction] Risk factors identified: ${riskFactors.join(', ')}`);
    } else {
      console.log("ℹ️ [Stroke Prediction] No major risk factors identified");
    }
    
    // Predict stroke risk
    console.log("🧠 [Stroke Prediction] Running prediction model");
    const prediction = await predictStroke(modelInput);
    console.log(`✅ [Stroke Prediction] Prediction completed: ${prediction.prediction} with ${(prediction.probability * 100).toFixed(2)}% probability`);
    
    // Log prediction if authenticated
    if (userId) {
      console.log(`📝 [Stroke Prediction] Recording prediction for user ${userId}`);
      
      // In a real app, you would save this to a database:
      // await StrokePrediction.create({
      //   userId,
      //   inputs: modelInput,
      //   prediction: prediction.prediction,
      //   probability: prediction.probability,
      //   timestamp: new Date()
      // });
    }
    
    console.log("✅ [Stroke Prediction] Request completed successfully");
    
    // Return prediction results
    return NextResponse.json(prediction);
  } catch (error) {
    console.error("❌ [Stroke Prediction] Error:", error);
    return NextResponse.json(
      { error: "Failed to predict stroke risk" },
      { status: 500 }
    );
  }
} 