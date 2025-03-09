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

// Model coefficients (simplified logistic regression)
// These are placeholder values - in a real implementation, these would be extracted from the Python model
const coefficients = [
  0.03,   // age
  0.01,   // avgGlucoseLevel
  0.02,   // bmi
  0.5,    // hypertension
  0.7,    // heartDisease
  0.1, 0.0,  // gender (male, female)
  0.2, 0.0,  // everMarried (yes, no)
  0.1, 0.0, 0.0, -0.1, 0.0,  // workType (private, self-employed, govt_job, children, never_worked)
  0.0, 0.0,  // residenceType (urban, rural)
  0.1, -0.1, 0.2, 0.0  // smokingStatus (formerly smoked, never smoked, smokes, unknown)
];

const intercept = -3.0;  // Placeholder intercept value

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
 * Predicts stroke likelihood using a simplified logistic regression model
 * @param input The stroke input data
 * @returns The prediction result
 */
export function predictStroke(input: StrokeInput): PredictionResult {
  // Preprocess the input
  const features = preprocessInput(input);
  
  // Apply logistic regression (dot product of features and coefficients + intercept)
  let logit = intercept;
  for (let i = 0; i < features.length; i++) {
    logit += features[i] * coefficients[i];
  }
  
  // Apply sigmoid function to get probability
  const probability = 1 / (1 + Math.exp(-logit));
  
  // Determine prediction based on probability threshold
  const prediction = probability > 0.5 ? "Likely" : "Not Likely";
  
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