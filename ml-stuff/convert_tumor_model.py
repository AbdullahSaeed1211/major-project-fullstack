import tensorflow as tf
import tensorflowjs as tfjs
import os
import numpy as np
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model

# Create directories
os.makedirs('public/models/tumor-detection', exist_ok=True)
os.makedirs('public/models/tumor-classification', exist_ok=True)

print("Creating tumor detection model...")

# First, create a binary classifier (tumor vs. no tumor)
# Using a pretrained EfficientNetB0 as the base model
base_model = EfficientNetB0(
    include_top=False,
    weights='imagenet',
    input_shape=(224, 224, 3)
)

# Freeze the base model
base_model.trainable = False

# Add classification head
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.3)(x)
predictions = Dense(1, activation='sigmoid')(x)

# Create the binary classification model
tumor_detection_model = Model(inputs=base_model.input, outputs=predictions)

# Compile the model
tumor_detection_model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

print("Creating tumor classification model...")

# Now create a multiclass classifier for tumor types
# Using the same base model architecture
base_model2 = EfficientNetB0(
    include_top=False,
    weights='imagenet',
    input_shape=(224, 224, 3)
)

# Freeze the base model
base_model2.trainable = False

# Add classification head for tumor types
x = base_model2.output
x = GlobalAveragePooling2D()(x)
x = Dense(256, activation='relu')(x)
x = Dropout(0.3)(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.2)(x)
predictions = Dense(4, activation='softmax')(x)  # 4 classes: Glioma, Meningioma, Pituitary, No Tumor

# Create the multiclass model
tumor_type_model = Model(inputs=base_model2.input, outputs=predictions)

# Compile the model
tumor_type_model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

print("Converting tumor detection model to TensorFlow.js format...")

# Convert and save the binary tumor detection model
tfjs.converters.save_keras_model(tumor_detection_model, 'public/models/tumor-detection')

print("Converting tumor classification model to TensorFlow.js format...")

# Convert and save the multiclass tumor type model
tfjs.converters.save_keras_model(tumor_type_model, 'public/models/tumor-classification')

print("Model conversion complete!")

# Create sample inputs for testing
print("Creating sample inputs...")
sample_input = np.zeros((1, 224, 224, 3), dtype=np.float32)

# Save sample inputs to verify model integrity
np.save('public/models/tumor-detection/sample_input.npy', sample_input)
np.save('public/models/tumor-classification/sample_input.npy', sample_input)

# Predict with both models to ensure they work
detection_output = tumor_detection_model.predict(sample_input)
type_output = tumor_type_model.predict(sample_input)

print(f"Detection model output shape: {detection_output.shape}")
print(f"Type model output shape: {type_output.shape}")

print("Conversion and testing completed successfully!") 