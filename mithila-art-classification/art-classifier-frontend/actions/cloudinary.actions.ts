import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

export async function uploadImg(image: File) {
    // Configuration
    cloudinary.config({
        cloud_name: 'dch3ir5un',
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET, // Only required if you use signed uploads
    });

    try {
        // Create a unique public_id for the image
        const uuid = uuidv4(); // Example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

        // Create a FormData instance and append the image file
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "art-images");  // Add your preset name here
        formData.append("public_id", uuid);  // Optional: You can customize the public ID

        // Send the image file to Cloudinary using fetch
        const uploadResult = await fetch('https://api.cloudinary.com/v1_1/dch3ir5un/image/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await uploadResult.json();

        // Return the secure URL after upload
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Image upload failed');
    }
}
