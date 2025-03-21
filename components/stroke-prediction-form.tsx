"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

interface FormData {
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

interface PredictionResult {
  risk: number;
  factors?: string[];
  recommendations?: string[];
}

interface StrokeRiskInput {
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

async function predictStroke(input: StrokeRiskInput): Promise<PredictionResult> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let risk = 0;
  
  if (input.age > 65) risk += 0.25;
  else if (input.age > 55) risk += 0.15;
  else if (input.age > 45) risk += 0.05;
  
  if (input.hypertension === 1) risk += 0.2;
  if (input.heartDisease === 1) risk += 0.2;
  
  if (input.smokingStatus === "smokes") risk += 0.15;
  else if (input.smokingStatus === "formerly smoked") risk += 0.05;
  
  if (input.bmi > 30) risk += 0.1;
  if (input.avgGlucoseLevel > 140) risk += 0.15;
  
  risk = Math.min(Math.max(risk, 0.05), 0.95);
  
  return { risk };
}

export function StrokePredictionForm() {
  const [formData, setFormData] = useState<FormData>({
    gender: "male",
    age: 30,
    hypertension: 0,
    heartDisease: 0,
    everMarried: "no",
    workType: "Private",
    residenceType: "Urban",
    avgGlucoseLevel: 90,
    bmi: 25,
    smokingStatus: "never smoked",
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const hasNoRiskFactors = () => {
    return formData.hypertension !== 1 && 
           formData.heartDisease !== 1 && 
           formData.age <= 65 && 
           formData.smokingStatus !== "smokes" && 
           formData.avgGlucoseLevel <= 140 && 
           formData.bmi <= 30;
  };

  useEffect(() => {
    toast({
      title: "Stroke Prediction (Beta)",
      description: "ML model integration is under development. Results are simulated based on risk factors.",
      variant: "default",
    });
  }, [toast]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const form = e.target as HTMLFormElement;
    form.classList.add("opacity-70");
    
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
      
      const modelInput: StrokeRiskInput = {
        gender: formData.gender === "male" ? "Male" : formData.gender === "female" ? "Female" : "Other",
        age: formData.age,
        hypertension: formData.hypertension as 0 | 1,
        heartDisease: formData.heartDisease as 0 | 1,
        everMarried: formData.everMarried === "yes" ? "Yes" : "No",
        workType: formData.workType as 'Private' | 'Self-employed' | 'Govt_job' | 'children' | 'Never_worked',
        residenceType: formData.residenceType as "Urban" | "Rural",
        avgGlucoseLevel: formData.avgGlucoseLevel,
        bmi: formData.bmi,
        smokingStatus: formData.smokingStatus as 'formerly smoked' | 'never smoked' | 'smokes' | 'Unknown'
      };
      
      const prediction = await predictStroke(modelInput);
      
      setResult(prediction);
      toast({
        title: "Analysis Complete",
        description: "Your stroke risk assessment has been processed",
        variant: "default",
      });
    } catch (error) {
      console.error("Error making prediction:", error);
      toast({
        title: "Processing Error",
        description: "There was a problem analyzing your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      form.classList.remove("opacity-70");
    }
  };

  return (
    <div className="space-y-6 transition-all duration-300">
      <form onSubmit={handleSubmit} className="space-y-6 transition-all duration-200">
        <div className="space-y-4 bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-3">Demographic Information</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="form-input-transition w-full p-2 rounded-md border border-input bg-background focus:focus-ring"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                min="1"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className="form-input-transition w-full p-2 rounded-md border border-input bg-background focus:focus-ring"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="everMarried" className="block text-sm font-medium">
                Ever Married
              </label>
              <select
                id="everMarried"
                name="everMarried"
                value={formData.everMarried}
                onChange={handleChange}
                className="form-input-transition w-full p-2 rounded-md border border-input bg-background focus:focus-ring"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="workType" className="block text-sm font-medium">
                Work Type
              </label>
              <select
                id="workType"
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                className="form-input-transition w-full p-2 rounded-md border border-input bg-background focus:focus-ring"
              >
                <option value="Private">Private</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Govt_job">Government Job</option>
                <option value="children">Children</option>
                <option value="Never_worked">Never worked</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-card p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-3">Medical Information</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="hypertension" className="block text-sm font-medium">
                Hypertension
              </label>
              <select
                id="hypertension"
                name="hypertension"
                value={formData.hypertension}
                onChange={handleChange}
                className="form-input-transition w-full p-2 rounded-md border border-input bg-background focus:focus-ring"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="heartDisease" className="block text-sm font-medium">
                Heart Disease
              </label>
              <select
                id="heartDisease"
                name="heartDisease"
                value={formData.heartDisease}
                onChange={handleChange}
                className="form-input-transition w-full p-2 rounded-md border border-input bg-background focus:focus-ring"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="avgGlucoseLevel" className="block text-sm font-medium">
                Average Glucose Level (mg/dL)
              </label>
              <input
                type="number"
                id="avgGlucoseLevel"
                name="avgGlucoseLevel"
                min="50"
                max="300"
                value={formData.avgGlucoseLevel}
                onChange={handleChange}
                className="form-input-transition w-full p-2 rounded-md border border-input bg-background focus:focus-ring"
              />
              <div className="mt-1 text-xs text-muted-foreground">
                Normal fasting range: 70-100 mg/dL
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="bmi" className="block text-sm font-medium">
                BMI
              </label>
              <input
                type="number"
                id="bmi"
                name="bmi"
                min="10"
                max="50"
                step="0.1"
                value={formData.bmi}
                onChange={handleChange}
                className="form-input-transition w-full p-2 rounded-md border border-input bg-background focus:focus-ring"
              />
              <div className="mt-1 text-xs text-muted-foreground">
                Healthy range: 18.5-24.9
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="smokingStatus" className="block text-sm font-medium">
                Smoking Status
              </label>
              <select
                id="smokingStatus"
                name="smokingStatus"
                value={formData.smokingStatus}
                onChange={handleChange}
                className="form-input-transition w-full p-2 rounded-md border border-input bg-background focus:focus-ring"
              >
                <option value="never smoked">Never Smoked</option>
                <option value="formerly smoked">Formerly Smoked</option>
                <option value="smokes">Currently Smokes</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="residenceType" className="block text-sm font-medium">
                Residence Type
              </label>
              <select
                id="residenceType"
                name="residenceType"
                value={formData.residenceType}
                onChange={handleChange}
                className="form-input-transition w-full p-2 rounded-md border border-input bg-background focus:focus-ring"
              >
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="micro-bounce interactive px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors duration-200 font-medium flex items-center justify-center min-w-[150px]"
          >
            {isLoading ? (
              <>
                <svg 
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                >
                  <circle 
                    className="opacity-25" 
                    cx="12" 
                    cy="12" 
                    r="10" 
                    stroke="currentColor" 
                    strokeWidth="4"
                  ></circle>
                  <path 
                    className="opacity-75" 
                    fill="currentColor" 
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : "Analyze Risk"}
          </button>
        </div>
      </form>

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-8 p-6 bg-card rounded-lg border shadow-md">
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
          
          <div className="flex items-center mb-4">
            <div 
              className={`w-14 h-14 rounded-full flex items-center justify-center ${
                result.risk < 0.2 ? "bg-green-100 text-green-700" : 
                result.risk < 0.5 ? "bg-yellow-100 text-yellow-700" : 
                "bg-red-100 text-red-700"
              }`}
            >
              {result.risk < 0.2 ? (
                <CheckCircle className="h-8 w-8" />
              ) : result.risk < 0.5 ? (
                <AlertTriangle className="h-8 w-8" />
              ) : (
                <AlertCircle className="h-8 w-8" />
              )}
            </div>
            
            <div className="ml-4">
              <h3 className="text-lg font-medium">
                {result.risk < 0.2 ? "Low Risk" : 
                 result.risk < 0.5 ? "Moderate Risk" : 
                 "High Risk"}
              </h3>
              <p className="text-sm text-muted-foreground">
                Estimated risk score: {(result.risk * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            <h4 className="font-medium">Key Risk Factors:</h4>
            <ul className="space-y-2 pl-5 list-disc text-sm">
              {formData.hypertension === 1 && (
                <li>Hypertension significantly increases stroke risk</li>
              )}
              {formData.heartDisease === 1 && (
                <li>Heart disease is a major risk factor</li>
              )}
              {formData.age > 65 && (
                <li>Age over 65 increases vulnerability</li>
              )}
              {formData.smokingStatus === "smokes" && (
                <li>Current smoking habits increase risk</li>
              )}
              {formData.avgGlucoseLevel > 140 && (
                <li>Elevated glucose levels suggest possible diabetes risk</li>
              )}
              {formData.bmi > 30 && (
                <li>BMI indicating obesity increases risk</li>
              )}
              {hasNoRiskFactors() && (
                <li>No major risk factors identified</li>
              )}
            </ul>
            
            <h4 className="font-medium mt-4">Recommendations:</h4>
            <ul className="space-y-2 pl-5 list-disc text-sm">
              {formData.hypertension === 1 && (
                <li>Continue monitoring and managing blood pressure</li>
              )}
              {formData.heartDisease === 1 && (
                <li>Follow your cardiac care plan and medications</li>
              )}
              {formData.smokingStatus === "smokes" && (
                <li>Consider smoking cessation programs</li>
              )}
              {formData.bmi > 30 && (
                <li>Focus on weight management through diet and exercise</li>
              )}
              {formData.avgGlucoseLevel > 140 && (
                <li>Monitor blood glucose and consult about diabetes management</li>
              )}
              <li>Maintain a heart-healthy diet rich in fruits, vegetables, and whole grains</li>
              <li>Engage in regular physical activity (aim for 150 minutes weekly)</li>
              <li>Schedule regular check-ups with your healthcare provider</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 