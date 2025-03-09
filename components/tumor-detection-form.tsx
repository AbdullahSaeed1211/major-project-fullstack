"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface DetectionResult {
  hasTumor: boolean;
  confidence: number;
  tumorType?: string;
  tumorLocation?: string;
}

export function TumorDetectionForm() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      alert("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === "string") {
        setSelectedImage(e.target.result);
        setResult(null); // Reset result when new image is selected
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    
    try {
      // In a real app, this would call an API endpoint with the image
      // For now, we'll simulate a detection result
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Random result for demonstration
      const hasTumor = Math.random() > 0.5;
      const confidence = hasTumor 
        ? 0.7 + Math.random() * 0.3 
        : 0.5 + Math.random() * 0.3;
      
      const tumorTypes = ["Glioma", "Meningioma", "Pituitary", "Metastatic"];
      const locations = ["Frontal lobe", "Temporal lobe", "Parietal lobe", "Occipital lobe", "Cerebellum"];
      
      setResult({
        hasTumor,
        confidence,
        ...(hasTumor && {
          tumorType: tumorTypes[Math.floor(Math.random() * tumorTypes.length)],
          tumorLocation: locations[Math.floor(Math.random() * locations.length)],
        }),
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 space-y-6">
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragging
              ? "border-primary bg-primary/10"
              : "border-muted-foreground/25 hover:border-primary/50",
            selectedImage && "border-primary/50"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          {selectedImage ? (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={selectedImage}
                alt="Selected MRI scan"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-muted-foreground mb-4"
              >
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                <line x1="16" x2="22" y1="5" y2="5" />
                <line x1="19" x2="19" y1="2" y2="8" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <p className="text-lg font-medium mb-1">
                Drag and drop your MRI scan here
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse files (PNG, JPG, JPEG)
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!selectedImage || isLoading}
          className={cn(
            "inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
            isLoading && "opacity-70 cursor-not-allowed"
          )}
        >
          {isLoading ? "Analyzing..." : "Analyze MRI Scan"}
        </button>

        {result && (
          <div className="mt-8 rounded-lg border p-6">
            <h3 className="text-xl font-bold">Analysis Result</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full mr-2",
                    result.hasTumor ? "bg-destructive" : "bg-green-600"
                  )}
                />
                <p className="text-lg font-medium">
                  {result.hasTumor
                    ? "Potential tumor detected"
                    : "No tumor detected"}
                </p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Confidence: {(result.confidence * 100).toFixed(2)}%
                </p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={cn(
                      "h-full",
                      result.hasTumor ? "bg-destructive" : "bg-green-600"
                    )}
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>

              {result.hasTumor && (
                <div className="space-y-2 pt-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Tumor Type</p>
                      <p className="text-lg">{result.tumorType}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Location</p>
                      <p className="text-lg">{result.tumorLocation}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="mt-4 text-sm text-muted-foreground">
                Note: This is a demonstration analysis. In a real application, this would use a trained CNN model for tumor detection.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 