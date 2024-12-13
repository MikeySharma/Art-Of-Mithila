'use server';
import * as tf from '@tensorflow/tfjs';
import { uploadImg } from './cloudinary.actions';
import axios from 'axios';

// Load the model globally
let model: any;

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel('file://./models/tfjs_model/model.json');
  }
  return model;
};

const preprocessImage = (imageBuffer: Buffer) => {
  const uint8Array = new Uint8Array(imageBuffer); // Convert Buffer to Uint8Array
  const imageTensor = tf.node.decodeImage(uint8Array, 3); // Decode image to RGB
  const resizedImage = tf.image.resizeBilinear(imageTensor, [224, 224]); // Resize to 224x224
  const normalizedImage = resizedImage.toFloat().div(tf.scalar(255.0)); // Normalize
  return normalizedImage.expandDims(0); // Add batch dimension
};

const getBuffer = async (url: string) => {
  try {
    const arrayBuffer = await axios.get(url, { responseType: 'arraybuffer' });
    const response = arrayBuffer.data;
    return Buffer.from(response);
  } catch (error) {
    console.error('Error on Getting Buffer: ', error);
    throw new Error('Error fetching image buffer');
  }
};

export const classifyImage = async (file: File) => {
  try {
    const model = await loadModel();
    // Get the image buffer from the URL
    const secureUrl = await uploadImg(file); // Assuming this uploads and returns a URL
    const imageBuffer = await getBuffer(secureUrl);

    const imageTensor = preprocessImage(imageBuffer); // Preprocess image buffer to tensor
    const prediction = await model.predict(imageTensor).data(); // Get prediction data

    // Sample labels and classes for predictions
    return {
      'Predicted Painting': 'Sample Painting', // Replace with actual prediction label
      Predictions: prediction.map((score: number, index: number) => ({
        label: `Class ${index}`, // Replace with actual class labels
        percentage: Math.round(score * 100),
      })),
    };
  } catch (error) {
    console.error('Error during prediction:', error);
    throw new Error('Error during prediction');
  }
};
