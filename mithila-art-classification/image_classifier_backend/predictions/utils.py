import tensorflow as tf
import numpy as np
import os
from PIL import Image
import io

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'art-classification-custom-dataset-c4-v14-1.h5')

# Load the model
model = tf.keras.models.load_model(MODEL_PATH)


def preprocess_image(image):
    """
    Preprocess the image to match the model's requirements.
    Converts the image to .jpg format if necessary.
    """
    try:
        # Convert the image to .jpg format using Pillow
        image_data = tf.io.encode_jpeg(image).numpy()  # Convert tensor image to JPEG bytes
        image = Image.open(io.BytesIO(image_data))  # Open the image as a Pillow object

        # Ensure the image is RGB
        if image.mode != "RGB":
            image = image.convert("RGB")
        
        # Resize to 224x224
        image = image.resize((224, 224))
        
        # Convert back to a tensor and normalize
        image = tf.convert_to_tensor(np.array(image), dtype=tf.float32) / 255.0
        
        # Add batch dimension
        return tf.expand_dims(image, axis=0)
    except Exception as e:
        raise ValueError(f"Error during preprocessing: {str(e)}")


def predict_class(image):
    """
    Predict the class of the given image and return probabilities for each label.
    """
    try:
        # Preprocess the image
        processed_image = preprocess_image(image)
        
        # Make predictions
        predictions = model.predict(processed_image)
        
        # Ensure predictions are in the correct format
        if len(predictions) == 0 or len(predictions[0]) == 0:
            raise ValueError("Model returned an empty prediction. Check the input or model configuration.")
        
        # Return the probabilities as a numpy array
        return np.array(predictions[0])
    except tf.errors.InvalidArgumentError as tf_error:
        raise ValueError(f"TensorFlow error during prediction: {str(tf_error)}")
    except Exception as e:
        raise ValueError(f"Error during prediction: {str(e)}")
