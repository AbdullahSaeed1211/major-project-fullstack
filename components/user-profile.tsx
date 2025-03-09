"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  user?: {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: "user" | "doctor" | "admin";
    createdAt: Date;
  };
}

interface HealthMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  date: Date;
  status: "normal" | "warning" | "critical";
}

interface Assessment {
  id: string;
  type: "stroke" | "tumor" | "alzheimers";
  result: string;
  date: Date;
  risk: "low" | "moderate" | "high";
}

export function UserProfile({ user }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock data - in a real app, this would come from an API
  const mockUser = user || {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    image: "https://ui.shadcn.com/avatars/01.png",
    role: "user",
    createdAt: new Date("2023-01-01"),
  } as const;
  
  const healthMetrics: HealthMetric[] = [
    {
      id: "1",
      name: "Blood Pressure",
      value: 120,
      unit: "mmHg",
      date: new Date("2023-03-15"),
      status: "normal",
    },
    {
      id: "2",
      name: "Heart Rate",
      value: 72,
      unit: "bpm",
      date: new Date("2023-03-15"),
      status: "normal",
    },
    {
      id: "3",
      name: "Glucose",
      value: 110,
      unit: "mg/dL",
      date: new Date("2023-03-10"),
      status: "warning",
    },
    {
      id: "4",
      name: "BMI",
      value: 24.5,
      unit: "kg/m²",
      date: new Date("2023-02-28"),
      status: "normal",
    },
    {
      id: "5",
      name: "Cholesterol",
      value: 210,
      unit: "mg/dL",
      date: new Date("2023-02-15"),
      status: "warning",
    },
  ];
  
  const assessments: Assessment[] = [
    {
      id: "1",
      type: "stroke",
      result: "Low risk of stroke (15%)",
      date: new Date("2023-03-10"),
      risk: "low",
    },
    {
      id: "2",
      type: "alzheimers",
      result: "No signs of Alzheimer's detected",
      date: new Date("2023-02-20"),
      risk: "low",
    },
    {
      id: "3",
      type: "tumor",
      result: "No tumor detected",
      date: new Date("2023-01-15"),
      risk: "low",
    },
  ];
  
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              {mockUser.image ? (
                <Image
                  src={mockUser.image}
                  alt={mockUser.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-4xl font-semibold uppercase text-muted-foreground">
                  {mockUser.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold">{mockUser.name}</h2>
              <p className="text-muted-foreground">{mockUser.email}</p>
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Member since {mockUser.createdAt.toLocaleDateString()}
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {mockUser.role === "user" ? "Patient" : mockUser.role}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
              <Button size="sm">Contact Doctor</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="metrics">Health Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Brain Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85/100</div>
                <div className="mt-1 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-green-500"
                  >
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  <span className="ml-1 text-xs text-muted-foreground">
                    +5 from last assessment
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stroke Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Low</div>
                <p className="text-xs text-muted-foreground">
                  Based on your latest assessment
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  Completed in the last 90 days
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Next Checkup</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 Days</div>
                <p className="text-xs text-muted-foreground">
                  Recommended follow-up
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Assessments</CardTitle>
                <CardDescription>
                  Your most recent brain health assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessments.slice(0, 3).map((assessment) => (
                    <div key={assessment.id} className="flex items-center gap-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full",
                          assessment.risk === "low" ? "bg-green-100 text-green-700" : 
                          assessment.risk === "moderate" ? "bg-yellow-100 text-yellow-700" : 
                          "bg-red-100 text-red-700"
                        )}
                      >
                        {assessment.type === "stroke" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                          </svg>
                        ) : assessment.type === "tumor" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <path d="M12 17h.01" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 12h8" />
                            <path d="M12 8v8" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)} Assessment
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {assessment.result}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {assessment.date.toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="#assessments" onClick={() => setActiveTab("assessments")}>
                    View All Assessments
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>
                  Your most recent health measurements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthMetrics.slice(0, 3).map((metric) => (
                    <div key={metric.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{metric.name}</p>
                        <p
                          className={cn(
                            "text-sm font-medium",
                            metric.status === "normal" ? "text-green-600" : 
                            metric.status === "warning" ? "text-yellow-600" : 
                            "text-red-600"
                          )}
                        >
                          {metric.value} {metric.unit}
                        </p>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            metric.status === "normal" ? "bg-green-500" : 
                            metric.status === "warning" ? "bg-yellow-500" : 
                            "bg-red-500"
                          )}
                          style={{
                            width: `${
                              metric.status === "normal" ? "100%" : 
                              metric.status === "warning" ? "66%" : 
                              "33%"
                            }`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {metric.date.toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="#metrics" onClick={() => setActiveTab("metrics")}>
                    View All Metrics
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Personalized recommendations based on your assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
                      <path d="M2 20h20" />
                      <path d="M14 12v.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Regular Blood Pressure Monitoring</h3>
                    <p className="text-sm text-muted-foreground">
                      Monitor your blood pressure at least twice a week and record the readings.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Cognitive Exercises</h3>
                    <p className="text-sm text-muted-foreground">
                      Engage in daily cognitive exercises to maintain brain health and cognitive function.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m4.93 4.93 4.24 4.24" />
                      <path d="m14.83 9.17 4.24-4.24" />
                      <path d="m14.83 14.83 4.24 4.24" />
                      <path d="m9.17 14.83-4.24 4.24" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Dietary Adjustments</h3>
                    <p className="text-sm text-muted-foreground">
                      Reduce sodium and saturated fat intake to help manage cholesterol levels.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="assessments" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Assessment History</CardTitle>
              <CardDescription>
                Complete history of your brain health assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {assessments.map((assessment) => (
                  <div key={assessment.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full",
                            assessment.risk === "low" ? "bg-green-100 text-green-700" : 
                            assessment.risk === "moderate" ? "bg-yellow-100 text-yellow-700" : 
                            "bg-red-100 text-red-700"
                          )}
                        >
                          {assessment.type === "stroke" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                            </svg>
                          ) : assessment.type === "tumor" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                              <path d="M12 17h.01" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M8 12h8" />
                              <path d="M12 8v8" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)} Assessment
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {assessment.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          assessment.risk === "low" ? "bg-green-100 text-green-700" : 
                          assessment.risk === "moderate" ? "bg-yellow-100 text-yellow-700" : 
                          "bg-red-100 text-red-700"
                        )}
                      >
                        {assessment.risk.charAt(0).toUpperCase() + assessment.risk.slice(1)} Risk
                      </div>
                    </div>
                    <p className="mt-2 text-sm">{assessment.result}</p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button>Schedule New Assessment</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Metrics</CardTitle>
              <CardDescription>
                Track your health metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {healthMetrics.map((metric) => (
                  <div key={metric.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{metric.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Last updated: {metric.date.toLocaleDateString()}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          metric.status === "normal" ? "bg-green-100 text-green-700" : 
                          metric.status === "warning" ? "bg-yellow-100 text-yellow-700" : 
                          "bg-red-100 text-red-700"
                        )}
                      >
                        {metric.status.charAt(0).toUpperCase() + metric.status.slice(1)}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold">
                        {metric.value} <span className="text-sm font-normal">{metric.unit}</span>
                      </div>
                      <div className="flex-1">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              metric.status === "normal" ? "bg-green-500" : 
                              metric.status === "warning" ? "bg-yellow-500" : 
                              "bg-red-500"
                            )}
                            style={{
                              width: `${
                                metric.status === "normal" ? "100%" : 
                                metric.status === "warning" ? "66%" : 
                                "33%"
                              }`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-sm">
                      {metric.status === "normal" ? (
                        <p className="text-green-600">Within normal range.</p>
                      ) : metric.status === "warning" ? (
                        <p className="text-yellow-600">Slightly elevated. Monitor closely.</p>
                      ) : (
                        <p className="text-red-600">Above recommended range. Consult your doctor.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline">Add New Measurement</Button>
              <Button>Download Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 