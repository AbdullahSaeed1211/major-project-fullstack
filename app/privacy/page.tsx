import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft, Shield, FileText, ExternalLink, LockKeyhole, Server, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | Brainwise",
  description: "Privacy policy for Brainwise.",
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-16 space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center mb-12">
        <Button variant="ghost" size="sm" className="interactive flex items-center mr-4" asChild>
          <Link href="/">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 pb-1">Privacy Policy</h1>
      </div>

      <Card className="border shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <LockKeyhole className="h-6 w-6 flex-shrink-0" />
            <p className="text-sm">
              At Brainwise, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application.
            </p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Information We Collect
                </h2>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start rounded-lg p-4 border border-blue-100 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/20">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-base">Health Data</h3>
                      <p className="text-sm mt-1">
                        When you use our stroke prediction tool, we collect health information such as age, gender, medical history, and lifestyle factors. This information is processed locally in your browser and is not stored on our servers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start rounded-lg p-4 border border-blue-100 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/20">
                    <Server className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-base">Images</h3>
                      <p className="text-sm mt-1">
                        When you upload MRI scans for tumor detection, these images are processed locally in your browser and are not stored on our servers.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start rounded-lg p-4 border border-blue-100 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-900/20">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-base">Chat Data</h3>
                      <p className="text-sm mt-1">
                        When you interact with our chatbot, your questions and conversation history are processed locally and are not stored on our servers.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  How We Use Your Information
                </h2>
                <p className="mt-4">
                  We use the information you provide solely to deliver the requested services:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>To generate stroke risk predictions based on your health data</li>
                  <li>To analyze MRI scans for potential tumors</li>
                  <li>To provide relevant responses to your health-related questions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Data Security
                </h2>
                <div className="mt-4 p-4 rounded-lg bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-300 flex items-start gap-3">
                  <LockKeyhole className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm">
                    Brainwise processes all data locally in your browser. We do not store your health data, images, or chat conversations on our servers. This approach ensures your sensitive information remains private.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Changes to This Privacy Policy
                </h2>
                <p className="mt-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Contact Us
                </h2>
                <p className="mt-4">
                  If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@brainwise.example.com" className="text-primary hover:underline inline-flex items-center">privacy@brainwise.example.com <ExternalLink className="h-3 w-3 ml-1" /></a>.
                </p>
              </section>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-6">
        <div className="space-x-4">
          <Button className="interactive micro-bounce" asChild>
            <Link href="/terms">View Terms of Service</Link>
          </Button>
          <Button variant="outline" className="interactive micro-bounce" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 