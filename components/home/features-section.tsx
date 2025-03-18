"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Calculator, FileText, ArrowRight } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "Interactive Brain Tools",
      description: "Challenge and strengthen your cognitive abilities through games and exercises",
      link: "/tools",
      linkText: "Try Our Tools"
    },
    {
      icon: <Calculator className="h-10 w-10 text-primary" />,
      title: "Comprehensive Assessment",
      description: "Understand your brain health and risk factors with personalized evaluation",
      link: "/stroke-prediction",
      linkText: "Get Your Assessment"
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Educational Resources",
      description: "Evidence-based articles and guides for maintaining optimal brain health",
      link: "/tools?tool=stroke-articles",
      linkText: "Learn More"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-muted/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Comprehensive Brain Health Platform
          </h2>
          <p className="text-xl text-muted-foreground">
            Our integrated tools help you assess cognitive function, train your brain,
            and stay informed about the latest in brain health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="h-full flex flex-col">
              <CardHeader>
                <div className="bg-primary/10 p-4 w-fit rounded-lg mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={feature.link}>
                    {feature.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 