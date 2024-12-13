'use server';
export const classifyImage = async (formData: FormData) => {
    try {
        const backendResponse = await fetch(`${process.env.API_BASE_URL}/api/predict/`, {
            method: "POST",
            body: formData,
        });

        // Check if the backend response is successful
        if (!backendResponse.ok) {
            const errorText = await backendResponse.text();
            return ({ errorText })
        }

        // Parse the backend response
        const backendData = await backendResponse.json();

        // Return the data to the client
        return backendData;
    } catch (error) {
        console.error('Error on classifying: ', error)
    }
}