import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpIcon, CheckCircleIcon, AlertTriangleIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Processing status type
type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'failed';

// Mock result interface
interface AnalysisResult {
  tumorDetected: boolean;
  confidence: number;
  location?: string;
  type?: string;
  recommendations?: string[];
}

export function BrainScanUpload() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [processingTimeout, setProcessingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>('');

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setStatus('idle');
      setProgress(0);
      setResult(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.dicom', '.dcm']
    },
    maxFiles: 1
  });

  // Clean up timeout when component unmounts
  useEffect(() => {
    return () => {
      if (processingTimeout) {
        clearTimeout(processingTimeout);
      }
    };
  }, [processingTimeout]);

  // Handle real processing instead of mock
  const handleUpload = async () => {
    if (!file) return;

    try {
      // Start uploading
      setStatus('uploading');
      setProgress(10);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      if (webhookUrl) {
        formData.append('webhookUrl', webhookUrl);
      }
      
      // Upload the file to your API
      const response = await fetch('/api/brain-scan/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      const data = await response.json();
      const assessmentId = data.assessmentId;
      
      setStatus('processing');
      setProgress(50);
      
      toast({
        title: 'Brain scan uploaded',
        description: 'Your scan is being processed. You will be notified when the analysis is complete.',
      });
      
      // Poll for status
      let completed = false;
      const statusInterval = setInterval(async () => {
        try {
          const statusResponse = await fetch(`/api/brain-scan/status/${assessmentId}`);
          if (statusResponse.ok) {
            const statusData = await statusResponse.json();
            
            if (statusData.status === 'completed') {
              clearInterval(statusInterval);
              completed = true;
              setProgress(100);
              setStatus('completed');
              setResult(statusData.result);
              
              toast({
                title: 'Analysis complete',
                description: 'Your brain scan analysis is ready to view.'
              });
            } else if (statusData.status === 'failed') {
              clearInterval(statusInterval);
              throw new Error('Analysis failed');
            }
          }
        } catch (error) {
          console.error('Status check error:', error);
        }
      }, 5000);
      
      // Set a timeout to stop polling after 2 minutes
      setTimeout(() => {
        if (!completed) {
          clearInterval(statusInterval);
          setStatus('failed');
          setError('Analysis timed out. Please try again later.');
          
          toast({
            variant: 'destructive',
            title: 'Processing timeout',
            description: 'The analysis is taking too long. Please check back later.'
          });
        }
      }, 120000);
      
    } catch (err) {
      console.error('Processing error:', err);
      setStatus('failed');
      setError(err instanceof Error ? err.message : 'Processing failed');
      
      toast({
        variant: 'destructive',
        title: 'Processing failed',
        description: 'There was a problem analyzing your brain scan.'
      });
    }
  };

  // Cancellation and cleanup
  const handleCancel = () => {
    if (processingTimeout) {
      clearTimeout(processingTimeout);
      setProcessingTimeout(null);
    }
    
    setStatus('idle');
    setProgress(0);
  };

  // Component cleanup
  const handleReset = () => {
    if (processingTimeout) {
      clearTimeout(processingTimeout);
      setProcessingTimeout(null);
    }
    
    setFile(null);
    setStatus('idle');
    setProgress(0);
    setResult(null);
    setError(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Brain Scan Analysis</CardTitle>
        <CardDescription>
          Upload a brain scan image for tumor detection and analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* File dropzone */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-border'}
            ${status !== 'idle' && status !== 'failed' ? 'opacity-50 pointer-events-none' : ''}
          `}
        >
          <input {...getInputProps()} />
          <ArrowUpIcon className="mx-auto h-8 w-8 mb-2 text-muted-foreground" />
          
          {file ? (
            <p className="text-sm font-medium">{file.name}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Drag & drop a brain scan image, or click to select
            </p>
          )}
          
          <p className="text-xs text-muted-foreground mt-1">
            Supports JPEG, PNG, and DICOM formats
          </p>
        </div>
        
        {/* Webhook URL input (optional) */}
        <div className="space-y-2">
          <Label htmlFor="webhook">Notification URL (optional)</Label>
          <Input
            id="webhook"
            placeholder="https://your-server.com/webhook"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            disabled={status !== 'idle' && status !== 'failed'}
          />
          <p className="text-xs text-muted-foreground">
            Results can be sent to an external service when processing is complete
          </p>
        </div>
        
        {/* Progress indicator */}
        {status !== 'idle' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>
                {status === 'uploading' ? 'Uploading...' :
                 status === 'processing' ? 'Processing...' :
                 status === 'completed' ? 'Completed' :
                 'Failed'}
              </span>
              {progress > 0 && <span>{progress}%</span>}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {/* Results display */}
        {status === 'completed' && result && (
          <div className="mt-4 p-4 border rounded-md bg-card">
            <div className="flex items-center gap-2 mb-2">
              {result.tumorDetected ? (
                <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
              ) : (
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              )}
              <h3 className="font-semibold">
                {result.tumorDetected ? 'Potential abnormality detected' : 'No abnormalities detected'}
              </h3>
            </div>
            
            <div className="space-y-2 mt-3">
              <p className="text-sm">
                <span className="font-medium">Confidence:</span> {(result.confidence * 100).toFixed(1)}%
              </p>
              
              {result.location && (
                <p className="text-sm">
                  <span className="font-medium">Location:</span> {result.location}
                </p>
              )}
              
              {result.type && (
                <p className="text-sm">
                  <span className="font-medium">Classification:</span> {result.type}
                </p>
              )}
              
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-1">Recommendations:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    {result.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground mt-4">
                <p>Note: This is an automated analysis and should not replace professional medical advice. 
                Always consult with a healthcare provider for proper diagnosis.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {status === 'failed' && error && (
          <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            <p className="font-medium">Error: {error}</p>
            <p className="text-xs mt-1">Please try again or use a different image.</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {(status === 'idle' || status === 'failed') && file ? (
          <>
            <Button variant="ghost" onClick={handleReset}>Cancel</Button>
            <Button onClick={handleUpload}>Analyze Scan</Button>
          </>
        ) : status === 'completed' ? (
          <>
            <Button variant="ghost" onClick={handleReset}>Upload New Scan</Button>
            <Button 
              variant="outline" 
              onClick={() => {
                if (result) {
                  // In a real app, this would trigger a download of the results or a PDF report
                  toast({
                    title: "Report downloaded",
                    description: "The analysis report has been downloaded."
                  });
                }
              }}
            >
              Download Report
            </Button>
          </>
        ) : status === 'uploading' || status === 'processing' ? (
          <Button variant="ghost" onClick={handleCancel} className="ml-auto">Cancel</Button>
        ) : (
          <Button onClick={handleUpload} disabled={!file}>Analyze Scan</Button>
        )}
      </CardFooter>
    </Card>
  );
} 