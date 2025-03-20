import { StrokeForm } from "@/components/stroke-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stroke Risk Assessment | Brainwise",
  description: "Evaluate your stroke risk based on health factors and get personalized recommendations to reduce your risk.",
  keywords: "stroke risk, stroke prediction, brain health, stroke assessment, stroke prevention, risk factors",
  openGraph: {
    title: "Stroke Risk Assessment | Brainwise",
    description: "Evaluate your stroke risk based on health factors and get personalized recommendations to reduce your risk.",
    url: "https://brainwise-sigma.vercel.app/stroke-prediction",
    type: "website",
    images: [
      {
        url: "/images/og-stroke-prediction.jpg",
        width: 1200,
        height: 630,
        alt: "Brainwise Stroke Risk Assessment"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Stroke Risk Assessment | Brainwise",
    description: "Evaluate your stroke risk based on health factors and get personalized recommendations to reduce your risk.",
    images: ["/images/og-stroke-prediction.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function StrokePredictionPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            <span className="magic-gradient-text">Stroke Prediction</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-300 md:text-xl">
            Fill in the form below to predict your stroke risk based on health factors.
          </p>
        </div>
        <StrokeForm />
      </div>
    </div>
  );
} 