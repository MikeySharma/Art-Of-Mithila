import tensorflow as tf
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'art-classification-custom-dataset-c4-v7-1.h5')

# Load the model
model = tf.keras.models.load_model(MODEL_PATH)

def preprocess_image(image):
    """
    Preprocess the image to match the model's requirements.
    """
    # Resize to 224x224 and ensure 3 channels
    image = tf.image.resize(image, (224, 224))
    if image.shape[-1] != 3:
        image = tf.image.grayscale_to_rgb(image)
    # Normalize image
    image = tf.cast(image, tf.float32) / 255.0
    return tf.expand_dims(image, axis=0)

def predict_class(image):
    """
    Predict the class of the given image.
    """
    processed_image = preprocess_image(image)
    predictions = model.predict(processed_image)
    predicted_class = tf.argmax(predictions[0]).numpy()
    return predicted_class
