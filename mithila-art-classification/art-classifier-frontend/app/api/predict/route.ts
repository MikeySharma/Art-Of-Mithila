import { uploadImg } from "@/actions/cloudinary.actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Extract form data from the incoming request
        const formData = await request.formData();
        const imageFile = formData.get("image");

        if (!imageFile || !(imageFile instanceof Blob)) {
            return NextResponse.json(
                { error: "No image provided or invalid file format" },
                { status: 400 }
            );
        }

        // Prepare FormData for the backend request
        const backendFormData = new FormData();
        backendFormData.append("image", imageFile);

         uploadImg(imageFile);

        // Make a request to the backend server
        const backendResponse = await fetch(`${process.env.API_BASE_URL}/api/predict/`, {
            method: "POST",
            body: backendFormData,
        });

        // Check if the backend response is successful
        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            return NextResponse.json(
                { error: `Backend error: ${errorText}` },
                { status: backendResponse.status }
            );
        }

        // Parse the backend response
        const backendData = await backendResponse.json();

        // Return the data to the client
        return NextResponse.json(backendData);
    } catch (error: unknown) {
        const message =
            error instanceof Error
                ? error.message
                : "An unexpected error occurred.";
        console.error("Error handling the request:", error);
        return NextResponse.json(
            { error: `Error uploading images: ${message}` },
            { status: 500 }
        );
    }
}
