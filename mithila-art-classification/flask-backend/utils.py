import tensorflow as tf
import numpy as np
import os
from PIL import Image
import requests
from io import BytesIO


# Define constants
MODEL_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'models')
MODEL_FILENAME = 'art-classification-custom-dataset-c4-v14-1.h5'
MODEL_PATH = os.path.join(MODEL_DIR, MODEL_FILENAME)
MODEL_URL = "https://www.dropbox.com/scl/fi/mp1c45cwuucrwew5yxe7g/art-classification-custom-dataset-c4-v14-1.h5?rlkey=p3in5zc3csjf6xkgmv8ekdbkg&st=yjli6upg&dl=1"

# Ensure the model directory exists
os.makedirs(MODEL_DIR, exist_ok=True)

def download_model():
    if not os.path.exists(MODEL_PATH):
        print("Downloading model file...")
        try:
            response = requests.get(MODEL_URL, stream=True)
            response.raise_for_status()
            with open(MODEL_PATH, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print("Model downloaded successfully.")
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Failed to download the model file: {e}")

# Load the model
download_model()
model = tf.keras.models.load_model(MODEL_PATH)

def preprocess_image(image):
    """
    Preprocess the image to match the model's requirements.
    """
    # Ensure the image is RGB
    if image.mode != "RGB":
        image = image.convert("RGB")

    # Resize to 224x224
    image = image.resize((224, 224))

    # Convert to a tensor and normalize
    image = tf.convert_to_tensor(np.array(image), dtype=tf.float32) / 255.0

    # Add batch dimension
    return tf.expand_dims(image, axis=0)

def predict_class(image):
    """
    Predict the class of the given image and return probabilities for each label.
    """
    global model  # Use the globally loaded model
    processed_image = preprocess_image(image)
    predictions = model.predict(processed_image)
    return np.array(predictions[0])
