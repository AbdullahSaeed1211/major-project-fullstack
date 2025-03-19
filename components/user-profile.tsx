"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const [, setActiveTab] = useState("overview");
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState({
    metrics: true,
    assessments: true
  });
  
  // No user, show sign-in prompt
  if (!user) {
    return <div className="p-8 text-center">Please sign in to view your profile</div>;
  }
  
  // Fetch health metrics
  useEffect(() => {
    async function fetchHealthMetrics() {
      try {
        const response = await fetch('/api/user/health-metrics');
        if (response.ok) {
          const data = await response.json();
          setHealthMetrics(data.metrics);
        } else {
          throw new Error('Failed to fetch health metrics');
        }
      } catch (error) {
        console.error('Error fetching health metrics:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load health metrics'
        });
      } finally {
        setIsLoading(prev => ({ ...prev, metrics: false }));
      }
    }
    
    fetchHealthMetrics();
  }, [toast]);
  
  // Fetch assessments
  useEffect(() => {
    async function fetchAssessments() {
      try {
        const response = await fetch('/api/user/assessments');
        if (response.ok) {
          const data = await response.json();
          setAssessments(data.assessments);
        } else {
          throw new Error('Failed to fetch assessments');
        }
      } catch (error) {
        console.error('Error fetching assessments:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load assessments'
        });
      } finally {
        setIsLoading(prev => ({ ...prev, assessments: false }));
      }
    }
    
    fetchAssessments();
  }, [toast]);
  
  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-4xl font-semibold uppercase text-muted-foreground">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  Member since {user.createdAt.toLocaleDateString()}
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {user.role === "user" ? "Patient" : user.role}
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
          <div className="text-center p-8">
            <p>Loading overview data...</p>
              </div>
        </TabsContent>
        
        <TabsContent value="assessments" className="space-y-4 pt-4">
          <div className="text-center p-8">
            <p>Loading assessment data...</p>
              </div>
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-4 pt-4">
          <div className="text-center p-8">
            <p>Loading health metrics...</p>
              </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 