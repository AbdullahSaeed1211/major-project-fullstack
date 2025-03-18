"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { predictStroke, type StrokeInput } from "@/lib/stroke-model";
import { Button } from "@/components/ui/button";

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
  prediction: string;
  probability: number;
}

export function StrokeForm() {
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
    
    try {
      // Add a small delay to simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Use our model to predict stroke risk
      const modelInput: StrokeInput = {
        gender: formData.gender,
        age: formData.age,
        hypertension: formData.hypertension,
        heartDisease: formData.heartDisease,
        everMarried: formData.everMarried,
        workType: formData.workType,
        residenceType: formData.residenceType,
        avgGlucoseLevel: formData.avgGlucoseLevel,
        bmi: formData.bmi,
        smokingStatus: formData.smokingStatus
      };
      
      const prediction = predictStroke(modelInput);
      
      setResult(prediction);
    } catch (error) {
      console.error("Error making prediction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to check if no risk factors are present
  const hasNoRiskFactors = () => {
    return formData.hypertension !== 1 && 
           formData.heartDisease !== 1 && 
           formData.age <= 65 && 
           formData.smokingStatus !== "smokes" && 
           formData.avgGlucoseLevel <= 140 && 
           formData.bmi <= 30;
  };

  return (
    <div className="magic-card">
      <div className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Gender */}
            <div className="space-y-2">
              <label
                htmlFor="gender"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-600"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label
                htmlFor="age"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="0"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-600"
              />
            </div>

            {/* Hypertension */}
            <div className="space-y-2">
              <label
                htmlFor="hypertension"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Hypertension
              </label>
              <select
                id="hypertension"
                name="hypertension"
                value={formData.hypertension}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-600"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {/* Heart Disease */}
            <div className="space-y-2">
              <label
                htmlFor="heartDisease"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Heart Disease
              </label>
              <select
                id="heartDisease"
                name="heartDisease"
                value={formData.heartDisease}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-600"
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>

            {/* Ever Married */}
            <div className="space-y-2">
              <label
                htmlFor="everMarried"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ever Married
              </label>
              <select
                id="everMarried"
                name="everMarried"
                value={formData.everMarried}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-600"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Work Type */}
            <div className="space-y-2">
              <label
                htmlFor="workType"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Work Type
              </label>
              <select
                id="workType"
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-600"
              >
                <option value="Private">Private</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Govt_job">Government Job</option>
                <option value="children">Children</option>
                <option value="Never_worked">Never Worked</option>
              </select>
            </div>

            {/* Residence Type */}
            <div className="space-y-2">
              <label
                htmlFor="residenceType"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Residence Type
              </label>
              <select
                id="residenceType"
                name="residenceType"
                value={formData.residenceType}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-600"
              >
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
              </select>
            </div>

            {/* Average Glucose Level */}
            <div className="space-y-2">
              <label
                htmlFor="avgGlucoseLevel"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Average Glucose Level (mg/dL)
              </label>
              <input
                id="avgGlucoseLevel"
                name="avgGlucoseLevel"
                type="number"
                min="50"
                max="300"
                value={formData.avgGlucoseLevel}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-600"
              />
            </div>

            {/* BMI */}
            <div className="space-y-2">
              <label
                htmlFor="bmi"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                BMI
              </label>
              <input
                id="bmi"
                name="bmi"
                type="number"
                min="10"
                max="50"
                step="0.1"
                value={formData.bmi}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-600"
              />
            </div>

            {/* Smoking Status */}
            <div className="space-y-2 sm:col-span-2">
              <label
                htmlFor="smokingStatus"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Smoking Status
              </label>
              <select
                id="smokingStatus"
                name="smokingStatus"
                value={formData.smokingStatus}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-600"
              >
                <option value="never smoked">Never Smoked</option>
                <option value="formerly smoked">Formerly Smoked</option>
                <option value="smokes">Current Smoker</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Predict Stroke Risk"}
          </Button>
        </form>

        {result && (
          <div className="mt-6 rounded-lg bg-card p-4 shadow-sm">
            <h3 className="text-lg font-medium text-card-foreground mb-2">Result</h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Risk Level:</span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      result.prediction === "Very Low Risk"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : result.prediction === "Low Risk"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                        : result.prediction === "Moderate Risk"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : result.prediction === "High Risk"
                        ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                    )}
                  >
                    {result.prediction}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={cn(
                      "h-2.5 rounded-full",
                      result.prediction === "Very Low Risk"
                        ? "bg-green-500"
                        : result.prediction === "Low Risk"
                        ? "bg-blue-500"
                        : result.prediction === "Moderate Risk"
                        ? "bg-yellow-500"
                        : result.prediction === "High Risk"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    )}
                    style={{ width: `${result.probability * 100}%` }}
                  ></div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-1">
                  Estimated probability: {(result.probability * 100).toFixed(1)}%
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Risk Factors:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {formData.hypertension === 1 && (
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                      Hypertension
                    </li>
                  )}
                  {formData.heartDisease === 1 && (
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                      Heart Disease
                    </li>
                  )}
                  {formData.age > 65 && (
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                      Age over 65
                    </li>
                  )}
                  {formData.smokingStatus === "smokes" && (
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                      Current Smoker
                    </li>
                  )}
                  {formData.avgGlucoseLevel > 140 && (
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                      High Glucose Level
                    </li>
                  )}
                  {formData.bmi > 30 && (
                    <li className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                      High BMI
                    </li>
                  )}
                  {hasNoRiskFactors() && (
                    <li className="flex items-center text-gray-500">
                      No major risk factors identified
                    </li>
                  )}
                </ul>
              </div>
              
              <div className="text-sm">
                <p className="text-muted-foreground italic">
                  This is a screening tool and not a medical diagnosis. Please consult a healthcare professional for proper evaluation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 