import * as tf from '@tensorflow/tfjs';

// Define model types
export type ModelType = 'stroke' | 'alzheimers' | 'tumor';

// Interface for model metadata
interface ModelMetadata {
  version: string;
  lastUpdated: string;
  metrics: {
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1Score?: number;
  };
}

// Model cache to store loaded models
const modelCache: Record<string, {
  model: tf.GraphModel | tf.LayersModel;
  metadata: ModelMetadata | null;
  loadedAt: Date;
}> = {};

// Configuration for model locations
const MODEL_CONFIG = {
  production: {
    baseUrl: 'https://storage.googleapis.com/brain-ai-models',
    useCache: true,
  },
  development: {
    baseUrl: '/models',
    useCache: true,
  }
};

// Get the current environment
const isProduction = process.env.NODE_ENV === 'production';
const config = isProduction ? MODEL_CONFIG.production : MODEL_CONFIG.development;

/**
 * Get the URL for a specific model
 */
export function getModelUrl(modelType: ModelType, version?: string): string {
  const versionPath = version ? `/versions/${version}` : '';
  return `${config.baseUrl}/${modelType}-model${versionPath}`;
}

/**
 * Load model metadata
 */
export async function loadModelMetadata(modelType: ModelType, version?: string): Promise<ModelMetadata | null> {
  try {
    const modelUrl = getModelUrl(modelType, version);
    const response = await fetch(`${modelUrl}/metadata.json`);
    
    if (!response.ok) {
      console.error(`Failed to load metadata for ${modelType} model:`, response.statusText);
      return null;
    }
    
    return await response.json() as ModelMetadata;
  } catch (error) {
    console.error(`Error loading ${modelType} model metadata:`, error);
    return null;
  }
}

/**
 * Load a TensorFlow.js model from Google Cloud Storage or local path
 */
export async function loadModel(
  modelType: ModelType, 
  options: { 
    version?: string; 
    forceRefresh?: boolean;
  } = {}
): Promise<tf.GraphModel | tf.LayersModel | null> {
  const { version, forceRefresh = false } = options;
  const cacheKey = `${modelType}${version ? `-${version}` : ''}`;
  
  // Return cached model if available and not forcing refresh
  if (!forceRefresh && config.useCache && modelCache[cacheKey]?.model) {
    console.log(`Using cached ${modelType} model`);
    return modelCache[cacheKey].model;
  }
  
  // Get model URL
  const modelUrl = getModelUrl(modelType, version);
  console.log(`Loading ${modelType} model from ${modelUrl}`);
  
  try {
    // Load the model
    const model = await tf.loadGraphModel(`${modelUrl}/model.json`);
    
    // Load metadata
    const metadata = await loadModelMetadata(modelType, version);
    
    // Cache the model
    if (config.useCache) {
      modelCache[cacheKey] = {
        model,
        metadata,
        loadedAt: new Date()
      };
    }
    
    return model;
  } catch (error) {
    console.error(`Error loading ${modelType} model:`, error);
    return null;
  }
}

/**
 * Preload models to avoid cold starts
 */
export async function preloadModels(modelTypes?: ModelType[]): Promise<void> {
  if (!modelTypes || modelTypes.length === 0) {
    // If no specific models provided, preload all available models
    modelTypes = ['stroke', 'alzheimers', 'tumor'];
  }
  
  console.log(`Preloading models: ${modelTypes.join(', ')}`);
  
  // Attempt to load each model in parallel
  await Promise.all(
    modelTypes.map(async (modelType) => {
      try {
        await loadModel(modelType, { forceRefresh: false });
        console.log(`✅ Preloaded model: ${modelType}`);
      } catch (error) {
        console.warn(`⚠️ Failed to preload model ${modelType}:`, error);
      }
    })
  );
}

/**
 * Clear the model cache
 */
export function clearModelCache(modelType?: ModelType): void {
  if (modelType) {
    // Clear specific model types
    Object.keys(modelCache).forEach(key => {
      if (key.startsWith(modelType)) {
        delete modelCache[key];
      }
    });
    console.log(`Cleared cache for ${modelType} models`);
  } else {
    // Clear all models
    Object.keys(modelCache).forEach(key => {
      delete modelCache[key];
    });
    console.log('Cleared entire model cache');
  }
}

/**
 * Get cache status
 */
export function getModelCacheStatus(): {
  totalModels: number;
  models: {
    type: string;
    version: string | undefined;
    loadedAt: Date;
    metadata: ModelMetadata | null;
  }[];
} {
  const models = Object.entries(modelCache).map(([key, { loadedAt, metadata }]) => {
    const [type, version] = key.split('-');
    return {
      type,
      version: version || undefined,
      loadedAt,
      metadata
    };
  });
  
  return {
    totalModels: models.length,
    models
  };
} 