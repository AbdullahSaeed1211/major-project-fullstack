'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Clock, 
  Target,
  ChevronLeft,
} from "lucide-react";

import { MemoryGame } from "@/components/memory-game";

type Tool = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  category: "training" | "assessment" | "tracking" | "education";
  duration: string;
  benefits: string[];
};

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toolsData: Tool[] = [
    {
      id: "memory-game",
      title: "Memory Game",
      description: "Test and improve your memory with this card matching game",
      icon: <Brain className="h-8 w-8 text-primary" />,
      component: <MemoryGame />,
      category: "training",
      duration: "3-5 minutes",
      benefits: ["Improves short-term memory", "Enhances pattern recognition", "Builds visual recall abilities"]
    },
    {
      id: "reaction-test",
      title: "Reaction Time Test",
      description: "Measure how quickly you can respond to visual stimuli",
      icon: <Clock className="h-8 w-8 text-primary" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "training",
      duration: "2 minutes",
      benefits: ["Measures neural processing speed", "Helps track cognitive alertness", "Trains hand-eye coordination"]
    },
    {
      id: "visual-attention",
      title: "Visual Attention Test",
      description: "Test your ability to find specific symbols among distractors",
      icon: <Target className="h-8 w-8 text-primary" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "training",
      duration: "3 minutes",
      benefits: ["Builds selective attention", "Improves visual processing", "Enhances focus abilities"]
    },
  ];

  const filteredTools = activeCategory === "all" 
    ? toolsData 
    : toolsData.filter(tool => tool.category === activeCategory);

  const handleToolSelect = (toolId: string) => {
    setActiveTool(toolId);
  };

  const handleBackToTools = () => {
    setActiveTool(null);
  };

  return (
    <div className="container max-w-7xl py-8">
      {activeTool ? (
        <div className="space-y-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToTools}
            className="mb-4 flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Tools
          </Button>
          
          {toolsData.find(tool => tool.id === activeTool)?.component}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight">Cognitive Tools</h1>
            <p className="text-muted-foreground">
              Our comprehensive suite of tools to assess, train, and track your brain health
            </p>
          </div>
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <div className="flex justify-center">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Tools</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="tracking">Tracking</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Card key={tool.id} className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-md bg-primary/10">
                          {tool.icon}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                          {tool.duration}
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-4">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-1.5">
                        <p className="text-sm font-medium">Benefits:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {tool.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                                <Brain className="h-3 w-3 text-primary" />
                              </div>
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleToolSelect(tool.id)}
                      >
                        Start {tool.title}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
} 