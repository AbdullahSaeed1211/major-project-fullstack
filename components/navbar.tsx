"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Brain, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Tools", href: "/tools" },
  { name: "Cognitive Games", href: "/cognitive-games" },
  { name: "Stroke Prediction", href: "/stroke-prediction" },
  { name: "Chatbot", href: "/chatbot" },
];

export function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-bold">Brainwise</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          
          {isSignedIn ? (
            <>
              <Link 
                href="/profile" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/profile" ? "text-primary" : "text-muted-foreground"
                )}
              >
                Profile
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="text-sm font-medium transition-colors hover:text-primary">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
        
        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="px-2">
                <div className="flex items-center justify-between mb-8">
                  <Link 
                    href="/" 
                    className="flex items-center gap-2" 
                    onClick={() => setOpen(false)}
                  >
                    <Brain className="h-6 w-6 text-primary" />
                    <span className="font-bold">Brainwise</span>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setOpen(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                
                <nav className="flex flex-col gap-6 mb-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                <div className="border-t pt-6 flex flex-col gap-4">
                  {isSignedIn ? (
                    <>
                      <Link 
                        href="/profile" 
                        className="text-base font-medium transition-colors hover:text-primary"
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </Link>
                      <div className="flex items-center">
                        <UserButton afterSignOutUrl="/" />
                        <span className="ml-2 text-sm text-muted-foreground">Account</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <Button variant="ghost" className="w-full justify-start">
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button className="w-full">
                          Sign Up
                        </Button>
                      </SignUpButton>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
} 