// Define the input interface
export interface StrokeInput {
  gender: string;
  age: number;
  hypertension: number;
  heartDisease: number;
  everMarried: string;
  workType: string;
  residenceType: string;
  avgGlucoseLevel: number;
  bmi: number;
  smokingStatus: string;
}

// Define the prediction result interface
export interface PredictionResult {
  prediction: string;
  probability: number;
}

/**
 * NOTE: This is a placeholder model that simulates a stroke prediction model.
 * It will be replaced with a real machine learning model in the future.
 * The coefficients are based on medical research but simplified for demonstration.
 * 
 * TODO: Replace with real ML model from Google Cloud buckets/services.
 */

// Encoding maps for categorical variables
const genderEncoding: Record<string, number[]> = {
  'male': [1, 0, 0],
  'female': [0, 1, 0],
  'other': [0, 0, 1]
};

const everMarriedEncoding: Record<string, number[]> = {
  'yes': [1, 0],
  'no': [0, 1]
};

const workTypeEncoding: Record<string, number[]> = {
  'private': [1, 0, 0, 0, 0],
  'self-employed': [0, 1, 0, 0, 0],
  'govt_job': [0, 0, 1, 0, 0],
  'children': [0, 0, 0, 1, 0],
  'never_worked': [0, 0, 0, 0, 1]
};

const residenceTypeEncoding: Record<string, number[]> = {
  'urban': [1, 0],
  'rural': [0, 1]
};

const smokingStatusEncoding: Record<string, number[]> = {
  'formerly smoked': [1, 0, 0, 0],
  'never smoked': [0, 1, 0, 0],
  'smokes': [0, 0, 1, 0],
  'unknown': [0, 0, 0, 1]
};

// Normalization parameters for numeric features
const normalization = {
  age: { mean: 43.22, std: 22.61 },
  avgGlucoseLevel: { mean: 106.14, std: 45.28 },
  bmi: { mean: 28.89, std: 7.85 }
};

// Model coefficients (placeholder values based on medical research)
// These values are more realistic based on stroke risk factors
const coefficients = [
  0.048,  // age (age is a significant risk factor)
  0.014,  // avgGlucoseLevel (higher glucose levels increase risk)
  0.025,  // bmi (higher BMI moderately increases risk)
  0.72,   // hypertension (major risk factor)
  0.85,   // heartDisease (major risk factor)
  0.15, -0.12, 0.0,   // gender (male slightly higher risk than female)
  0.18, 0.0,  // everMarried (slightly higher risk for married, likely age correlation)
  0.12, 0.15, 0.05, -0.25, 0.0,  // workType (private, self-employed, govt_job, children, never_worked)
  0.08, -0.05,  // residenceType (urban, rural)
  0.31, -0.15, 0.42, 0.0  // smokingStatus (formerly smoked, never smoked, smokes, unknown)
];

// Lower intercept to reflect base stroke rarity
const intercept = -5.6;  // Add a negative value to reflect the rarity of strokes

/**
 * Preprocesses the input data for the model
 * @param input The stroke input data
 * @returns A tensor of preprocessed features
 */
function preprocessInput(input: StrokeInput): number[] {
  // Normalize numeric features
  const normalizedAge = (input.age - normalization.age.mean) / normalization.age.std;
  const normalizedGlucose = (input.avgGlucoseLevel - normalization.avgGlucoseLevel.mean) / normalization.avgGlucoseLevel.std;
  const normalizedBmi = (input.bmi - normalization.bmi.mean) / normalization.bmi.std;
  
  // One-hot encode categorical features
  const genderEncoded = genderEncoding[input.gender.toLowerCase()] || genderEncoding['other'];
  const marriedEncoded = everMarriedEncoding[input.everMarried.toLowerCase()] || everMarriedEncoding['no'];
  const workTypeEncoded = workTypeEncoding[input.workType.toLowerCase()] || workTypeEncoding['private'];
  const residenceEncoded = residenceTypeEncoding[input.residenceType.toLowerCase()] || residenceTypeEncoding['urban'];
  const smokingEncoded = smokingStatusEncoding[input.smokingStatus.toLowerCase()] || smokingStatusEncoding['unknown'];
  
  // Combine all features
  return [
    normalizedAge,
    normalizedGlucose,
    normalizedBmi,
    input.hypertension,
    input.heartDisease,
    ...genderEncoded,
    ...marriedEncoded,
    ...workTypeEncoded,
    ...residenceEncoded,
    ...smokingEncoded
  ];
}

/**
 * Predicts stroke likelihood using a placeholder logistic regression model
 * This is not a real ML model and will be replaced in the future
 * 
 * @param input The stroke input data
 * @returns The prediction result
 */
export function predictStroke(input: StrokeInput): PredictionResult {
  // Preprocess the input
  const features = preprocessInput(input);
  
  // Apply logistic regression (dot product of features and coefficients + intercept)
  let logit = intercept;
  for (let i = 0; i < Math.min(features.length, coefficients.length); i++) {
    logit += features[i] * coefficients[i];
  }
  
  // Apply sigmoid function to get probability
  const probability = 1 / (1 + Math.exp(-logit));
  
  // Determine prediction category based on probability thresholds
  let prediction: string;
  if (probability < 0.1) {
    prediction = "Very Low Risk";
  } else if (probability < 0.2) {
    prediction = "Low Risk";
  } else if (probability < 0.5) {
    prediction = "Moderate Risk";
  } else if (probability < 0.7) {
    prediction = "High Risk";
  } else {
    prediction = "Very High Risk";
  }
  
  return {
    prediction,
    probability
  };
}

/**
 * Maps form input to the expected model input format
 * @param formData The form data from the UI
 * @returns Properly formatted input for the model
 */
export function mapFormToModelInput(formData: Record<string, string | number>): StrokeInput {
  // Map work type to expected format
  const workTypeMapping: Record<string, string> = {
    "Government job": "govt_job",
    "Children": "children",
    "Never Worked": "never_worked",
    "Private": "private",
    "Self-employed": "self-employed"
  };

  return {
    gender: String(formData.gender),
    age: Number(formData.age),
    hypertension: Number(formData.hypertension),
    heartDisease: Number(formData.heartDisease),
    everMarried: String(formData.everMarried),
    workType: workTypeMapping[String(formData.workType)] || String(formData.workType).toLowerCase(),
    residenceType: String(formData.residenceType),
    avgGlucoseLevel: Number(formData.avgGlucoseLevel),
    bmi: Number(formData.bmi),
    smokingStatus: String(formData.smokingStatus)
  };
} 