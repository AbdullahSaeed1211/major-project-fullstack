"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface DetectionResult {
  hasAlzheimers: boolean;
  probability: number;
  stage?: string;
  recommendations?: string[];
}

interface CognitiveScore {
  memory: number;
  attention: number;
  language: number;
  visualSpatial: number;
  executiveFunction: number;
  overall: number;
}

export function AlzheimersDetectionForm() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [activeTab, setActiveTab] = useState<'mri' | 'cognitive'>('mri');
  const [cognitiveScore, setCognitiveScore] = useState<CognitiveScore | null>(null);
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
    if (!file.type.match('image.*')) {
      alert('Please select an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedImage(e.target.result as string);
        setResult(null); // Reset previous results
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call to ML model
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock result
      setResult({
        hasAlzheimers: Math.random() > 0.5,
        probability: Math.random() * 100,
        stage: Math.random() > 0.7 ? 'Early' : 'Mild',
        recommendations: [
          'Consult with a neurologist',
          'Schedule regular follow-up scans',
          'Consider cognitive enhancement exercises',
          'Maintain a healthy diet and exercise routine'
        ]
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      alert('An error occurred during analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCognitiveTest = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call to cognitive test processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock cognitive test results
      setCognitiveScore({
        memory: Math.floor(Math.random() * 100),
        attention: Math.floor(Math.random() * 100),
        language: Math.floor(Math.random() * 100),
        visualSpatial: Math.floor(Math.random() * 100),
        executiveFunction: Math.floor(Math.random() * 100),
        overall: Math.floor(Math.random() * 100)
      });
    } catch (error) {
      console.error('Error processing cognitive test:', error);
      alert('An error occurred during test processing. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2 bg-muted p-1 rounded-lg">
          <Button 
            variant={activeTab === 'mri' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('mri')}
            className="rounded-md"
          >
            MRI Analysis
          </Button>
          <Button 
            variant={activeTab === 'cognitive' ? 'default' : 'ghost'} 
            onClick={() => setActiveTab('cognitive')}
            className="rounded-md"
          >
            Cognitive Assessment
          </Button>
        </div>
      </div>

      {activeTab === 'mri' ? (
        <div className="space-y-8">
          <Card className="border-2 border-dashed border-muted-foreground/50">
            <CardContent className="p-6">
              <div
                className={cn(
                  "flex flex-col items-center justify-center rounded-lg transition-all",
                  isDragging ? "border-primary" : "border-muted-foreground/20",
                  selectedImage ? "h-auto" : "h-64"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {selectedImage ? (
                  <div className="relative w-full max-h-[400px] overflow-hidden rounded-lg">
                    <Image
                      src={selectedImage}
                      alt="Selected MRI scan"
                      width={800}
                      height={600}
                      className="object-contain w-full h-full"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setSelectedImage(null)}
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6">
                    <div className="mb-4 rounded-full bg-muted p-6">
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
                        className="h-10 w-10 text-muted-foreground"
                      >
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                        <line x1="16" x2="22" y1="5" y2="5" />
                        <line x1="19" x2="19" y1="2" y2="8" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">Drag & Drop MRI Scan</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse files (JPEG, PNG, etc.)
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select File
                    </Button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={!selectedImage || isLoading}
                className="w-full max-w-xs"
              >
                {isLoading ? "Analyzing..." : "Analyze MRI Scan"}
              </Button>
            </CardFooter>
          </Card>

          {result && (
            <Card className="border-2 border-primary/50">
              <CardHeader>
                <CardTitle className="text-center">Analysis Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className={cn(
                    "text-white font-bold rounded-full h-32 w-32 flex items-center justify-center text-2xl",
                    result.hasAlzheimers 
                      ? "bg-gradient-to-br from-red-500 to-orange-500" 
                      : "bg-gradient-to-br from-green-500 to-teal-500"
                  )}>
                    {result.probability.toFixed(1)}%
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold mb-1">
                    {result.hasAlzheimers 
                      ? `Signs of Alzheimer's Detected (${result.stage} Stage)` 
                      : "No Signs of Alzheimer's Detected"}
                  </h3>
                  <p className="text-muted-foreground">
                    {result.hasAlzheimers 
                      ? "Our AI has detected patterns consistent with Alzheimer's disease." 
                      : "Our AI did not detect patterns associated with Alzheimer's disease."}
                  </p>
                </div>
                
                {result.hasAlzheimers && result.recommendations && (
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Recommendations:</h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
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
                            className="h-5 w-5 mr-2 text-primary"
                          >
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="bg-muted p-4 rounded-lg mt-6">
                  <p className="text-sm text-center text-muted-foreground">
                    This analysis is for informational purposes only and should not replace professional medical advice.
                    Please consult with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Cognitive Assessment</CardTitle>
              <CardDescription>
                Complete the following cognitive tests to assess memory, attention, and other cognitive functions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Memory Test</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Memorize the following sequence of shapes, then recall them in order.
                </p>
                <div className="flex justify-center space-x-4 mb-4">
                  {['circle', 'square', 'triangle', 'star', 'hexagon'].map((shape, index) => (
                    <div key={index} className="h-12 w-12 bg-primary/20 rounded-md flex items-center justify-center">
                      {shape === 'circle' && <div className="h-8 w-8 rounded-full bg-primary/60" />}
                      {shape === 'square' && <div className="h-8 w-8 bg-primary/60" />}
                      {shape === 'triangle' && <div className="h-0 w-0 border-l-[16px] border-r-[16px] border-b-[28px] border-l-transparent border-r-transparent border-b-primary/60" />}
                      {shape === 'star' && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="rgba(var(--magic-primary), 0.6)" />
                        </svg>
                      )}
                      {shape === 'hexagon' && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 16.5V7.5L12 3L3 7.5V16.5L12 21L21 16.5Z" fill="rgba(var(--magic-primary), 0.6)" />
                        </svg>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Attention Test</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Click on all the numbers in ascending order as quickly as possible.
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {[7, 2, 8, 1, 9, 5, 3, 6, 4, 10].map((num, index) => (
                    <Button key={index} variant="outline" className="h-12 w-12 p-0">
                      {num}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Language Test</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Name as many animals as you can in 60 seconds.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="Type animal names here..."
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="bg-muted rounded-full h-12 w-12 flex items-center justify-center text-sm font-medium">
                    60s
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCognitiveTest} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Processing..." : "Submit Assessment"}
              </Button>
            </CardFooter>
          </Card>
          
          {cognitiveScore && (
            <Card className="border-2 border-primary/50">
              <CardHeader>
                <CardTitle className="text-center">Cognitive Assessment Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-center mb-4">
                  <div className={cn(
                    "text-white font-bold rounded-full h-32 w-32 flex items-center justify-center text-2xl",
                    cognitiveScore.overall > 70 
                      ? "bg-gradient-to-br from-green-500 to-teal-500" 
                      : cognitiveScore.overall > 40
                        ? "bg-gradient-to-br from-yellow-500 to-orange-500"
                        : "bg-gradient-to-br from-red-500 to-orange-500"
                  )}>
                    {cognitiveScore.overall}/100
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Cognitive Domain Scores</h3>
                  
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Memory</span>
                        <span>{cognitiveScore.memory}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${cognitiveScore.memory}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Attention</span>
                        <span>{cognitiveScore.attention}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${cognitiveScore.attention}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Language</span>
                        <span>{cognitiveScore.language}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${cognitiveScore.language}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Visual-Spatial</span>
                        <span>{cognitiveScore.visualSpatial}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${cognitiveScore.visualSpatial}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Executive Function</span>
                        <span>{cognitiveScore.executiveFunction}/100</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${cognitiveScore.executiveFunction}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-2">Interpretation:</h4>
                  <p className="text-sm">
                    {cognitiveScore.overall > 70 
                      ? "Your cognitive function appears to be within normal range. Continue to engage in mentally stimulating activities to maintain cognitive health."
                      : cognitiveScore.overall > 40
                        ? "Some mild cognitive impairment detected. Consider follow-up with a healthcare provider and engaging in cognitive training exercises."
                        : "Significant cognitive impairment detected. We recommend consulting with a neurologist or memory specialist for further evaluation."}
                  </p>
                </div>
                
                <div className="bg-muted p-4 rounded-lg mt-6">
                  <p className="text-sm text-center text-muted-foreground">
                    This assessment is for informational purposes only and should not replace professional medical evaluation.
                    Please consult with a healthcare provider for proper diagnosis and treatment.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
} 