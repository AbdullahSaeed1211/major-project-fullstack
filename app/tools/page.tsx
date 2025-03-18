"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Clock, 
  FileText, 
  Calculator, 
  Grid, 
  ChevronLeft, 
  Target,
  CalculatorIcon,
  Shuffle 
} from "lucide-react";

import { MemoryGame } from "@/components/memory-game";
import { ReactionTest } from "@/components/reaction-test";
import { BrainHealthSurvey } from "@/components/brain-health-survey";
import { StrokeArticles } from "@/components/stroke-articles";
import { StrokeRiskCalculator } from "@/components/stroke-risk-calculator";
import { VisualAttentionTest } from "@/components/visual-attention-test";
import { MentalMathChallenge } from "@/components/mental-math-challenge";

type Tool = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
};

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const toolsData: Tool[] = [
    {
      id: "memory-game",
      title: "Memory Game",
      description: "Test and improve your memory with this card matching game",
      icon: <Brain className="h-8 w-8 text-primary" />,
      component: <MemoryGame />
    },
    {
      id: "reaction-test",
      title: "Reaction Time Test",
      description: "Measure how quickly you can respond to visual stimuli",
      icon: <Clock className="h-8 w-8 text-primary" />,
      component: <ReactionTest />
    },
    {
      id: "visual-attention",
      title: "Visual Attention Test",
      description: "Test your ability to find specific symbols among distractors",
      icon: <Target className="h-8 w-8 text-primary" />,
      component: <VisualAttentionTest />
    },
    {
      id: "mental-math",
      title: "Mental Math Challenge",
      description: "Improve your cognitive processing with arithmetic exercises",
      icon: <CalculatorIcon className="h-8 w-8 text-primary" />,
      component: <MentalMathChallenge />
    },
    {
      id: "word-scramble",
      title: "Word Scramble",
      description: "Test your vocabulary and language processing skills",
      icon: <Shuffle className="h-8 w-8 text-primary" />,
      component: <div className="p-4 border rounded-md text-center">
        <h3 className="text-lg font-medium mb-2">Coming Soon!</h3>
        <p>We&apos;re putting the finishing touches on this brain-boosting game!</p>
      </div>
    },
    {
      id: "brain-health-survey",
      title: "Brain Health Survey",
      description: "Assess your brain health habits and get personalized recommendations",
      icon: <FileText className="h-8 w-8 text-primary" />,
      component: <BrainHealthSurvey />
    },
    {
      id: "stroke-articles",
      title: "Stroke Education",
      description: "Learn about stroke prevention, signs, and treatment",
      icon: <FileText className="h-8 w-8 text-primary" />,
      component: <StrokeArticles />
    },
    {
      id: "stroke-risk-calculator",
      title: "Stroke Risk Calculator",
      description: "Calculate your personal stroke risk based on health factors",
      icon: <Calculator className="h-8 w-8 text-primary" />,
      component: <StrokeRiskCalculator />
    }
  ];

  const handleToolSelect = (toolId: string) => {
    setActiveTool(toolId);
    // Scroll to top when a tool is selected
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToTools = () => {
    setActiveTool(null);
    // Scroll to top when returning to tools grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Find the active tool object
  const activeToolObj = toolsData.find(tool => tool.id === activeTool);

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {activeTool ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackToTools} 
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Tools
            </Button>
            <h1 className="text-2xl font-bold">{activeToolObj?.title}</h1>
          </div>
          
          {activeToolObj?.component}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Brain Health Toolkit</h1>
            <p className="text-muted-foreground">
              Explore our collection of tools designed to help monitor, assess, and improve your brain health.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolsData.map((tool) => (
              <Card key={tool.id} className="flex flex-col overflow-hidden border transition-all hover:shadow-md">
                <CardHeader className="p-6 pb-3 flex flex-row items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    {tool.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <div className="px-6 py-3 flex-1">
                  <p className="text-muted-foreground">{tool.description}</p>
                </div>
                <CardFooter className="p-6 pt-3">
                  <Button 
                    className="w-full" 
                    onClick={() => handleToolSelect(tool.id)}
                  >
                    Launch Tool
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-muted p-6 rounded-lg max-w-3xl mx-auto mt-12">
            <div className="flex items-start gap-4">
              <Grid className="h-10 w-10 text-primary mt-1" />
              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Why Use These Tools?</h2>
                <p className="text-muted-foreground">
                  Regular brain exercises and health monitoring can help maintain cognitive function 
                  and potentially reduce your risk of stroke and other neurological conditions.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Improve memory and cognitive processing speed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Monitor your brain health and track progress over time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Learn about stroke risk factors and prevention strategies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    <span>Get personalized recommendations for improving brain health</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 