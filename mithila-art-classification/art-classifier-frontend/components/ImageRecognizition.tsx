
'use client';
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { Accept, useDropzone } from "react-dropzone";

interface Prediction {
  label: string;
  percentage: number;
}

interface PredictionsResponse {
  "Predicted Painting": string;
  Predictions: Prediction[];
}

export default function ImageRecognition() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<PredictionsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (file: File | null): void => {
    setSelectedFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
    setPredictions(null);
    setError(null);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
  }, []);

  const handlePaste = (event: ClipboardEvent) => {
    const file = event.clipboardData?.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Please select an image.");
      return;
    }
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to classify the image.");
      }

      const data: PredictionsResponse = await response.json();
      setPredictions(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const accept: Accept = {
    "image/jpeg": ["gzip", "deflate"],
    "image/png": ["gzip", "deflate"],
    "image/webp": ["gzip", "deflate"],
    "image/svg+xml": ["gzip", "deflate"],
  };


  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept,
    multiple: false,
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white py-4 px-4">
      <h1 className="text-4xl font-bold mb-8">🎨 Art Classifier</h1>
      <div className="w-full h-full flex items-start justify-around flex-wrap">
        <div className="w-fit h-fit">

          <div
            {...getRootProps()}
            className="w-full max-w-lg bg-white text-gray-800 rounded-lg shadow-lg p-6 text-center cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 transition-all"
          >
            <input {...getInputProps()} />
            <p className="text-lg font-semibold">Drag & Drop or Click to Upload</p>
            <p className="text-sm text-gray-500">You can also paste an image here.</p>
          </div>

          {imagePreview && (
            <div className="mt-6">
              <Image
                src={imagePreview}
                alt="Uploaded preview"
                width={500}
                height={500}
                className="rounded-lg border-4 border-white shadow-lg aspect-auto max-h-72"
              />
            </div>
          )}

          {error && <p className="text-red-500 mt-4">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
          >
            {loading ? "Classifying..." : "Submit"}
          </button>
        </div>

        {predictions && (
          <div className="mt-8 bg-white text-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Predicted Results</h2>
            <p className="mb-2">
              <span className="font-bold">Top Match:</span> {predictions["Predicted Painting"]}
            </p>
            <ul>
              {predictions.Predictions?.map((prediction) => (
                <li
                  key={prediction.label}
                  className="flex justify-between border-b py-2"
                >
                  <span>{prediction.label}</span>
                  <span>{prediction.percentage}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  );
}
