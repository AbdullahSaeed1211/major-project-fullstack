import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen,
  Dumbbell,
  BadgeInfo
} from "lucide-react";
import { ProgressSystem } from "@/components/progress-system";
import { BrainHealthVisualization } from "@/components/brain-health-visualization";
import { QuickLaunchWidget } from "@/components/quick-launch-widget";

export const metadata = {
  title: "Dashboard | Brainwise",
  description: "Your brain health analytics dashboard",
};

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect("/sign-in");
  }
  
  return (
    <div className="flex flex-col gap-8">
      <section className="magic-section relative">
        <div className="absolute inset-0 -z-10 bg-[length:20px_20px] bg-center [background-image:linear-gradient(rgba(var(--magic-primary),0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--magic-primary),0.1)_1px,transparent_1px)]"></div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-[rgba(var(--magic-primary),0.3)] to-[rgba(var(--magic-accent),0.3)] blur-3xl"></div>
        
        <div className="magic-container relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="magic-gradient-text">Brain Health</span> Dashboard
            </h1>
            
            <div className="space-x-2">
              <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10" asChild>
                <Link href="/profile">My Profile</Link>
              </Button>
              <Button size="sm" variant="ghost" className="text-muted-foreground" asChild>
                <Link href="/tools">All Tools</Link>
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Summary Cards */}
            <Card className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stroke Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Low</div>
                <p className="text-xs text-muted-foreground">Based on your latest assessment</p>
              </CardContent>
              <CardFooter>
                <Link href="/stroke-prediction" className="text-xs text-primary hover:underline">
                  Update Assessment
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cognitive Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Very Good</div>
                <p className="text-xs text-muted-foreground">Based on your assessment results</p>
              </CardContent>
              <CardFooter>
                <Link href="/tools/cognitive-assessment" className="text-xs text-primary hover:underline">
                  View Assessment
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Brain Training</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2 Sessions</div>
                <p className="text-xs text-muted-foreground">This week</p>
              </CardContent>
              <CardFooter>
                <Link href="/tools" className="text-xs text-primary hover:underline">
                  Train Now
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="backdrop-blur-sm bg-card/80 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85/100</div>
                <p className="text-xs text-muted-foreground">Overall brain health score</p>
              </CardContent>
              <CardFooter>
                <Link href="/tools" className="text-xs text-primary hover:underline">
                  View Details
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="magic-section relative">
        <div className="absolute -left-40 h-60 w-60 rounded-full bg-gradient-to-br from-[rgba(var(--magic-secondary),0.1)] to-[rgba(var(--magic-primary),0.1)] blur-2xl"></div>
        
        <div className="magic-container relative">
          {/* Progress System */}
          <ProgressSystem />
        </div>
      </section>
      
      <section className="magic-section relative">
        <div className="absolute -right-40 h-60 w-60 rounded-full bg-gradient-to-br from-[rgba(var(--magic-accent),0.1)] to-[rgba(var(--magic-primary),0.1)] blur-2xl"></div>
        
        <div className="magic-container relative">
          {/* Brain Health Visualization */}
          <BrainHealthVisualization />
        </div>
      </section>
      
      <section className="magic-section">
        <div className="magic-container">
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-2">
                  <BookOpen className="h-8 w-8 text-[rgb(var(--magic-primary))]" />
                </div>
                <CardTitle>Understanding Stroke Risk Factors</CardTitle>
                <CardDescription>
                  Learn about the key risk factors that contribute to stroke risk
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="#">Read Article</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-2">
                  <Dumbbell className="h-8 w-8 text-[rgb(var(--magic-secondary))]" />
                </div>
                <CardTitle>Brain Exercises for Memory</CardTitle>
                <CardDescription>
                  Simple daily exercises to strengthen your memory
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="#">View Exercises</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-2">
                  <BadgeInfo className="h-8 w-8 text-[rgb(var(--magic-accent))]" />
                </div>
                <CardTitle>Brain Health Tips</CardTitle>
                <CardDescription>
                  Daily habits to maintain optimal brain function
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" className="w-full" asChild>
                  <Link href="#">Get Tips</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Quick Launch Widget */}
      <QuickLaunchWidget />
    </div>
  );
} 