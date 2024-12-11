# Art of Mithila - 🎨 Art Classifier

![Art of Mithila Logo](https://res.cloudinary.com/dch3ir5un/image/upload/v1733944169/83577e3a-ac14-4ce0-aca5-0227f235b24e.png)

This project is a frontend web application built with Next.js 15. It predicts the type of art based on an image or input and displays the top match along with other possible matches. The application uses a deep learning model to analyze the input and return results, such as Mithila Painting, Thangka Painting, Mandala Art, and Paubha Painting.

## Features

- Upload an image or input data to predict the type of art.
- Displays the top match along with the percentage confidence.
- Shows other possible matches with their respective confidence percentages.

## Predicted Results Example

Once an art type is predicted, the results are displayed in the following format:

### Top Match:
- **Mithila Painting**: 99.93%

### Other Matches:
- **Thangka Painting**: 14.15%
- **Mandala Art**: 11.57%
- **Paubha Painting**: 8.58%

## Technologies Used

- **Next.js 15**: A React framework for building web applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: For responsive and clean styling.

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/MikeySharma/Deep-Learning-Projects.git
   ```

2. Install the dependencies:
   ```bash
   cd mithila-art-classification/art-classifier-frontend
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser to view the application.

## Usage

1. Navigate to the homepage of the app.
2. Upload an image or provide the necessary input to predict the art type.
3. The top match and other possible matches will be displayed along with their respective confidence percentages.

## Contributing

Feel free to fork this repository and contribute by creating pull requests. Make sure to follow the coding standards and write tests for new features.