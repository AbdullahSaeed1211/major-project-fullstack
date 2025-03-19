import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { mapFormToModelInput, predictStroke } from "@/lib/stroke-model";
import { connectToDatabase } from "@/lib/database";
import { Assessment } from "@/lib/models/Assessment";

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
    if (modelInput.avgGlucoseLevel > 140) riskFactors.push('High Blood Glucose');
    if (modelInput.bmi > 30) riskFactors.push('Obesity');
    
    console.log(`🩺 [Stroke Prediction] Risk factors identified: ${riskFactors.join(', ') || 'None'}`);
    
    // Use the model to get prediction
    const prediction = predictStroke(modelInput);
    console.log(`📊 [Stroke Prediction] Result: ${prediction.prediction} (${prediction.probability.toFixed(2)})`);
    
    // Save assessment if user is authenticated
    if (userId) {
      try {
        await connectToDatabase();
        await Assessment.create({
          userId: userId,
          type: 'stroke',
          result: `${prediction.prediction} (${(prediction.probability * 100).toFixed(2)}%)`,
          risk: prediction.prediction === 'Likely' ? 'high' : 'low',
          data: { 
            input: modelInput, 
            result: prediction,
            riskFactors 
          },
        });
        console.log(`💾 [Stroke Prediction] Assessment saved for user: ${userId}`);
      } catch (dbError) {
        console.error("Database error:", dbError);
        // Continue despite DB error - don't fail the request
      }
    }
    
    // Return the prediction result
    return NextResponse.json({
      prediction: prediction.prediction,
      probability: prediction.probability,
      riskFactors: riskFactors,
    });
    
  } catch (error) {
    console.error("❌ [Stroke Prediction] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 