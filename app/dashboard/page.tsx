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
  Activity, 
  BrainCircuit, 
  MessageSquare, 
  Dumbbell,
  Timer,
  Brain,
  Smile,
  BadgeInfo,
  BookOpen
} from "lucide-react";

export const metadata = {
  title: "Dashboard | Brain AI",
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
          <h2 className="text-2xl font-bold mb-6">Brain Health Toolkit</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center mb-2">
                  <BrainCircuit className="h-5 w-5 text-indigo-600" />
                </div>
                <CardTitle className="text-base">Memory Game</CardTitle>
                <CardDescription className="text-xs">
                  Improve your short-term memory
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">Best Score:</span>
                    <span className="text-muted-foreground ml-1">82%</span>
                  </div>
                  <div className="text-xs px-2 py-1 bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400 rounded-full">
                    Improving
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full text-primary" asChild>
                  <Link href="/tools/memory-game">Play Game</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-600/20 flex items-center justify-center mb-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-base">Cognitive Assessment</CardTitle>
                <CardDescription className="text-xs">
                  Evaluate your cognitive functions
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">Last Taken:</span>
                    <span className="text-muted-foreground ml-1">5 days ago</span>
                  </div>
                  <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400 rounded-full">
                    Due Soon
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full text-primary" asChild>
                  <Link href="/tools/cognitive-assessment">Take Assessment</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-600/20 flex items-center justify-center mb-2">
                  <Smile className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle className="text-base">Mood Tracker</CardTitle>
                <CardDescription className="text-xs">
                  Track emotional wellbeing
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">Today&apos;s Mood:</span>
                    <span className="text-muted-foreground ml-1">Not logged</span>
                  </div>
                  <div className="text-xs px-2 py-1 bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-400 rounded-full">
                    Action Needed
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full text-primary" asChild>
                  <Link href="/tools/mood-tracker">Log Mood</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center mb-2">
                  <Timer className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-base">Meditation Timer</CardTitle>
                <CardDescription className="text-xs">
                  Practice mindful meditation
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="font-medium">Total Time:</span>
                    <span className="text-muted-foreground ml-1">15 mins</span>
                  </div>
                  <div className="text-xs px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-400 rounded-full">
                    New
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="w-full text-primary" asChild>
                  <Link href="/tools/meditation-timer">Meditate</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="magic-section relative">
        <div className="absolute -right-40 h-60 w-60 rounded-full bg-gradient-to-br from-[rgba(var(--magic-accent),0.1)] to-[rgba(var(--magic-primary),0.1)] blur-2xl"></div>
        
        <div className="magic-container relative">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Completed Stroke Risk Assessment</p>
                    <p className="text-sm text-muted-foreground">Today at 10:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <BrainCircuit className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <p className="font-medium">Memory Game - New High Score</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 3:15 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Timer className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">Meditation Session - 10 minutes</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 9:45 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Chat with Health Assistant</p>
                    <p className="text-sm text-muted-foreground">2 days ago at 2:30 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
    </div>
  );
} 