"use client";

import { HeroSection } from "@/components/home/hero-section";
import { StatsBar } from "@/components/home/stats-bar";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FeaturesSection } from "@/components/home/features-section";
import { ToolsShowcase } from "@/components/home/tools-showcase";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brainwise | Complete Brain Health Platform",
  description: "Optimize your brain health with personalized cognitive training, stroke risk assessment, and AI-driven brain health tools.",
  keywords: "brain health, cognitive training, stroke prevention, brain optimization, memory training, brain games",
  openGraph: {
    title: "Brainwise | Complete Brain Health Platform",
    description: "Optimize your brain health with personalized cognitive training, stroke risk assessment, and AI-driven brain health tools.",
    url: "https://brainwise.com",
    type: "website",
    images: [
      {
        url: "/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Brainwise Brain Health Platform"
      }
    ],
    siteName: "Brainwise"
  },
  twitter: {
    card: "summary_large_image",
    title: "Brainwise | Complete Brain Health Platform",
    description: "Optimize your brain health with personalized cognitive training, stroke risk assessment, and AI-driven brain health tools.",
    images: ["/images/og-home.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function Home() {
  return (
    <main className="flex flex-col w-full overflow-hidden">
      <HeroSection />
      <StatsBar />
      <TestimonialsSection />
      <FeaturesSection />
      <ToolsShowcase />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
