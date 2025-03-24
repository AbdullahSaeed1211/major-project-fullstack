import { NextRequest, NextResponse } from 'next/server';
import { protectApiRoute } from '@/lib/auth';
import { predictStroke, StrokeRiskInput } from '@/lib/ml/stroke-model';
import { preloadModels } from '@/lib/ml/model-loader';

export async function POST(req: NextRequest) {
  return protectApiRoute(async () => {
    try {
      // Preload stroke model to avoid cold starts if possible
      try {
        await preloadModels(['stroke']);
      } catch (error) {
        console.warn('Failed to preload stroke model:', error);
      }

      // Parse request body
      const body = await req.json();
      
      // Validate required fields
      const requiredFields = [
        'gender', 'age', 'hypertension', 'heartDisease', 
        'everMarried', 'workType', 'residenceType', 
        'avgGlucoseLevel', 'bmi', 'smokingStatus'
      ];
      
      const missingFields = requiredFields.filter(field => !(field in body));
      
      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Missing required fields: ${missingFields.join(', ')}` },
          { status: 400 }
        );
      }
      
      // Parse input data
      const inputData: StrokeRiskInput = {
        gender: body.gender,
        age: Number(body.age),
        hypertension: Number(body.hypertension) as 0 | 1,
        heartDisease: Number(body.heartDisease) as 0 | 1,
        everMarried: body.everMarried,
        workType: body.workType,
        residenceType: body.residenceType,
        avgGlucoseLevel: Number(body.avgGlucoseLevel),
        bmi: Number(body.bmi),
        smokingStatus: body.smokingStatus
      };
      
      // Optional parameters
      const options = {
        version: body.version,
        forceRefresh: body.forceRefresh === true
      };
      
      // Run prediction
      const prediction = await predictStroke(inputData, options);
      
      // Save the prediction to the database if needed
      // This would be implemented here
      
      return NextResponse.json(prediction);
    } catch (error) {
      console.error('Stroke prediction error:', error);
      
      return NextResponse.json(
        { error: 'Failed to process stroke risk prediction' },
        { status: 500 }
      );
    }
  });
}

// Optionally, you can add a GET method for model information
export async function GET() {
  return protectApiRoute(async () => {
    return NextResponse.json({
      modelInfo: {
        name: 'Stroke Risk Prediction Model',
        description: 'Predicts the risk of stroke based on various health and demographic factors',
        features: [
          'Gender', 'Age', 'Hypertension', 'Heart Disease',
          'Marital Status', 'Work Type', 'Residence Type',
          'Average Glucose Level', 'BMI', 'Smoking Status'
        ],
        outputClasses: [
          'Very Low Risk', 'Low Risk', 'Moderate Risk',
          'High Risk', 'Very High Risk'
        ],
        version: 'latest'
      }
    });
  });
}