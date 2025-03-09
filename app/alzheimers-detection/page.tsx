import { Metadata } from "next";
import { AlzheimersDetectionForm } from "@/components/alzheimers-detection-form";

export const metadata: Metadata = {
  title: "Alzheimer's Detection | Brain AI",
  description: "Early detection of Alzheimer's disease using AI analysis",
};

export default function AlzheimersDetectionPage() {
  return (
    <div className="flex flex-col">
      <section className="magic-section relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[length:20px_20px] bg-center [background-image:linear-gradient(rgba(var(--magic-primary),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--magic-primary),0.1)_1px,transparent_1px)]"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--magic-primary),0.3)] to-[rgba(var(--magic-accent),0.3)] blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--magic-secondary),0.3)] to-[rgba(var(--magic-primary),0.3)] blur-3xl"></div>
        
        <div className="magic-container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="magic-gradient-text">Alzheimer's</span> Detection
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Early detection of Alzheimer's disease using AI analysis of MRI scans and cognitive assessments
            </p>
          </div>
          
          <div className="mx-auto mt-8 max-w-4xl">
            <AlzheimersDetectionForm />
          </div>
        </div>
      </section>
    </div>
  );
} 