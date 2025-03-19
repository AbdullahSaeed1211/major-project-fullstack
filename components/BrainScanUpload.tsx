"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function BrainScanUpload() {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "complete" | "failed">("idle");
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");
  const [assessmentId, setAssessmentId] = useState<string>("");

  useEffect(() => {
    // Display notification about ML model construction status
    toast({
      title: "Brain Scan Analysis (Beta)",
      description: "ML model integration is under development. Results are simulated for demonstration purposes.",
      duration: 6000,
    });
  }, [toast]);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setStatus('idle');
    setProgress(0);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    handleFileChange(selectedFile);
  };

  const handleClickUpload = () => {
    inputRef.current?.click();
  };

  // Handle upload
  const handleUpload = async () => {
    if (!file) return;

    try {
      // Start uploading
      setStatus('uploading');
      setProgress(10);
      setProgressMessage('Uploading scan...');
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      
      // Upload the file to API
      const response = await fetch('/api/brain-scan/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      setAssessmentId(data.assessmentId);
      
      setStatus('processing');
      setProgress(50);
      setProgressMessage('Processing scan...');
      
      toast({
        title: 'Brain scan uploaded',
        description: 'Your scan is being processed. You will be notified when the analysis is complete.',
      });
      
      // In a real implementation, you would poll for status here
      
    } catch (error) {
      setStatus('failed');
      setProgressMessage('Upload failed');
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to upload brain scan',
      });
      console.error('Error:', error);
    }
  };

  // Render the component with UI that uses all the variables
  return (
    <div className="flex flex-col gap-4 p-4 border rounded-lg">
      {/* Hidden file input */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileInputChange}
        className="hidden"
        accept="image/jpeg,image/png,application/dicom"
      />
      
      {/* File upload area with input that uses handleFileChange */}
      <div 
        className="border-dashed border-2 p-6 rounded-lg text-center cursor-pointer"
        onClick={handleClickUpload}
      >
        {file ? (
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        ) : (
          <p>Drag and drop a scan file or click to browse</p>
        )}
      </div>
      
      {/* Upload button */}
      <button 
        onClick={handleUpload}
        disabled={!file || status === 'uploading' || status === 'processing'}
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        {status === 'idle' ? 'Upload Scan' : 'Processing...'}
      </button>
      
      {/* Progress indicator */}
      {status !== 'idle' && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm text-gray-600">{progressMessage}</p>
          {assessmentId && (
            <p className="mt-2 text-xs text-gray-500">Assessment ID: {assessmentId}</p>
          )}
        </div>
      )}
    </div>
  );
} 