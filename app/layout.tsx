import { ClerkProvider } from '@clerk/nextjs';
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Brain, Github, Twitter, Linkedin } from "lucide-react";
import { dark } from '@clerk/themes';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brainwise: Stroke Risk & Brain Health Platform",
  description: "A comprehensive platform for stroke risk assessment and brain health optimization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
          card: "bg-zinc-900 shadow-xl border border-zinc-800",
          formField: "bg-zinc-800 border-zinc-700",
          formFieldInput: "text-white placeholder:text-zinc-400",
          footerActionLink: "text-indigo-400 hover:text-indigo-300",
          headerTitle: "text-white",
          headerSubtitle: "text-zinc-300",
          socialButtonsBlockButton: "border-zinc-700 hover:bg-zinc-800",
          socialButtonsBlockButtonText: "text-white font-normal",
          dividerLine: "bg-zinc-700",
          dividerText: "text-zinc-300",
          formFieldLabel: "text-zinc-200",
          form: "gap-y-4",
          identityPreview: "bg-zinc-800 border-zinc-700",
          identityPreviewText: "text-white",
          identityPreviewEditButton: "text-indigo-400 hover:text-indigo-300",
          alert: "text-zinc-900",
          alertText: "text-zinc-900",
          formResendCodeLink: "text-indigo-400 hover:text-indigo-300",
          otpCodeFieldInput: "border-zinc-700 bg-zinc-800 text-white",
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="border-t py-12 md:py-8">
                <div className="container px-4 mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                      <Link href="/" className="flex items-center gap-2 mb-4">
                        <Brain className="h-6 w-6 text-primary" />
                        <span className="font-bold">Brainwise</span>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        A comprehensive platform for stroke risk assessment and brain health optimization.
                      </p>
                    </div>
                    
                    <div className="col-span-1">
                      <h3 className="font-medium mb-3">Platform</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link href="/tools" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Tools
                          </Link>
                        </li>
                        <li>
                          <Link href="/cognitive-games" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Cognitive Games
                          </Link>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="col-span-1">
                      <h3 className="font-medium mb-3">Resources</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            About
                          </Link>
                        </li>
                        <li>
                          <Link href="/stroke-prediction" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Stroke Risk Assessment
                          </Link>
                        </li>
                        <li>
                          <Link href="/chatbot" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            AI Health Assistant
                          </Link>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="col-span-1">
                      <h3 className="font-medium mb-3">Legal</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Terms of Service
                          </Link>
                        </li>
                        <li>
                          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Privacy Policy
                          </Link>
                        </li>
                      </ul>
                      <div className="flex items-center gap-4 mt-4">
                        <Link href="https://github.com" className="text-muted-foreground hover:text-primary transition-colors">
                          <Github className="h-5 w-5" />
                        </Link>
                        <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                          <Twitter className="h-5 w-5" />
                        </Link>
                        <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                      © 2025 Brainwise. All rights reserved.
                    </p>
                    <p className="text-center text-sm text-muted-foreground md:text-right">
                      Made with ❤️ for brain health
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </ThemeProvider>
          <Toaster position="bottom-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
