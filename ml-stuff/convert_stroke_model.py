import joblib
import numpy as np
import pandas as pd
import tensorflow as tf
import os
from sklearn.preprocessing import StandardScaler
from tensorflow import keras

# Create directory for the model
os.makedirs('public/models/stroke-model', exist_ok=True)

# Load the original model
print("Loading joblib model...")
stroke_model = joblib.load("ml-stuff/model.joblib")
rf_model = stroke_model['model']  # Extract the Random Forest model

# Get the feature names and preprocessing info
encoded_cols = stroke_model["encoded_cols"]
numeric_cols = stroke_model["numeric_cols"]
preprocessor = stroke_model["preprocessor"]

# Define a function to create a TensorFlow model that matches the Random Forest structure
def create_tf_model(rf_model, n_features):
    """
    Create a TensorFlow model that approximates the Random Forest model
    """
    # Create a simple neural network with similar capacity
    model = keras.Sequential([
        keras.layers.Dense(64, activation='relu', input_shape=(n_features,)),
        keras.layers.Dropout(0.3),
        keras.layers.Dense(32, activation='relu'),
        keras.layers.Dropout(0.2),
        keras.layers.Dense(16, activation='relu'),
        keras.layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    
    return model

# Load sample data to fit the model (use a subset of the training data)
print("Loading training data...")
train_df = pd.read_csv("ml-stuff/train.csv")
X_train = train_df[numeric_cols + encoded_cols]

# Create tensor representation of data
print("Creating training dataset...")
# Apply preprocessing
X_train_processed = pd.DataFrame()
for col in numeric_cols:
    X_train_processed[col] = X_train[col]
    
X_train_processed[encoded_cols] = preprocessor.transform(X_train)

# Convert to numpy arrays
X = X_train_processed.values
n_features = X.shape[1]

# Get the actual predictions from the original model
print("Generating predictions from original model...")
y_proba = rf_model.predict_proba(X)[:, 1]  # Get probability of class 1

# Create and train the TensorFlow model using the original model's predictions
print("Creating and training TensorFlow model...")
tf_model = create_tf_model(rf_model, n_features)
tf_model.fit(X, y_proba, epochs=10, batch_size=32, verbose=1)

# Evaluate the model to ensure it matches
print("Evaluating model similarity...")
rf_preds = rf_model.predict_proba(X[:100])[:, 1]
tf_preds = tf_model.predict(X[:100]).flatten()
avg_diff = np.mean(np.abs(rf_preds - tf_preds))
print(f"Average difference in predictions: {avg_diff:.4f}")

# Save the TensorFlow model as TF.js format
print("Saving model in TensorFlow.js format...")
export_path = 'public/models/stroke-model'
tf.saved_model.save(tf_model, export_path)

# Convert to TensorFlow.js format
print("Converting to TensorFlow.js format...")
cmd = f"tensorflowjs_converter --input_format=tf_saved_model --output_format=tfjs_graph_model {export_path} {export_path}"
os.system(cmd)

print(f"Model successfully converted and saved to {export_path}")

# Save normalization parameters as JSON for JavaScript
import json
normalization = {
    'age': {'mean': float(X_train['age'].mean()), 'std': float(X_train['age'].std())},
    'avgGlucoseLevel': {'mean': float(X_train['avg_glucose_level'].mean()), 'std': float(X_train['avg_glucose_level'].std())},
    'bmi': {'mean': float(X_train['bmi'].mean()), 'std': float(X_train['bmi'].std())}
}

with open(f"{export_path}/normalization.json", 'w') as f:
    json.dump(normalization, f)

print("Normalization parameters saved. Conversion complete!") 