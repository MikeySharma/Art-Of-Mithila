# Art Classification Backend

This project is a backend application that uses a deep learning model to classify images of different types of traditional art. The model predicts the class of the image provided by the user.

## Supported Art Types
- **Mithila Painting**
- **Paubha Painting**
- **Mandala Art**
- **Thangka Painting**

---

## Features
- Accepts images in various formats and preprocesses them for model input.
- Predicts the art category with a percentage probability for each class.
- Returns a detailed JSON response with sorted probabilities.

---

## How to Run

### Prerequisites
1. Python 3.7 or above installed on your system.
2. Install required libraries using `pip`:
   ```bash
   pip install tensorflow pillow django
   ```

### Clone the Repository
```bash
git clone https://github.com/your-username/art-classification-backend.git
cd art-classification-backend
```

### Set Up the Django Project
1. Navigate to the project directory:
   ```bash
   cd image_classifier_backend
   ```
2. Run database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
3. Start the server:
   ```bash
   python manage.py runserver
   ```

---

## How to Use

### Endpoint: `/predict`
This endpoint accepts POST requests with an image file and returns the predicted art category along with probabilities for each class.

#### Example Request
Using `cURL`:
```bash
curl -X POST -F "image=@path/to/your/image.jpg" http://127.0.0.1:8000/predict/
```

#### Example Response
```json
{
    "Predicted Painting": "Mithila Painting",
    "Predictions": [
        {
            "label": "Mithila Painting",
            "percentage": 99.97
        },
        {
            "label": "Mandala Art",
            "percentage": 13.0
        },
        {
            "label": "Thangka Painting",
            "percentage": 8.34
        },
        {
            "label": "Paubha Painting",
            "percentage": 4.8
        }
    ]
}
```

---

## How the Prediction Works
1. **Image Preprocessing:**
   - The image is resized to `224x224` pixels and normalized to match the model's input requirements.
2. **Model Inference:**
   - The preprocessed image is passed through a trained TensorFlow model.
   - The model outputs probabilities for each class.
3. **Response Generation:**
   - The predicted probabilities are sorted, and the class with the highest probability is returned as the predicted painting.

---

## Sample Predictions

### Mithila Painting
**Input Image:**
![Mithila Painting](https://as1.ftcdn.net/v2/jpg/09/77/00/78/1000_F_977007869_uehcVcpfpyWYHPo5SxRltaPAP57gVXBd.jpg)

**Response:**
```json
{
    "Predicted Painting": "Mithila Painting",
    "Predictions": [
        {"label": "Mithila Painting","percentage": 99.93},
        {"label": "Thangka Painting","percentage": 14.24},
        {"label": "Mandala Art","percentage": 11.62},
        {"label": "Paubha Painting","percentage": 8.3}
    ]
}
```

### Paubha Painting
**Input Image:**
![Paubha Painting](https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Vishnu_Mandala.jpg/480px-Vishnu_Mandala.jpg)

**Response:**
```json
{
    "Predicted Painting": "Paubha Painting",
    "Predictions": [
        {"label": "Paubha Painting", "percentage": 95.67},
        {"label": "Thangka Painting", "percentage": 20.34},
        {"label": "Mandala Art", "percentage": 10.5},
        {"label": "Mithila Painting", "percentage": 2.14}
    ]
}
```

### Mandala Art
**Input Image:**
![Mandala Art](https://www.indiaart.com/Paintings/25355/large/27737.jpg.ashx?height=350)

**Response:**
```json
{
    "Predicted Painting": "Mandala Art",
    "Predictions": [
        {"label": "Mandala Art", "percentage": 92.45},
        {"label": "Thangka Painting", "percentage": 25.6},
        {"label": "Paubha Painting", "percentage": 11.3},
        {"label": "Mithila Painting", "percentage": 5.0}
    ]
}
```

### Thangka Painting
**Input Image:**
![Thangka Painting](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Thangka_Depicting_Vajrabhairava%2C_ca._1740%2C_Sotheby%27s.jpg/220px-Thangka_Depicting_Vajrabhairava%2C_ca._1740%2C_Sotheby%27s.jpg)

**Response:**
```json
{
    "Predicted Painting": "Thangka Painting",
    "Predictions": [
        {"label": "Thangka Painting", "percentage": 98.87},
        {"label": "Mandala Art", "percentage": 15.3},
        {"label": "Paubha Painting", "percentage": 7.67},
        {"label": "Mithila Painting", "percentage": 2.45}
    ]
}
```

---

## Contributing
Feel free to contribute by submitting issues or pull requests. Ensure all new features are accompanied by proper documentation and tests.