"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Clock, Target, Calculator } from "lucide-react";

export function ToolsShowcase() {
  const tools = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Memory Game",
      description: "Test and train your short-term memory"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Reaction Time Test",
      description: "Measure your response time"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Visual Attention",
      description: "Improve focus and attention"
    },
    {
      icon: <Calculator className="h-8 w-8 text-primary" />,
      title: "Mental Math",
      description: "Enhance cognitive processing"
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-4">
            <span className="mr-2">🧠</span>
            <span>Interactive Tools</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Brain Health Toolkit
          </h2>
          <p className="text-xl text-muted-foreground">
            Scientifically designed exercises to assess and improve your cognitive function.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Link key={index} href="/tools" className="block h-full">
              <Card className="h-full border hover:border-primary/50 transition-all hover:shadow-md">
                <CardHeader>
                  <div className="bg-primary/10 p-3 w-fit rounded-lg mb-2">
                    {tool.icon}
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button size="lg" asChild>
            <Link href="/tools">
              View All Tools
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 