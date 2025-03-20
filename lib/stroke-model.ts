import * as tf from '@tensorflow/tfjs';

// Interface for stroke risk input data
export interface StrokeRiskInput {
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  hypertension: 0 | 1;
  heartDisease: 0 | 1;
  everMarried: 'Yes' | 'No';
  workType: 'Private' | 'Self-employed' | 'Govt_job' | 'children' | 'Never_worked';
  residenceType: 'Urban' | 'Rural';
  avgGlucoseLevel: number;
  bmi: number;
  smokingStatus: 'formerly smoked' | 'never smoked' | 'smokes' | 'Unknown';
}

// Interface for model prediction result
export interface PredictionResult {
  prediction: string;
  probability: number;
}

// Interface for normalization parameters
interface NormalizationParams {
  [key: string]: {
    mean: number;
    std: number;
  };
}

// Risk categories based on probability thresholds
const RISK_CATEGORIES = {
  'Very Low Risk': 0.1,
  'Low Risk': 0.2,
  'Moderate Risk': 0.4,
  'High Risk': 0.6,
  'Very High Risk': 0.8
};

// Flag to use the placeholder model until the TensorFlow.js model is properly loaded
let useTemporaryModel = true;
let strokeModel: tf.GraphModel | null = null;
let normalization: NormalizationParams | null = null;

// Initialize the model
export async function initializeStrokeModel(): Promise<void> {
  try {
    // Load the model
    console.log('Loading stroke prediction model...');
    strokeModel = await tf.loadGraphModel('/models/stroke-model/model.json');
    
    // Load normalization parameters
    const normResponse = await fetch('/models/stroke-model/normalization.json');
    normalization = await normResponse.json() as NormalizationParams;
    
    console.log('Stroke prediction model loaded successfully');
    useTemporaryModel = false;
  } catch (error) {
    console.error('Failed to load stroke prediction model:', error);
    console.log('Using temporary placeholder model instead');
    useTemporaryModel = true;
  }
}

// One-hot encode categorical features
function oneHotEncode(value: string, categories: string[]): number[] {
  const encoded = new Array(categories.length).fill(0);
  const index = categories.indexOf(value);
  if (index !== -1) {
    encoded[index] = 1;
  }
  return encoded;
}

// Normalize numeric features
function normalizeFeature(value: number, feature: string): number {
  if (!normalization || !normalization[feature]) return value;
  
  const { mean, std } = normalization[feature];
  return (value - mean) / std;
}

// Map form data to model input format
export function mapFormToModelInput(data: StrokeRiskInput): StrokeRiskInput {
  return {
    gender: data.gender,
    age: data.age,
    hypertension: data.hypertension,
    heartDisease: data.heartDisease,
    everMarried: data.everMarried,
    workType: data.workType,
    residenceType: data.residenceType,
    avgGlucoseLevel: data.avgGlucoseLevel,
    bmi: data.bmi,
    smokingStatus: data.smokingStatus
  };
}

// Prepare tensor input for the model
function prepareModelInput(data: StrokeRiskInput): tf.Tensor {
  // Normalize numeric features
  const normalizedAge = normalizeFeature(data.age, 'age');
  const normalizedGlucose = normalizeFeature(data.avgGlucoseLevel, 'avgGlucoseLevel');
  const normalizedBmi = normalizeFeature(data.bmi, 'bmi');
  
  // One-hot encode categorical features
  const genderEncoded = oneHotEncode(data.gender, ['Female', 'Male', 'Other']);
  const marriedEncoded = oneHotEncode(data.everMarried, ['No', 'Yes']);
  const workTypeEncoded = oneHotEncode(data.workType, ['Govt_job', 'Never_worked', 'Private', 'Self-employed', 'children']);
  const residenceEncoded = oneHotEncode(data.residenceType, ['Rural', 'Urban']);
  const smokingEncoded = oneHotEncode(data.smokingStatus, ['Unknown', 'formerly smoked', 'never smoked', 'smokes']);
  
  // Combine all features
  const features = [
    normalizedAge,
    normalizedGlucose,
    normalizedBmi,
    data.hypertension,
    data.heartDisease,
    ...genderEncoded,
    ...marriedEncoded,
    ...workTypeEncoded,
    ...residenceEncoded,
    ...smokingEncoded
  ];
  
  return tf.tensor2d([features]);
}

// Get risk category based on probability
function getRiskCategory(probability: number): string {
  for (const [category, threshold] of Object.entries(RISK_CATEGORIES)) {
    if (probability < threshold) {
      return category;
    }
  }
  return 'Very High Risk';
}

// Predict stroke risk using the model
export async function predictStroke(data: StrokeRiskInput): Promise<PredictionResult> {
  if (useTemporaryModel) {
    // Use a placeholder model based on risk factors
    return predictWithTemporaryModel(data);
  }
  
  try {
    // Ensure model is loaded
    if (!strokeModel) {
      await initializeStrokeModel();
      
      // If still not available, use temporary model
      if (!strokeModel) {
        return predictWithTemporaryModel(data);
      }
    }
    
    // Prepare input tensor
    const inputTensor = prepareModelInput(data);
    
    // Run prediction
    const result = strokeModel.predict(inputTensor) as tf.Tensor;
    const probability = (await result.data())[0];
    
    // Clean up tensors
    inputTensor.dispose();
    result.dispose();
    
    // Get risk category
    const prediction = getRiskCategory(probability);
    
    return { prediction, probability };
  } catch (error) {
    console.error('Error during stroke prediction:', error);
    return predictWithTemporaryModel(data);
  }
}

// Temporary model based on risk factors
function predictWithTemporaryModel(data: StrokeRiskInput): PredictionResult {
  // Count risk factors
  const riskFactors = [];
  
  if (data.hypertension === 1) riskFactors.push('Hypertension');
  if (data.heartDisease === 1) riskFactors.push('Heart Disease');
  if (data.age > 65) riskFactors.push('Age > 65');
  if (data.smokingStatus === 'smokes') riskFactors.push('Smoking');
  if (data.avgGlucoseLevel > 140) riskFactors.push('High Blood Glucose');
  if (data.bmi > 30) riskFactors.push('Obesity');
  
  const riskCount = riskFactors.length;
  
  // Simple logic based on risk factor count
  let probability: number;
  
  if (riskCount === 0) {
    probability = 0.05;
  } else if (riskCount === 1) {
    probability = 0.15;
  } else if (riskCount === 2) {
    probability = 0.30;
  } else if (riskCount === 3) {
    probability = 0.60;
  } else {
    probability = 0.80;
  }
  
  return {
    prediction: getRiskCategory(probability),
    probability
  };
} 