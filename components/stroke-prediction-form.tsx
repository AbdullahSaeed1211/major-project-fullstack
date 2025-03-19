"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

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

// interface StrokeInput {
//   gender: string;
//   age: number;
//   hypertension: number;
//   heartDisease: number;
//   everMarried: string;
//   workType: string;
//   residenceType: string;
//   avgGlucoseLevel: number;
//   bmi: number;
//   smokingStatus: string;
// }

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

  useEffect(() => {
    // Display notification about ML model construction status
    toast({
      title: "Stroke Prediction (Beta)",
      description: "ML model integration is under development. Results are simulated based on risk factors.",
      duration: 6000,
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
    
    try {
      // Make API request to predict stroke
      const response = await fetch('/api/stroke/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }
      
      const data = await response.json();
      
      setResult({
        prediction: data.prediction,
        probability: data.probability,
      });
    } catch (error) {
      console.error("Error making prediction:", error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="magic-card">
      <div className="p-6">
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
                step="0.1"
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
            <div className="space-y-2">
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
                <option value="smokes">Currently Smokes</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="magic-button-primary w-full"
          >
            {isLoading ? "Predicting..." : "Predict Stroke Risk"}
          </button>
        </form>

        {result && (
          <div className="mt-8 magic-card">
            <h3 className="text-xl font-bold">Prediction Result</h3>
            <div className="mt-4 space-y-2">
              <p className="text-lg">
                Stroke Risk:{" "}
                <span
                  className={cn(
                    "font-bold",
                    result.prediction === "Likely"
                      ? "text-[rgb(var(--secondary))]"
                      : "text-[rgb(var(--accent))]"
                  )}
                >
                  {result.prediction}
                </span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Probability: {(result.probability * 100).toFixed(2)}%
              </p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className={cn(
                    "h-full",
                    result.prediction === "Likely"
                      ? "bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--secondary))]"
                      : "bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--primary))]"
                  )}
                  style={{ width: `${result.probability * 100}%` }}
                />
              </div>
              <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                <h4 className="mb-2 font-medium">Risk Factors Analysis</h4>
                <ul className="space-y-1 text-sm">
                  {formData.hypertension === 1 && (
                    <li className="text-[rgb(var(--secondary))]">• Hypertension increases stroke risk by up to 4-6 times</li>
                  )}
                  {formData.heartDisease === 1 && (
                    <li className="text-[rgb(var(--secondary))]">• Heart disease increases stroke risk by up to 3 times</li>
                  )}
                  {formData.age > 65 && (
                    <li className="text-[rgb(var(--secondary))]">• Age over 65 significantly increases stroke risk</li>
                  )}
                  {formData.smokingStatus === "smokes" && (
                    <li className="text-[rgb(var(--secondary))]">• Smoking doubles the risk of stroke</li>
                  )}
                  {formData.avgGlucoseLevel > 140 && (
                    <li className="text-[rgb(var(--secondary))]">• High blood glucose levels increase stroke risk</li>
                  )}
                  {formData.bmi > 30 && (
                    <li className="text-[rgb(var(--secondary))]">• Obesity (BMI {'>'} 30) increases stroke risk</li>
                  )}
                  {Object.values(formData).every(val => 
                    (val !== 1 && 
                     !(typeof val === 'number' && val > 65) && 
                     val !== "smokes" && 
                     !(typeof val === 'number' && val > 140) && 
                     !(typeof val === 'number' && val > 30))
                  ) && (
                    <li className="text-[rgb(var(--accent))]">• No major risk factors identified</li>
                  )}
                </ul>
              </div>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Note: This prediction is based on a simplified model and should not replace professional medical advice.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 