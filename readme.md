# Art of Mithila - Art Type Prediction

This project is a web application that uses machine learning and deep learning to predict the type of traditional Nepali art, such as Mithila Painting, Thangka Painting, Mandala Art, and Paubha Painting. The application is built with a Next.js 15 frontend, a Django Python backend, and a deep learning model trained using TensorFlow/Keras based on VGG16 transfer learning.

## Project Architecture

- **Frontend**: Next.js 15, React, Tailwind CSS
- **Backend**: Django (Python)
- **Deep Learning Model**: TensorFlow/Keras, VGG16 Transfer Learning
- **Cloud Storage**: Cloudinary (for image upload)

## Features

- **Image Upload**: Users can upload images to predict the type of traditional Indian art.
- **Art Prediction**: The uploaded image is analyzed by the deep learning model, which predicts the art type.
- **Prediction Results**: The top match art type is displayed along with the confidence percentage. Other possible matches are also shown.
- **Optimized Image Handling**: The app resizes, formats, and optimizes the image using Cloudinary for better performance.

## Technologies Used

- **Frontend**:
  - **Next.js 15**: A React-based framework for building static and dynamic web applications.
  - **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
  
- **Backend**:
  - **Django (Python)**: A high-level Python web framework that simplifies backend development.
  - **Django Rest Framework (DRF)**: For building the API to handle image uploads and predictions.

- **Machine Learning**:
  - **TensorFlow/Keras**: A deep learning framework used to build and train the VGG16 transfer learning model.
  - **VGG16 Transfer Learning**: A pre-trained convolutional neural network (CNN) model fine-tuned to classify art types.

- **Cloud Storage**:
  - **Cloudinary**: A cloud platform for image and video management used to upload and optimize images.

## Installation and Setup

### Frontend Setup (Next.js 15)

1. Clone the repository:
   ```bash
   git clone https://github.com/MikeySharma/Deep-Learning-Projects.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd mithila-art-classification/art-classifier-frontend
   ```

3. Install the frontend dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

### Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd mithila-art-classification/art-classifier-backend
   ```

2. Set up a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # For macOS/Linux
   venv\Scripts\activate  # For Windows
   ```

3. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up the database:
   ```bash
   python manage.py migrate
   ```

5. Run the Django development server:
   ```bash
   python manage.py runserver
   ```

   The backend will be available at `http://localhost:8000`.

### Deep Learning Model Setup (TensorFlow/Keras)

1. Clone the deep learning model repository (if separate):
   ```bash
   git clone https://github.com/MikeySharma/mithila-art-classification-model.git
   ```

2. Install the necessary dependencies for the model:
   ```bash
   pip install -r requirements.txt
   ```

3. Train or load the pre-trained VGG16 model:
   - The model is trained using TensorFlow and Keras, fine-tuned with the art dataset. The model is based on VGG16 transfer learning, a pre-trained CNN architecture.
   - The model's weights are saved in the backend, which will be used for inference when a new image is uploaded for prediction.

4. Ensure the trained model is accessible to the Django backend for making predictions.

## API Endpoints

### POST `/api/predict/`

This endpoint accepts an image file via a POST request and returns the predicted art type and confidence levels.

#### Request
- **Method**: POST
- **Endpoint**: `/api/predict/`
- **Body**: A form-data containing the image file:
  - **image**: The image file to be classified (e.g., `.jpg`, `.png`).

#### Response
- **Status**: 200 OK
- **Body**: A JSON object containing the predicted art types and their respective confidence scores:
  ```json
  {
    "top_match": {
      "name": "Mithila Painting",
      "confidence": 99.93
    },
    "other_matches": [
      {
        "name": "Thangka Painting",
        "confidence": 14.15
      },
      {
        "name": "Mandala Art",
        "confidence": 11.57
      },
      {
        "name": "Paubha Painting",
        "confidence": 8.58
      }
    ]
  }
  ```

## Deployment

To deploy the project, you can host the frontend on platforms like Vercel or Netlify, the backend on platforms like Heroku or AWS, and the trained model can be hosted in the backend for API inference.

### Deployment Steps:

1. **Frontend (Next.js 15)**:
   - Deploy to Vercel:
     - Install the Vercel CLI: `npm i -g vercel`
     - Run `vercel` in the frontend directory to deploy the app.
   
2. **Backend (Django)**:
   - Deploy to Heroku:
     - Install the Heroku CLI: `brew install heroku`
     - Run `heroku create` to create an app on Heroku.
     - Push the Django app to Heroku using `git push heroku master`.

3. **Cloudinary**:
   - Configure Cloudinary with the appropriate credentials in your `.env` file for image uploads.

## Contributing

Feel free to fork this repository, make changes, and submit pull requests. Make sure to follow the coding standards and write tests for new features.

## License

This project is licensed under the MIT License.

## Acknowledgments

- **VGG16 Model**: Used for transfer learning as the base deep learning model.
- **Cloudinary**: Used for image storage and optimization.
- **TensorFlow/Keras**: Used for building and training the deep learning model.
