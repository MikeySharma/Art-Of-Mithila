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
        # Validate request
        if not request.FILES.get('image'):
            return JsonResponse({'error': 'No image file provided'}, status=400)

        try:
            # Decode the image
            uploaded_file = request.FILES['image']
            image = tf.io.decode_image(uploaded_file.read(), channels=3)

            image_labels = [
            "Mandala Art",
            "Mithila Painting",
            "Paubha Painting",
            "Thangka Painting"
            ]
            # Predict the class
            predicted_class = predict_class(image)
            predicted_painting = image_labels[int(predicted_class)]
            return JsonResponse({'Predicted Painting': predicted_painting}, status=200)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
