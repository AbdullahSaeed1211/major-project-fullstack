"use client";

import { useState, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer 
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartLegend, 
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartConfig
} from "@/components/ui/chart";
import { Brain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface BrainScore {
  date: string;
  score: number;
  change: number;
}

interface CognitiveData {
  domain: string;
  score: number;
  previousScore: number;
}

interface ActivityData {
  month: string;
  memory: number;
  meditation: number;
  assessment: number;
  mood: number;
}

export function BrainHealthVisualization() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  
  const brainScoreHistory: BrainScore[] = [
    { date: "Jan 1", score: 72, change: 0 },
    { date: "Jan 15", score: 74, change: 2 },
    { date: "Feb 1", score: 73, change: -1 },
    { date: "Feb 15", score: 76, change: 3 },
    { date: "Mar 1", score: 78, change: 2 },
    { date: "Mar 15", score: 77, change: -1 },
    { date: "Apr 1", score: 80, change: 3 },
    { date: "Apr 15", score: 82, change: 2 },
    { date: "May 1", score: 85, change: 3 }
  ];
  
  const cognitiveData: CognitiveData[] = [
    { domain: "Memory", score: 82, previousScore: 78 },
    { domain: "Attention", score: 76, previousScore: 72 },
    { domain: "Processing", score: 88, previousScore: 85 },
    { domain: "Executive", score: 79, previousScore: 75 },
    { domain: "Language", score: 90, previousScore: 88 }
  ];
  
  const activityData: ActivityData[] = [
    { month: "Jan", memory: 15, meditation: 22, assessment: 2, mood: 18 },
    { month: "Feb", memory: 18, meditation: 20, assessment: 1, mood: 20 },
    { month: "Mar", memory: 20, meditation: 25, assessment: 3, mood: 22 },
    { month: "Apr", memory: 22, meditation: 28, assessment: 2, mood: 25 },
    { month: "May", memory: 25, meditation: 30, assessment: 2, mood: 28 }
  ];
  
  const brainScoreConfig: ChartConfig = {
    score: {
      label: "Brain Score",
      color: "hsl(var(--chart-1))",
    }
  };
  
  const activityConfig: ChartConfig = {
    memory: {
      label: "Memory Game",
      color: "hsl(var(--chart-1))",
    },
    meditation: {
      label: "Meditation",
      color: "hsl(var(--chart-2))",
    },
    assessment: {
      label: "Assessment",
      color: "hsl(var(--chart-3))",
    },
    mood: {
      label: "Mood Tracking",
      color: "hsl(var(--chart-4))",
    }
  };
  
  const cognitiveColorData = [
    { name: "Memory", color: "hsl(var(--chart-1))" },
    { name: "Attention", color: "hsl(var(--chart-2))" },
    { name: "Processing", color: "hsl(var(--chart-3))" },
    { name: "Executive", color: "hsl(var(--chart-4))" },
    { name: "Language", color: "hsl(var(--chart-5))" }
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate the percentage change in cognitive domains
  const getDomainChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Brain Health Analytics
        </CardTitle>
        <CardDescription>
          Visualize your brain health trends and cognitive performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="overview">Overall Score</TabsTrigger>
            <TabsTrigger value="cognitive">Cognitive Profile</TabsTrigger>
            <TabsTrigger value="activity">Activity Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-[300px] w-full" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">85</div>
                    <div className="text-xs text-muted-foreground">Current Brain Health Score</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">+13 points</div>
                    <div className="text-xs text-muted-foreground">Since you started</div>
                  </div>
                </div>
                
                <div className="h-[300px] mt-4">
                  <ChartContainer config={brainScoreConfig} className="h-full">
                    <LineChart data={brainScoreHistory}>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickLine={false} 
                        axisLine={false} 
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        domain={[60, 100]} 
                        tickLine={false} 
                        axisLine={false} 
                        tick={{ fontSize: 12 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="var(--color-score)" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </LineChart>
                  </ChartContainer>
                </div>
                
                <div className="text-xs text-center text-muted-foreground mt-2">
                  Brain health score is calculated based on your activity completion, cognitive performance, and consistency.
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="cognitive" className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-7 w-48" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-[300px] w-full" />
                  <Skeleton className="h-[300px] w-full" />
                </div>
              </div>
            ) : (
              <>
                <div className="text-sm font-medium">Cognitive Domain Performance</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cognitiveData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="score"
                          nameKey="domain"
                          label={({ name, value }) => `${name}: ${value}`}
                          labelLine={false}
                        >
                          {cognitiveData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={cognitiveColorData[index % cognitiveColorData.length].color}
                            />
                          ))}
                        </Pie>
                        <RechartsTooltip 
                          formatter={(value: number, name: string) => [`Score: ${value}`, name]}
                        />
                        <RechartsLegend 
                          layout="vertical" 
                          verticalAlign="middle" 
                          align="right"
                          wrapperStyle={{ fontSize: '12px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div>
                    <div className="font-medium text-sm mb-4">Domain Improvements</div>
                    <div className="space-y-4">
                      {cognitiveData.map((domain, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-medium">{domain.domain}</span>
                            <span className={`text-xs ${Number(getDomainChange(domain.score, domain.previousScore)) > 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {Number(getDomainChange(domain.score, domain.previousScore)) > 0 ? '+' : ''}
                              {getDomainChange(domain.score, domain.previousScore)}%
                            </span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full"
                              style={{ 
                                width: `${domain.score}%`, 
                                backgroundColor: cognitiveColorData[index % cognitiveColorData.length].color 
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Previous: {domain.previousScore}</span>
                            <span>Current: {domain.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-[300px] w-full" />
              </div>
            ) : (
              <>
                <div className="text-sm font-medium">Monthly Activity Sessions</div>
                
                <div className="h-[300px]">
                  <ChartContainer config={activityConfig} className="h-full">
                    <BarChart 
                      data={activityData}
                      barGap={4}
                      barCategoryGap={16}
                    >
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tickLine={false} 
                        axisLine={false}
                      />
                      <YAxis 
                        tickLine={false} 
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                      />
                      <Bar 
                        dataKey="memory" 
                        fill="var(--color-memory)" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <Bar 
                        dataKey="meditation" 
                        fill="var(--color-meditation)" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <Bar 
                        dataKey="assessment" 
                        fill="var(--color-assessment)" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <Bar 
                        dataKey="mood" 
                        fill="var(--color-mood)" 
                        radius={[4, 4, 0, 0]} 
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                    </BarChart>
                  </ChartContainer>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <div>Total activity sessions this month: <span className="font-medium">85</span></div>
                  <div>Increase from last month: <span className="font-medium text-green-500">+12%</span></div>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
} 