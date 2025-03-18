import { StrokeForm } from "@/components/stroke-form";

export const metadata = {
  title: "Stroke Prediction | Brainwise",
  description: "Predict the likelihood of a stroke based on various health factors.",
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