from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import tensorflow as tf
from .utils import predict_class

@method_decorator(csrf_exempt, name='dispatch')
class PredictView(View):
    def post(self, request, *args, **kwargs):
        """
        Handle POST requests for image classification.
        """
        # Validate the request for an image file
        if not request.FILES.get('image'):
            return JsonResponse({'error': 'No image file provided'}, status=400)

        try:
            # Read and decode the uploaded image
            uploaded_file = request.FILES['image']
            image = tf.io.decode_image(uploaded_file.read(), channels=3)

            # Define the labels
            image_labels = [
                "Mandala Art",
                "Mithila Painting",
                "Paubha Painting",
                "Thangka Painting"
            ]

            # Get predicted probabilities from the model
            predicted_probabilities = predict_class(image)  # Example: [0.01, 0.9999, 0.0001, 0.0000]

            if len(predicted_probabilities) != len(image_labels):
                return JsonResponse({'error': 'Model output does not match the number of labels.'}, status=500)

            # Create a sorted list of dictionaries with labels and their respective probabilities
            predictions = sorted(
                [{"label": label, "percentage": round(prob * 100, 2)}
                 for label, prob in zip(image_labels, predicted_probabilities)],
                key=lambda x: x["percentage"], reverse=True
            )

            # Find the label with the highest probability
            predicted_painting = max(predictions, key=lambda x: x["percentage"])["label"]

            # Return the result as JSON
            return JsonResponse({
                'Predicted Painting': predicted_painting,
                'Predictions': predictions
            }, status=200)

        except tf.errors.InvalidArgumentError:
            return JsonResponse({'error': 'Invalid image file. Please upload a valid image.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f"An unexpected error occurred: {str(e)}"}, status=500)
