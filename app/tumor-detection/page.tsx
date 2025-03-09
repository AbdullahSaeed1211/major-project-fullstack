import { Metadata } from "next";
import { TumorDetectionForm } from "@/components/tumor-detection-form";

export const metadata: Metadata = {
  title: "Brain Tumor Detection | Brain AI",
  description: "Upload MRI scans for AI-powered brain tumor detection and analysis",
};

export default function TumorDetectionPage() {
  return (
    <div className="flex flex-col">
      <section className="magic-section relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[length:20px_20px] bg-center [background-image:linear-gradient(rgba(var(--magic-primary),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--magic-primary),0.1)_1px,transparent_1px)]"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--magic-primary),0.3)] to-[rgba(var(--magic-accent),0.3)] blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--magic-secondary),0.3)] to-[rgba(var(--magic-primary),0.3)] blur-3xl"></div>
        
        <div className="magic-container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="magic-gradient-text">Brain Tumor</span> Detection
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Upload your MRI scan for AI-powered tumor detection and analysis
            </p>
          </div>
          
          <div className="mx-auto mt-8 max-w-2xl">
            <TumorDetectionForm />
          </div>
        </div>
      </section>
    </div>
  );
} 