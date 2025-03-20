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
  BarChart, 
  Activity,
  LineChart,
  BookOpen,
  School,
  BookMarked,
  TestTube,
  Stethoscope,
  Microscope,
  Calculator
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
  comingSoon?: boolean;
};

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("featured");

  const toolsData: Tool[] = [
    {
      id: "memory-game",
      title: "Memory Game",
      description: "Test and improve your short-term memory",
      icon: <Brain className="h-8 w-8" />,
      component: <MemoryGame />,
      category: "training",
      duration: "3-5 minutes",
      benefits: ["Improves short-term memory", "Enhances pattern recognition", "Builds visual recall abilities"]
    },
    {
      id: "reaction-test",
      title: "Reaction Time Test",
      description: "Measure your response time",
      icon: <Clock className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "training",
      duration: "2 minutes",
      benefits: ["Measures neural processing speed", "Helps track cognitive alertness", "Trains hand-eye coordination"]
    },
    {
      id: "visual-attention",
      title: "Visual Attention",
      description: "Improve focus and attention",
      icon: <Target className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "training",
      duration: "3 minutes",
      benefits: ["Builds selective attention", "Improves visual processing", "Enhances focus abilities"]
    },
    {
      id: "mental-math",
      title: "Mental Math",
      description: "Enhance cognitive processing",
      icon: <Calculator className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "training",
      duration: "3-5 minutes",
      benefits: ["Improves processing speed", "Enhances working memory", "Strengthens numerical cognition"],
      comingSoon: true
    },
    // Assessment tools
    {
      id: "cognitive-assessment",
      title: "Cognitive Assessment",
      description: "Comprehensive assessment of your cognitive functions across multiple domains",
      icon: <TestTube className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "assessment",
      duration: "10-15 minutes",
      benefits: ["Provides cognitive baseline", "Identifies cognitive strengths", "Tracks changes over time"],
      comingSoon: true
    },
    {
      id: "stroke-risk-calculator",
      title: "Stroke Risk Calculator",
      description: "Personalized assessment of your stroke risk based on health factors",
      icon: <Stethoscope className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "assessment",
      duration: "5 minutes",
      benefits: ["Identifies risk factors", "Provides personalized recommendations", "Facilitates prevention strategies"],
      comingSoon: true
    },
    {
      id: "brain-age-test",
      title: "Brain Age Test",
      description: "Estimate your cognitive age compared to population norms",
      icon: <Microscope className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "assessment",
      duration: "8 minutes",
      benefits: ["Compares performance to age norms", "Tracks cognitive aging", "Motivates cognitive maintenance"],
      comingSoon: true
    },
    // Tracking tools
    {
      id: "cognitive-tracker",
      title: "Cognitive Performance Tracker",
      description: "Monitor your cognitive performance across various domains over time",
      icon: <LineChart className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "tracking",
      duration: "Ongoing",
      benefits: ["Visualizes progress over time", "Identifies cognitive trends", "Provides actionable insights"],
      comingSoon: true
    },
    {
      id: "sleep-tracker",
      title: "Sleep Quality Monitor",
      description: "Track how your sleep patterns affect cognitive performance",
      icon: <Activity className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "tracking",
      duration: "Daily tracking",
      benefits: ["Correlates sleep with cognition", "Identifies optimal sleep patterns", "Improves sleep hygiene"],
      comingSoon: true
    },
    {
      id: "health-metrics",
      title: "Health Metrics Dashboard",
      description: "Track health indicators that affect brain function and cognitive performance",
      icon: <BarChart className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "tracking",
      duration: "Ongoing",
      benefits: ["Holistic health monitoring", "Identifies health-cognition relationships", "Facilitates lifestyle optimization"],
      comingSoon: true
    },
    // Education tools
    {
      id: "brain-health-library",
      title: "Brain Health Library",
      description: "Educational resources about brain health, cognition, and neurological conditions",
      icon: <BookOpen className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "education",
      duration: "Self-paced",
      benefits: ["Evidence-based information", "Easy-to-understand explanations", "Actionable health strategies"],
      comingSoon: true
    },
    {
      id: "neuroscience-courses",
      title: "Neuroscience Mini-Courses",
      description: "Short, interactive courses about the brain and cognitive function",
      icon: <School className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "education",
      duration: "15-30 minutes per course",
      benefits: ["Builds neuroscience literacy", "Interactive learning", "Self-paced modules"],
      comingSoon: true
    },
    {
      id: "research-digest",
      title: "Brain Research Digest",
      description: "Summaries of the latest research in neuroscience and brain health",
      icon: <BookMarked className="h-8 w-8" />,
      component: <div className="p-8 border rounded-lg">Coming soon</div>,
      category: "education",
      duration: "5-10 minutes per article",
      benefits: ["Stays current with research", "Simplified explanations", "Practical applications"],
      comingSoon: true
    }
  ];

  const filteredTools = activeCategory === "all" 
    ? toolsData 
    : activeCategory === "featured"
    ? toolsData.filter(t => !t.comingSoon).slice(0, 4)
    : toolsData.filter(tool => tool.category === activeCategory);

  const handleToolSelect = (toolId: string) => {
    setActiveTool(toolId);
  };

  const handleBackToTools = () => {
    setActiveTool(null);
  };

  // Function to get category title
  const getCategoryTitle = (category: string) => {
    switch(category) {
      case "all": return "All Tools";
      case "featured": return "Featured Tools";
      case "training": return "Training Tools";
      case "assessment": return "Assessment Tools";
      case "tracking": return "Tracking Tools";
      case "education": return "Educational Resources";
      default: return "All Tools";
    }
  };

  return (
    <div className="container max-w-7xl py-12">
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
        <div className="space-y-10">
          <div className="text-center space-y-5 max-w-3xl mx-auto">
            <div className="flex justify-center mb-2">
              <div className="py-1 px-4 rounded-full bg-primary/10 text-primary text-sm font-medium inline-flex items-center gap-2">
                <Brain className="h-4 w-4" /> Interactive Tools
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Brain Health Toolkit</h1>
            <p className="text-muted-foreground text-lg">
              Scientifically designed exercises to assess and improve your cognitive function.
            </p>
            <div className="w-24 h-1 mx-auto mt-2 rounded-full bg-primary/50"></div>
          </div>
          
          <Tabs defaultValue="featured" value={activeCategory} onValueChange={setActiveCategory}>
            <div className="flex justify-center">
              <TabsList className="mb-8">
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="all">All Tools</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="assessment">Assessment</TabsTrigger>
                <TabsTrigger value="tracking">Tracking</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="featured" className="mt-0">
              <div className="mb-12 max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-primary">{getCategoryTitle("featured")}</h2>
                  <div className="w-32 h-px bg-primary/30 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {toolsData.filter(t => !t.comingSoon).slice(0, 4).map((tool) => (
                    <div 
                      key={tool.id} 
                      className="group cursor-pointer bg-card rounded-xl p-5 border border-border transition-all hover:shadow-md hover:border-primary/20 flex flex-col h-full"
                      onClick={() => handleToolSelect(tool.id)}
                    >
                      <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                        <div className="text-primary">{tool.icon}</div>
                      </div>
                      <h3 className="font-medium text-lg mb-1.5 group-hover:text-primary transition-colors">{tool.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3 flex-grow">{tool.description}</p>
                      <div className="mt-auto text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full w-fit">
                        {tool.duration}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-10">
                  <Button 
                    onClick={() => setActiveCategory("all")}
                    variant="outline"
                    className="px-6"
                  >
                    View All Tools
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="mt-0">
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-semibold text-primary">{getCategoryTitle("all")}</h2>
                <div className="ml-4 flex-grow h-px bg-primary/30 rounded-full max-w-[200px]"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Card 
                    key={tool.id} 
                    className={`overflow-hidden transition-all hover:shadow-sm ${
                      tool.comingSoon 
                        ? 'border-dashed border-muted-foreground/30' 
                        : 'border'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="bg-primary/10 text-primary p-3 rounded-md">
                          {tool.icon}
                        </div>
                        <div className="flex items-center gap-2">
                          {tool.comingSoon && (
                            <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
                              Under Development
                            </span>
                          )}
                          <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                            {tool.duration}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-4">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-1.5">
                        <p className="text-sm font-medium text-primary">Benefits:</p>
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
                        variant={tool.comingSoon ? "outline" : "default"}
                        disabled={tool.comingSoon}
                      >
                        {tool.comingSoon ? "Coming Soon" : `Start ${tool.title}`}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="training" className="mt-0">
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-semibold text-primary">{getCategoryTitle("training")}</h2>
                <div className="ml-4 flex-grow h-px bg-primary/30 rounded-full max-w-[200px]"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Card 
                    key={tool.id} 
                    className={`overflow-hidden transition-all hover:shadow-sm ${
                      tool.comingSoon 
                        ? 'border-dashed border-muted-foreground/30' 
                        : 'border'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="bg-primary/10 text-primary p-3 rounded-md">
                          {tool.icon}
                        </div>
                        <div className="flex items-center gap-2">
                          {tool.comingSoon && (
                            <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
                              Under Development
                            </span>
                          )}
                          <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                            {tool.duration}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-4">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-1.5">
                        <p className="text-sm font-medium text-primary">Benefits:</p>
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
                        variant={tool.comingSoon ? "outline" : "default"}
                        disabled={tool.comingSoon}
                      >
                        {tool.comingSoon ? "Coming Soon" : `Start ${tool.title}`}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="assessment" className="mt-0">
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-semibold text-primary">{getCategoryTitle("assessment")}</h2>
                <div className="ml-4 flex-grow h-px bg-primary/30 rounded-full max-w-[200px]"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Card 
                    key={tool.id} 
                    className={`overflow-hidden transition-all hover:shadow-sm ${
                      tool.comingSoon 
                        ? 'border-dashed border-muted-foreground/30' 
                        : 'border'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="bg-primary/10 text-primary p-3 rounded-md">
                          {tool.icon}
                        </div>
                        <div className="flex items-center gap-2">
                          {tool.comingSoon && (
                            <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
                              Under Development
                            </span>
                          )}
                          <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                            {tool.duration}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-4">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-1.5">
                        <p className="text-sm font-medium text-primary">Benefits:</p>
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
                        variant={tool.comingSoon ? "outline" : "default"}
                        disabled={tool.comingSoon}
                      >
                        {tool.comingSoon ? "Coming Soon" : `Start ${tool.title}`}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tracking" className="mt-0">
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-semibold text-primary">{getCategoryTitle("tracking")}</h2>
                <div className="ml-4 flex-grow h-px bg-primary/30 rounded-full max-w-[200px]"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Card 
                    key={tool.id} 
                    className={`overflow-hidden transition-all hover:shadow-sm ${
                      tool.comingSoon 
                        ? 'border-dashed border-muted-foreground/30' 
                        : 'border'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="bg-primary/10 text-primary p-3 rounded-md">
                          {tool.icon}
                        </div>
                        <div className="flex items-center gap-2">
                          {tool.comingSoon && (
                            <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
                              Under Development
                            </span>
                          )}
                          <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                            {tool.duration}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-4">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-1.5">
                        <p className="text-sm font-medium text-primary">Benefits:</p>
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
                        variant={tool.comingSoon ? "outline" : "default"}
                        disabled={tool.comingSoon}
                      >
                        {tool.comingSoon ? "Coming Soon" : `Start ${tool.title}`}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="mt-0">
              <div className="flex items-center mb-8">
                <h2 className="text-2xl font-semibold text-primary">{getCategoryTitle("education")}</h2>
                <div className="ml-4 flex-grow h-px bg-primary/30 rounded-full max-w-[200px]"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <Card 
                    key={tool.id} 
                    className={`overflow-hidden transition-all hover:shadow-sm ${
                      tool.comingSoon 
                        ? 'border-dashed border-muted-foreground/30' 
                        : 'border'
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="bg-primary/10 text-primary p-3 rounded-md">
                          {tool.icon}
                        </div>
                        <div className="flex items-center gap-2">
                          {tool.comingSoon && (
                            <span className="text-xs font-medium text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">
                              Under Development
                            </span>
                          )}
                        <div className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                          {tool.duration}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-4">{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-1.5">
                        <p className="text-sm font-medium text-primary">Benefits:</p>
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
                        variant={tool.comingSoon ? "outline" : "default"}
                        disabled={tool.comingSoon}
                      >
                        {tool.comingSoon ? "Coming Soon" : `Start ${tool.title}`}
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