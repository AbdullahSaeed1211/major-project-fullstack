import Link from "next/link";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="magic-section relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[length:20px_20px] bg-center [background-image:linear-gradient(rgba(var(--primary),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.1)_1px,transparent_1px)]"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.3)] to-[rgba(var(--accent),0.3)] blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--secondary),0.3)] to-[rgba(var(--primary),0.3)] blur-3xl"></div>
        
        <div className="magic-container relative">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="magic-gradient-text">AI-Powered</span> Brain Stroke Prediction & Analysis
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Early detection and analysis of brain stroke risk factors using advanced machine learning algorithms.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  href="/stroke-prediction"
                  className="magic-button-primary"
                >
                  Get Started
                </Link>
                <Link
                  href="/about"
                  className="magic-button-secondary"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-64 w-full max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br from-[rgba(var(--primary),0.1)] to-[rgba(var(--accent),0.1)] p-1 backdrop-blur-sm sm:h-80 lg:h-96">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-white/30 dark:bg-black/20 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-24 w-24 text-[rgb(var(--primary))]"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <circle cx="10" cy="13" r="2" />
                    <path d="m20 17-3.5-3.5a2 2 0 0 0-2.5-.1l-.5.4-3-3a2 2 0 0 0-3 .1L2 17" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="magic-section relative bg-gradient-to-b from-[rgba(var(--background-start-rgb),1)] via-[rgba(var(--primary),0.03)] to-[rgba(var(--background-end-rgb),1)]">
        <div className="magic-container relative">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="magic-gradient-text">Key Features</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Our platform offers comprehensive tools for brain health analysis
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="magic-card flex flex-col items-center">
              <div className="magic-icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-[rgb(var(--primary))]"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold">Stroke Prediction</h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                Analyze risk factors and predict stroke likelihood with our advanced ML model
              </p>
            </div>
            <div className="magic-card flex flex-col items-center">
              <div className="magic-icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-[rgb(var(--accent))]"
                >
                  <path d="M15 3v4a1 1 0 0 0 1 1h4" />
                  <path d="M18 17v.01" />
                  <path d="M18 14a3 3 0 0 1 0 6" />
                  <path d="M18 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path d="M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M6 16v-3a1 1 0 0 1 1-1h7" />
                  <path d="M9 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                  <path d="M9 9v3" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold">Tumor Detection</h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                Upload MRI scans for AI-powered brain tumor detection and analysis
              </p>
            </div>
            <div className="magic-card flex flex-col items-center">
              <div className="magic-icon-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-[rgb(var(--secondary))]"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M8 10h.01" />
                  <path d="M12 10h.01" />
                  <path d="M16 10h.01" />
                </svg>
              </div>
              <h3 className="mt-6 text-xl font-bold">AI Chatbot</h3>
              <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                Get instant answers to your questions about stroke prevention and brain health
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="magic-section relative">
        <div className="absolute inset-0 -z-10 bg-[length:20px_20px] bg-center [background-image:linear-gradient(rgba(var(--primary),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary),0.1)_1px,transparent_1px)]"></div>
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--accent),0.3)] to-[rgba(var(--primary),0.3)] blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--primary),0.3)] to-[rgba(var(--secondary),0.3)] blur-3xl"></div>
        
        <div className="magic-container relative">
          <div className="magic-card text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Start Your <span className="magic-gradient-text">Brain Health Analysis</span> Today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Early detection is key to preventing brain stroke and other neurological conditions
            </p>
            <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link
                href="/stroke-prediction"
                className="magic-button-primary"
              >
                Try Stroke Prediction
              </Link>
              <Link
                href="/tumor-detection"
                className="magic-button-secondary"
              >
                Try Tumor Detection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
