import React from "react";
import { Metadata } from "next";
import { 
  LineChart, 
  BarChart3, 
  Calendar, 
  Target,
  PlusCircle,
  Info
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Progress Tracker | Brainwise",
  description: "Track your cognitive performance over time with detailed insights and performance metrics.",
  keywords: "cognitive tracking, brain health progress, performance metrics, cognitive testing results",
};

export default function ProgressTrackerPage() {
  return (
    <div className="container py-8 px-4 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Progress Tracker
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-3xl">
            Track your cognitive performance over time, identify trends, and monitor improvement across different cognitive domains.
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Time Range:</span>
            <Select defaultValue="3m">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="1m">Last month</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="sm">
            Export Data
          </Button>
        </div>

        {/* Show placeholder state when no data is available */}
        <Card className="bg-muted/30 py-8">
          <CardContent className="text-center space-y-4 pb-2">
            <Info className="h-12 w-12 mx-auto text-muted-foreground opacity-70" />
            <h3 className="text-xl font-medium">No Activity Data Yet</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Complete cognitive assessments and brain training exercises to start tracking your progress.
            </p>
            <Button asChild className="mt-4">
              <Link href="/tools">
                Start Brain Training
              </Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Memory Performance</CardDescription>
              <div className="flex justify-between items-end">
                <CardTitle className="text-2xl">-<span className="text-base text-muted-foreground">/100</span></CardTitle>
                <Badge variant="outline" className="text-xs">No data</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-center items-center h-16 w-full bg-muted/40 rounded-md">
                <PlusCircle className="h-6 w-6 text-muted-foreground/40" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Attention Score</CardDescription>
              <div className="flex justify-between items-end">
                <CardTitle className="text-2xl">-<span className="text-base text-muted-foreground">/100</span></CardTitle>
                <Badge variant="outline" className="text-xs">No data</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-center items-center h-16 w-full bg-muted/40 rounded-md">
                <PlusCircle className="h-6 w-6 text-muted-foreground/40" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Processing Speed</CardDescription>
              <div className="flex justify-between items-end">
                <CardTitle className="text-2xl">-<span className="text-base text-muted-foreground">/100</span></CardTitle>
                <Badge variant="outline" className="text-xs">No data</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-center items-center h-16 w-full bg-muted/40 rounded-md">
                <PlusCircle className="h-6 w-6 text-muted-foreground/40" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Executive Function</CardDescription>
              <div className="flex justify-between items-end">
                <CardTitle className="text-2xl">-<span className="text-base text-muted-foreground">/100</span></CardTitle>
                <Badge variant="outline" className="text-xs">No data</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex justify-center items-center h-16 w-full bg-muted/40 rounded-md">
                <PlusCircle className="h-6 w-6 text-muted-foreground/40" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overall" className="w-full">
          <div className="flex justify-center overflow-x-auto pb-2 scrollbar-hide">
            <TabsList className="mb-8">
              <TabsTrigger value="overall" className="text-sm sm:text-base px-3 sm:px-4">
                <LineChart className="h-4 w-4 mr-1.5" />
                <span>Overall Trends</span>
              </TabsTrigger>
              <TabsTrigger value="by-test" className="text-sm sm:text-base px-3 sm:px-4">
                <BarChart3 className="h-4 w-4 mr-1.5" />
                <span>By Test Type</span>
              </TabsTrigger>
              <TabsTrigger value="calendar" className="text-sm sm:text-base px-3 sm:px-4">
                <Calendar className="h-4 w-4 mr-1.5" />
                <span>Activity Calendar</span>
              </TabsTrigger>
              <TabsTrigger value="goals" className="text-sm sm:text-base px-3 sm:px-4">
                <Target className="h-4 w-4 mr-1.5" />
                <span>Goals & Milestones</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overall Trends Tab */}
          <TabsContent value="overall" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cognitive Performance Over Time</CardTitle>
                <CardDescription>Track your progress across all cognitive domains</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-muted/30 rounded-md flex items-center justify-center border">
                  <div className="text-center space-y-2">
                    <LineChart className="h-12 w-12 mx-auto text-muted-foreground opacity-70" />
                    <p className="text-muted-foreground">Complete assessments to see your performance trends here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                  <CardDescription>Compare your results to baseline</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground opacity-70" />
                    <h3 className="text-lg font-medium mt-4 mb-2">No Data Available Yet</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Complete at least one assessment in each cognitive domain to see your performance summary.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest cognitive assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground opacity-70" />
                    <h3 className="text-lg font-medium mt-4 mb-2">No Recent Activity</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Complete cognitive assessments to track your recent activity.
                    </p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link href="/tools">
                        Go to Assessments
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* By Test Type Tab */}
          <TabsContent value="by-test" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance by Test Type</CardTitle>
                <CardDescription>Detailed breakdown of each cognitive test</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-muted/30 rounded-md flex items-center justify-center border">
                  <div className="text-center space-y-2">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground opacity-70" />
                    <p className="text-muted-foreground">Complete multiple tests to see test-specific performance charts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="text-center pt-4">
              <Button size="lg" className="micro-bounce" asChild>
                <Link href="/tools">
                  Take Tests to See Your Scores
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* Activity Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Calendar</CardTitle>
                <CardDescription>View your activity patterns over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full bg-muted/30 rounded-md flex items-center justify-center border">
                  <div className="text-center space-y-2">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground opacity-70" />
                    <p className="text-muted-foreground">Complete regular assessments to see your activity patterns</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Current Streak</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-end">
                    <span className="text-3xl font-bold">0</span>
                    <span className="text-sm text-muted-foreground">days</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Start your streak by completing daily activities</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Best Streak</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-end">
                    <span className="text-3xl font-bold">0</span>
                    <span className="text-sm text-muted-foreground">days</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Build consistent usage habits to increase your streak</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Total Activity</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-end">
                    <span className="text-3xl font-bold">0</span>
                    <span className="text-sm text-muted-foreground">sessions</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Complete assessments to increase your total</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals & Milestones Tab */}
          <TabsContent value="goals" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Goals & Milestones</CardTitle>
                <CardDescription>Track your progress toward cognitive goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground opacity-70" />
                  <h3 className="text-lg font-medium mt-4 mb-2">No Goals Set</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                    Set cognitive improvement goals to track your progress and stay motivated.
                  </p>
                  <Button>Create Your First Goal</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mx-auto max-w-5xl mt-12 text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          View more data about your brain health and related health metrics to gain a complete picture of your progress.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/brain-health">
              Brain Health Library
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/health-metrics">
              Health Metrics
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/tools/stroke-prediction">
              Stroke Risk Assessment
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 