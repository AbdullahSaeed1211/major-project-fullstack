import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityHistory } from "@/components/activity-history";
import { CognitiveScoreCard } from "@/components/cognitive-score-card";
import { Brain, Activity, FileText, Zap, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brain Health Dashboard | Brainwise",
  description: "Track your brain health metrics, view cognitive scores, and get personalized training recommendations.",
  robots: {
    index: false,  // Don't index the dashboard as it contains personal data
    follow: true
  }
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Track your brain health, view your progress, and manage your cognitive training.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activities">Activities</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Overall Brain Health</CardTitle>
                    <Brain className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">85%</div>
                    <p className="text-xs text-muted-foreground">
                      +2% from last assessment
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Weekly Activity</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6 sessions</div>
                    <p className="text-xs text-muted-foreground">
                      3 hours total training
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Next Assessment</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3 days</div>
                    <p className="text-xs text-muted-foreground">
                      Comprehensive analysis
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <ActivityHistory />
                <CognitiveScoreCard />
              </div>
            </TabsContent>
            
            <TabsContent value="activities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Plan</CardTitle>
                  <CardDescription>
                    Your personalized cognitive training schedule
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="font-medium">Memory Training</div>
                      <div className="text-sm text-muted-foreground">Today</div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="font-medium">Attention Exercises</div>
                      <div className="text-sm text-muted-foreground">Tomorrow</div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="font-medium">Processing Speed</div>
                      <div className="text-sm text-muted-foreground">In 2 days</div>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <div className="font-medium">Executive Function</div>
                      <div className="text-sm text-muted-foreground">In 3 days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Games</CardTitle>
                  <CardDescription>
                    Games selected to match your training needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Link href="/cognitive-games?tab=memory" className="block">
                      <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="h-5 w-5 text-primary" />
                          <span className="font-medium">Memory Cards</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Test and improve your short-term memory
                        </p>
                      </div>
                    </Link>
                    
                    <Link href="/cognitive-games?tab=concentration" className="block">
                      <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Zap className="h-5 w-5 text-primary" />
                          <span className="font-medium">Concentration</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Strengthen your focus and attention span
                        </p>
                      </div>
                    </Link>
                    
                    <Link href="/cognitive-games?tab=reaction" className="block">
                      <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <span className="font-medium">Reaction Time</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Improve your processing speed and reaction time
                        </p>
                      </div>
                    </Link>
                    
                    <Link href="/cognitive-games" className="block">
                      <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="h-5 w-5 text-primary" />
                          <span className="font-medium">View All Games</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Explore all available cognitive games
                        </p>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Brain Health Recommendations</CardTitle>
                  <CardDescription>
                    Personalized suggestions to improve your cognitive health
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-medium mb-1">Increase memory training frequency</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Based on your recent assessment, more frequent memory exercises would be beneficial.
                      </p>
                      <div className="text-sm">
                        <Button variant="outline" size="sm">Schedule Training</Button>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-medium mb-1">Try the new concentration exercises</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your attention scores could benefit from our focused concentration activities.
                      </p>
                      <div className="text-sm">
                        <Button variant="outline" size="sm">View Exercises</Button>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-muted p-4">
                      <h3 className="font-medium mb-1">Complete your cognitive assessment</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        It&apos;s been 30 days since your last full assessment. A new one is recommended.
                      </p>
                      <div className="text-sm">
                        <Button variant="outline" size="sm">Start Assessment</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Start your brain training</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/cognitive-games">
                <Button className="w-full justify-start" variant="outline">
                  <Brain className="mr-2 h-4 w-4" />
                  Play Cognitive Games
                </Button>
              </Link>
              
              <Link href="/stroke-prediction">
                <Button className="w-full justify-start" variant="outline">
                  <Activity className="mr-2 h-4 w-4" />
                  Stroke Risk Assessment
                </Button>
              </Link>
              
              <Link href="/chatbot">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Ask Brain Health Questions
                </Button>
              </Link>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-3">Daily Tips</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Regular physical exercise increases cerebral blood flow.</p>
                  <p>Maintaining social connections helps preserve cognitive function.</p>
                  <p>Sleep is essential for memory consolidation and brain health.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 