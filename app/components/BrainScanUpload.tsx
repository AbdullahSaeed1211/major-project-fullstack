import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpIcon, SpinnerIcon, CheckCircleIcon, AlertTriangleIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Processing status type
type ProcessingStatus = 'idle' | 'uploading' | 'processing' | 'completed' | 'failed';

// Request status for polling
interface RequestStatus {
  requestId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
}

export function BrainScanUpload() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<ProcessingStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [requestId, setRequestId] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setStatus('idle');
      setProgress(0);
      setRequestId(null);
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

  // Handle upload with async processing
  const handleUpload = async () => {
    if (!file) return;

    try {
      setStatus('uploading');
      setProgress(10);

      // Create form data
      const formData = new FormData();
      formData.append('image', file);
      
      // Add webhook URL if provided
      if (webhookUrl) {
        formData.append('webhookUrl', webhookUrl);
      }
      
      // Specify async mode
      formData.append('mode', 'async');

      // Upload the file
      const response = await fetch('/api/ml/detect', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      setProgress(50);
      
      // Get the response data with request ID
      const data = await response.json();
      setRequestId(data.requestId);
      
      // Start polling for status updates
      setStatus('processing');
      startPolling(data.requestId);
      
      toast({
        title: 'Brain scan uploaded',
        description: 'Your scan is being processed. You will be notified when the analysis is complete.',
      });
    } catch (err) {
      console.error('Upload error:', err);
      setStatus('failed');
      setError(err instanceof Error ? err.message : 'Upload failed');
      
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: 'There was a problem uploading your brain scan.'
      });
    }
  };

  // Start polling for request status
  const startPolling = (id: string) => {
    // Clear any existing interval
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }
    
    // Set up polling interval (every 2 seconds)
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/ml/status/${id}`);
        if (!response.ok) {
          throw new Error('Failed to get status');
        }
        
        const statusData: RequestStatus = await response.json();
        
        // Update progress based on status
        if (statusData.status === 'pending') {
          setProgress(50);
        } else if (statusData.status === 'processing') {
          setProgress(75);
        } else if (statusData.status === 'completed') {
          setProgress(100);
          setStatus('completed');
          setResult(statusData.result);
          clearInterval(interval);
          setPollingInterval(null);
          
          toast({
            title: 'Analysis complete',
            description: 'Your brain scan analysis is ready to view.'
          });
        } else if (statusData.status === 'failed') {
          setStatus('failed');
          setError(statusData.error || 'Processing failed');
          clearInterval(interval);
          setPollingInterval(null);
          
          toast({
            variant: 'destructive',
            title: 'Analysis failed',
            description: statusData.error || 'There was a problem analyzing your brain scan.'
          });
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 2000);
    
    setPollingInterval(interval);
  };

  // Cancellation and cleanup
  const handleCancel = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    
    setStatus('idle');
    setProgress(0);
    setRequestId(null);
  };

  // Component cleanup
  const handleReset = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }
    
    setFile(null);
    setStatus('idle');
    setProgress(0);
    setRequestId(null);
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
          <Label htmlFor="webhook">Webhook URL (optional)</Label>
          <Input
            id="webhook"
            placeholder="https://your-server.com/webhook"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            disabled={status !== 'idle' && status !== 'failed'}
          />
          <p className="text-xs text-muted-foreground">
            We'll send the results to this URL when processing is complete
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
        
        {/* Results or error display */}
        {status === 'completed' && result && (
          <div className="rounded-lg border p-4 bg-background">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">Analysis Results</h3>
                <p className="text-sm mt-1">
                  {result.hasTumor 
                    ? `Tumor detected (${Math.round(result.confidence * 100)}% confidence)`
                    : 'No tumor detected'}
                </p>
                
                {result.hasTumor && (
                  <dl className="mt-2 text-sm grid grid-cols-2 gap-x-4 gap-y-2">
                    <dt className="text-muted-foreground">Type:</dt>
                    <dd>{result.tumorType}</dd>
                    
                    <dt className="text-muted-foreground">Location:</dt>
                    <dd>{result.location}</dd>
                    
                    <dt className="text-muted-foreground">Severity:</dt>
                    <dd>{result.severity}</dd>
                  </dl>
                )}
              </div>
            </div>
          </div>
        )}
        
        {status === 'failed' && error && (
          <div className="rounded-lg border p-4 bg-destructive/10 border-destructive/20">
            <div className="flex items-start gap-3">
              <AlertTriangleIcon className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-destructive">Processing Failed</h3>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex gap-2">
        {status === 'idle' && (
          <Button 
            onClick={handleUpload} 
            disabled={!file}
            className="w-full"
          >
            Analyze Scan
          </Button>
        )}
        
        {(status === 'uploading' || status === 'processing') && (
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="w-full"
          >
            Cancel
          </Button>
        )}
        
        {(status === 'completed' || status === 'failed') && (
          <Button 
            onClick={handleReset}
            className="w-full"
          >
            Start New Analysis
          </Button>
        )}
      </CardFooter>
    </Card>
  );
} 