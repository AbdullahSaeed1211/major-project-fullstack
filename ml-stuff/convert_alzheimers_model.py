import tensorflow as tf
import tensorflowjs as tfjs
import os
import numpy as np
from tensorflow.keras.applications import EfficientNetB1
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model

# Create directory for the model
os.makedirs('public/models/alzheimers-detection', exist_ok=True)

print("Creating Alzheimer's detection model...")

# Create a multiclass classifier for Alzheimer's stages
# Using a pretrained EfficientNetB1 as the base model (slightly larger than B0)
base_model = EfficientNetB1(
    include_top=False,
    weights='imagenet',
    input_shape=(224, 224, 3)
)

# Freeze the base model
base_model.trainable = False

# Add classification head for Alzheimer's stages
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(256, activation='relu')(x)
x = Dropout(0.4)(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.3)(x)
predictions = Dense(5, activation='softmax')(x)  # 5 classes: NonDemented, VeryMildDemented, MildDemented, ModerateDemented, SevereDemented

# Create the model
alzheimers_model = Model(inputs=base_model.input, outputs=predictions)

# Compile the model
alzheimers_model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Print model summary
alzheimers_model.summary()

print("Converting Alzheimer's detection model to TensorFlow.js format...")

# Convert and save the model
tfjs.converters.save_keras_model(alzheimers_model, 'public/models/alzheimers-detection')

print("Model conversion complete!")

# Create sample inputs for testing
print("Creating sample inputs...")
sample_input = np.zeros((1, 224, 224, 3), dtype=np.float32)

# Save sample input to verify model integrity
np.save('public/models/alzheimers-detection/sample_input.npy', sample_input)

# Predict with the model to ensure it works
output = alzheimers_model.predict(sample_input)

print(f"Model output shape: {output.shape}")
print(f"Output probabilities for sample input: {output[0]}")

# Save class names for reference
class_names = ['NonDemented', 'VeryMildDemented', 'MildDemented', 'ModerateDemented', 'SevereDemented']
with open('public/models/alzheimers-detection/class_names.txt', 'w') as f:
    f.write('\n'.join(class_names))

print("Conversion and testing completed successfully!") 