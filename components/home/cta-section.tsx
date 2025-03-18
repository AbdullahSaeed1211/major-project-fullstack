"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 px-4 md:px-6 bg-destructive/10">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-card rounded-2xl p-8 md:p-12 border shadow-lg relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-72 h-72 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-multiply"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/3 translate-y-1/3 mix-blend-multiply"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium mb-2">Limited Time Offer</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Start your brain health journey today</h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of users who are actively improving their cognitive function and reducing health risks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-md">Create Free Account</Button>
                <Button size="lg" variant="outline" className="hover:bg-muted/30" asChild>
                  <Link href="/tools">
                    Explore Tools First
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 pt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Joined this week</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full mt-1">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Personalized Risk Assessment</h3>
                  <p className="text-muted-foreground">Get insights tailored to your health profile</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full mt-1">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Progress Tracking</h3>
                  <p className="text-muted-foreground">Monitor improvements in cognitive performance</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full mt-1">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">5+ Brain Training Tools</h3>
                  <p className="text-muted-foreground">Access our complete cognitive training suite</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 p-2 rounded-full mt-1">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Evidence-Based Resources</h3>
                  <p className="text-muted-foreground">Access scientifically vetted information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 