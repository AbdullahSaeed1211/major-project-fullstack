import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityHistory } from "@/components/activity-history";
import { CognitiveScoreCard } from "@/components/cognitive-score-card";
import { DailyChallenge } from "@/components/daily-challenge";
import { Brain, Activity, FileText, Zap, Target, Info } from "lucide-react";
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
  // This would typically come from a hook or server component
  const hasActivityData = false;
  const hasAssessmentData = false;
  const hasCognitiveScores = false;

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
                {hasAssessmentData ? (
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
                ) : (
                  <Card className="col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Overall Brain Health</CardTitle>
                      <Brain className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-sm text-muted-foreground">
                        No assessment data yet
                      </div>
                      <Link href="/tools" className="text-xs text-primary hover:underline inline-block mt-1">
                        Take your first assessment
                      </Link>
                    </CardContent>
                  </Card>
                )}
                
                {hasActivityData ? (
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
                ) : (
                  <Card className="col-span-1">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Weekly Activity</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="text-sm text-muted-foreground">
                        No activity recorded yet
                      </div>
                      <Link href="/tools" className="text-xs text-primary hover:underline inline-block mt-1">
                        Try a cognitive game
                      </Link>
                    </CardContent>
                  </Card>
                )}
                
                <Card className="col-span-1">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Daily Challenge</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="text-sm">
                      Check your daily brain exercise
                    </div>
                    <Link href="#daily-challenge" className="text-xs text-primary hover:underline inline-block mt-1">
                      View today&apos;s challenge
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {hasActivityData ? (
                  <ActivityHistory />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Activity History</CardTitle>
                      <CardDescription>Track your brain training activities</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex flex-col items-center justify-center py-8">
                      <div className="text-center space-y-2 max-w-xs">
                        <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium">No activity history yet</h3>
                        <p className="text-sm text-muted-foreground">
                          Complete cognitive exercises to build your activity history and track your progress
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="pb-6 flex justify-center">
                      <Link href="/tools">
                        <Button>Start Training</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )}
                {hasCognitiveScores ? (
                  <CognitiveScoreCard />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Cognitive Scores</CardTitle>
                      <CardDescription>Track your performance across cognitive domains</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex flex-col items-center justify-center py-8">
                      <div className="text-center space-y-2 max-w-xs">
                        <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium">No cognitive scores yet</h3>
                        <p className="text-sm text-muted-foreground">
                          Complete assessments to generate your cognitive domain profile and track improvements
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="pb-6 flex justify-center">
                      <Link href="/tools">
                        <Button>Take Assessment</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="activities" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Plan</CardTitle>
                  <CardDescription>
                    Recommended activities to improve your cognitive health
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hasActivityData ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Memory Training</h3>
                          <p className="text-sm text-muted-foreground">Improve your recall and memory formation</p>
                        </div>
                        <Link href="/tools/memory-game">
                          <Button variant="outline" size="sm">Start</Button>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Attention Exercise</h3>
                          <p className="text-sm text-muted-foreground">Enhance focus and sustained attention</p>
                        </div>
                        <Link href="/tools/visual-attention">
                          <Button variant="outline" size="sm">Start</Button>
                        </Link>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Processing Speed</h3>
                          <p className="text-sm text-muted-foreground">Increase your mental processing velocity</p>
                        </div>
                        <Link href="/tools/reaction-test">
                          <Button variant="outline" size="sm">Start</Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <Info className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <h3 className="text-lg font-medium">Complete your first assessment</h3>
                        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                          To receive personalized training recommendations, complete at least one cognitive assessment
                        </p>
                      </div>
                      <Link href="/tools">
                        <Button>Explore Tools</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                  <CardDescription>
                    Based on your cognitive profile and activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hasAssessmentData ? (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Brain Health Tips</h3>
                        <ul className="space-y-2 list-disc list-inside text-sm">
                          <li>Consider regular aerobic exercise to boost blood flow to your brain</li>
                          <li>Practice mindfulness meditation to improve attention and focus</li>
                          <li>Ensure adequate sleep (7-9 hours) for optimal cognitive performance</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Focus Areas</h3>
                        <p className="text-sm">Based on your assessments, we recommend focusing on:</p>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="bg-muted rounded-md p-3">
                            <h4 className="font-medium">Memory</h4>
                            <p className="text-xs text-muted-foreground mt-1">Your recent scores indicate opportunity for improvement</p>
                          </div>
                          <div className="bg-muted rounded-md p-3">
                            <h4 className="font-medium">Processing Speed</h4>
                            <p className="text-xs text-muted-foreground mt-1">Regular practice can help boost your mental quickness</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <Brain className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <h3 className="text-lg font-medium">No recommendations yet</h3>
                        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                          Complete cognitive assessments to receive personalized recommendations for improving brain health
                        </p>
                      </div>
                      <Link href="/tools">
                        <Button>Take Assessment</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="col-span-2 lg:col-span-1">
          <div className="grid gap-6">
            <div id="daily-challenge">
              <DailyChallenge />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/tools">
                  <Button className="w-full justify-start" variant="default">
                    <Zap className="mr-2 h-4 w-4" />
                    Play Cognitive Games
                  </Button>
                </Link>
                
                <Link href="/stroke-prediction">
                  <Button className="w-full justify-start" variant="outline">
                    <Activity className="mr-2 h-4 w-4" />
                    Stroke Risk Assessment
                  </Button>
                </Link>
                
                <Link href="/assessment-report">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Assessment Report
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
      
      <div className="mt-12 text-center">
        <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
          <span className="font-medium">Disclaimer:</span> All cognitive tools, assessments, and scores are designed for recreational use and self-improvement. 
          They are not medical diagnoses or professional evaluations. Always consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
} 