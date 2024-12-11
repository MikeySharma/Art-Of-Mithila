import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Art Classifier - AI-Powered Traditional Art Recognition",
  description: "Upload images of traditional art like Mithila Painting, Mandala Art, Paubha Painting, or Thangka Painting, and let our AI-powered classifier predict the art style with precision.",
  keywords: [
    "art classifier",
    "AI art recognition",
    "traditional art styles",
    "Mithila Painting",
    "Mandala Art",
    "Paubha Painting",
    "Thangka Painting",
    "image classification",
    "AI art project",
    "Next.js app"
  ].join(", "),
  robots: "index, follow",
  openGraph: {
    title: "Art Classifier - AI-Powered Traditional Art Recognition",
    description:
      "Discover the beauty of traditional art styles. Upload an image and let our AI-powered model classify it instantly.",
    url: "https://artofmithila.vercel.app", // Replace with your app's domain
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    site: "@your_twitter_handle", // Replace with your Twitter handle if available
    title: "Art Classifier - AI-Powered Traditional Art Recognition",
    description:
      "Discover the beauty of traditional art styles. Upload an image and let our AI-powered model classify it instantly.",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
