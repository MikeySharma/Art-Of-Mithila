from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
from utils import download_model, predict_class

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins

# Define labels
IMAGE_LABELS = [
    "Mandala Art",
    "Mithila Painting",
    "Paubha Painting",
    "Thangka Painting"
]

@app.route('/', methods=['GET'])
def home():
    return jsonify('Welcome to Next Gen AI Art Classifier.')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        uploaded_file = request.files['image']
        if uploaded_file.filename == '':
            return jsonify({'error': 'Empty file name provided'}), 400

        # Read and decode the uploaded image
        image = Image.open(uploaded_file.stream)

        # Preprocess and predict
        predicted_probabilities = predict_class(image)

        if len(predicted_probabilities) != len(IMAGE_LABELS):
            return jsonify({'error': 'Model output does not match the number of labels.'}), 500

        # Create predictions
        predictions = sorted(
            [{"label": label, "percentage": round(float(prob) * 100, 2)}  # Ensure float conversion
             for label, prob in zip(IMAGE_LABELS, predicted_probabilities)],
            key=lambda x: x["percentage"], reverse=True
        )
        predicted_painting = max(predictions, key=lambda x: x["percentage"])["label"]

        return jsonify({
            'Predicted Painting': predicted_painting,
            'Predictions': predictions
        }), 200

    except tf.errors.InvalidArgumentError:
        return jsonify({'error': 'Invalid image file. Please upload a valid image.'}), 400
    except Exception as e:
        return jsonify({'error': f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=False)
