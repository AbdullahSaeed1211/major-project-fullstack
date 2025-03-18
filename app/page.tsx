"use client";

import { HeroSection } from "@/components/home/hero-section";
import { StatsBar } from "@/components/home/stats-bar";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { FeaturesSection } from "@/components/home/features-section";
import { ToolsShowcase } from "@/components/home/tools-showcase";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/home/cta-section";

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
