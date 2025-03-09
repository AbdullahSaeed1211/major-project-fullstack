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
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            <span className="magic-gradient-text">Brain Health</span> Dashboard
          </h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Summary Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Stroke Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Low</div>
                <p className="text-xs text-muted-foreground">Based on your latest assessment</p>
              </CardContent>
              <CardFooter>
                <Link href="/stroke-prediction" className="text-xs text-blue-500 hover:underline">
                  Update Assessment
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tumor Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Not Assessed</div>
                <p className="text-xs text-muted-foreground">Upload MRI scan for analysis</p>
              </CardContent>
              <CardFooter>
                <Link href="/tumor-detection" className="text-xs text-blue-500 hover:underline">
                  Start Assessment
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Alzheimer&apos;s Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Not Assessed</div>
                <p className="text-xs text-muted-foreground">Complete cognitive assessment</p>
              </CardContent>
              <CardFooter>
                <Link href="/alzheimers-detection" className="text-xs text-blue-500 hover:underline">
                  Start Assessment
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85/100</div>
                <p className="text-xs text-muted-foreground">Overall brain health score</p>
              </CardContent>
              <CardFooter>
                <Link href="/health-score" className="text-xs text-blue-500 hover:underline">
                  View Details
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="magic-section">
        <div className="magic-container">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Stroke Prediction</CardTitle>
                <CardDescription>
                  Analyze your risk factors for stroke
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-32">
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
                    className="h-16 w-16 text-[rgb(var(--magic-primary))]"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/stroke-prediction">Start Assessment</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Tumor Detection</CardTitle>
                <CardDescription>
                  Upload MRI scans for tumor analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-32">
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
                    className="h-16 w-16 text-[rgb(var(--magic-accent))]"
                  >
                    <path d="M15 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M18 17v.01" />
                    <path d="M18 14a3 3 0 0 1 0 6" />
                    <path d="M18 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path d="M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M6 16v-3a1 1 0 0 1 1-1h7" />
                    <path d="M9 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                    <path d="M9 9v3" />
                  </svg>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/tumor-detection">Upload Scan</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>AI Chatbot</CardTitle>
                <CardDescription>
                  Get answers to your brain health questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-32">
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
                    className="h-16 w-16 text-[rgb(var(--magic-secondary))]"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M8 10h.01" />
                    <path d="M12 10h.01" />
                    <path d="M16 10h.01" />
                  </svg>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href="/chatbot">Chat Now</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="magic-section">
        <div className="magic-container">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
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
                  </div>
                  <div>
                    <p className="font-medium">Completed Stroke Risk Assessment</p>
                    <p className="text-sm text-muted-foreground">Today at 10:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
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
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Chatbot Conversation</p>
                    <p className="text-sm text-muted-foreground">Yesterday at 3:45 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
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
                      <path d="M15 3v4a1 1 0 0 0 1 1h4" />
                      <path d="M18 17v.01" />
                      <path d="M18 14a3 3 0 0 1 0 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Created Account</p>
                    <p className="text-sm text-muted-foreground">March 8, 2023</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 