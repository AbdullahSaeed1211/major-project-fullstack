"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-24 px-4 md:px-6 border-b overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 -z-10 bg-[length:20px_20px] bg-center [background-image:linear-gradient(rgba(var(--magic-primary),0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--magic-primary),0.05)_1px,transparent_1px)]"></div>
      
      {/* Gradient blobs */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--magic-primary),0.2)] to-[rgba(var(--magic-accent),0.2)] blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-[rgba(var(--magic-secondary),0.2)] to-[rgba(var(--magic-primary),0.2)] blur-3xl"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background/80 backdrop-blur-sm">
              <span className="bg-primary/20 text-primary rounded-full p-1 mr-2">
                <Brain className="h-3.5 w-3.5" />
              </span>
              <span>Brain AI — Complete Brain Health Toolkit</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Train, Assess & <span className="magic-gradient-text">Optimize</span> Your Brain Health
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Discover a comprehensive suite of cognitive tools designed to strengthen your brain, 
              assess your health, and help you maintain optimal mental performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-gradient-to-r from-[rgb(var(--magic-primary))] to-[rgb(var(--magic-primary-light))] hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all border-none" asChild>
                <Link href="/tools">
                  Start Free Training <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 backdrop-blur-sm bg-background/50" asChild>
                <Link href="/stroke-prediction">
                  Check Health Risks
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">No credit card required</span> • <span className="font-medium">5,000+</span> users improving their brain health
            </p>
          </div>
          <div className="relative h-[400px]">
            <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-xl overflow-hidden border shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-[url('/brain-illustration.svg')] bg-no-repeat bg-center bg-contain opacity-80"></div>
              
              {/* Inner decorative elements */}
              <div className="absolute top-5 right-5 h-20 w-20 rounded-full bg-gradient-to-br from-[rgba(var(--magic-primary),0.2)] to-[rgba(var(--magic-accent),0.2)] blur-xl"></div>
              <div className="absolute bottom-5 left-5 h-16 w-16 rounded-full bg-gradient-to-tr from-[rgba(var(--magic-secondary),0.2)] to-[rgba(var(--magic-primary),0.2)] blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 