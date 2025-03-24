# ML Model Integration with Google Cloud Storage

## Overview

This document outlines how machine learning models are integrated with Google Cloud Storage (GCS) for the BrainWise application. GCS is used to store and serve ML models that power various features including stroke prediction, Alzheimer's risk assessment, and health metrics analysis.

## Current Status

- GCS buckets have been created but are currently empty
- ML model integration is planned for the next development phase

## Architecture

### Storage Structure

The ML models are stored in GCS buckets with the following structure:

```
gs://brainwise-ml-models/
├── stroke-prediction/
│   ├── v1/
│   │   ├── model.json
│   │   └── weights.bin
│   └── latest/ (symlink to latest version)
├── alzheimers-prediction/
│   ├── v1/
│   │   ├── model.json
│   │   └── weights.bin
│   └── latest/ (symlink to latest version)
```

### Model Loading

Models are loaded in the browser using TensorFlow.js with the following approach:

1. Application requests a signed URL for the model files from the backend
2. Backend generates temporary signed URLs with appropriate permissions
3. Frontend loads the model using TensorFlow.js `tf.loadLayersModel()`
4. Inference is performed client-side to reduce server load

## Implementation Plan

### 1\. Model Conversion

TensorFlow or PyTorch models need to be converted to TensorFlow.js format before uploading:

```bash
# For TensorFlow models
tensorflowjs_converter --input_format=tf_saved_model \
                       --output_format=tfjs_graph_model \
                       ./saved_model \
                       ./tfjs_model

# For PyTorch models
# First convert to ONNX, then to TensorFlow.js
torch.onnx.export(model, dummy_input, "model.onnx")
tensorflowjs_converter --input_format=onnx \
                       --output_format=tfjs_graph_model \
                       ./model.onnx \
                       ./tfjs_model
```

### 2\. Model Upload

Models will be uploaded to GCS using Google Cloud SDK:

```bash
# Upload model files
gsutil cp -r ./tfjs_model/* gs://brainwise-ml-models/stroke-prediction/v1/

# Update 'latest' symlink
gsutil rm gs://brainwise-ml-models/stroke-prediction/latest/*
gsutil cp -r gs://brainwise-ml-models/stroke-prediction/v1/* gs://brainwise-ml-models/stroke-prediction/latest/
```

### 3\. Serving Models

Backend API endpoints will be created to facilitate model loading:

```typescript
// Example API endpoint to generate signed URLs
export async function GET(req: Request) {
  const modelType = req.query.get('type') || 'stroke-prediction';
  const modelVersion = req.query.get('version') || 'latest';
  
  const modelFiles = [
    `gs://brainwise-ml-models/${modelType}/${modelVersion}/model.json`,
    `gs://brainwise-ml-models/${modelType}/${modelVersion}/weights.bin`
  ];
  
  const signedUrls = await Promise.all(
    modelFiles.map(async (file) => {
      const [url] = await storage
        .bucket('brainwise-ml-models')
        .file(file.replace('gs://brainwise-ml-models/', ''))
        .getSignedUrl({
          version: 'v4',
          action: 'read',
          expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        });
      return { file, url };
    })
  );
  
  return NextResponse.json({ signedUrls });
}
```

## Security Considerations

1. **Access Control**:

   - Models are stored in private GCS buckets
   - Access is controlled via signed URLs with short expiration times
   - IP restrictions may be applied to limit access to specific regions

2. **Data Privacy**:

   - No patient data is stored in GCS
   - Models are trained on anonymized data
   - Inference happens client-side, avoiding transmission of sensitive data

3. **Model Protection**:

   - Models are versioned to ensure consistency
   - Backups are maintained for all model versions
   - Model integrity is verified via checksums

## Performance Optimization

1. **Model Quantization**:

   - Models will be quantized to reduce size and improve loading time
   - 16-bit or 8-bit quantization will be applied where accuracy is not significantly affected

2. **Caching**:

   - CDN caching will be implemented for model files
   - Browser caching will be enabled for model weights
   - Service workers will cache models for offline use

3. **Progressive Loading**:

   - Models will be sharded to enable progressive loading
   - Critical parts of the model will load first to enable faster initial predictions

## Monitoring and Analytics

1. **Usage Tracking**:

   - Model usage will be tracked via Google Analytics
   - Performance metrics will be collected (load time, inference time)

2. **Error Monitoring**:

   - Failed model loads will be tracked and reported
   - Automatic fallbacks will be triggered when models fail to load

3. **Version Tracking**:

   - Model version usage will be tracked
   - A/B testing of different model versions will be implemented

## Implementation Timeline

1. **Phase 1 (Current)**: Set up GCS buckets and prepare integration code
2. **Phase 2**: Convert existing ML models to TensorFlow.js format
3. **Phase 3**: Upload models to GCS and implement signed URL generation
4. **Phase 4**: Implement client-side model loading and inference
5. **Phase 5**: Add monitoring, optimization, and fallback mechanisms

## Fallback Strategy

If models fail to load from GCS, the application will fallback to:

1. Local, simplified models bundled with the application
2. API-based inference using a serverless function
3. Heuristic-based predictions using statistical rules