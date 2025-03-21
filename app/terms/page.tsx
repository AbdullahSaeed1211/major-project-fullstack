import Link from "next/link";
import { Metadata } from "next";
import { ChevronLeft, Shield, AlertTriangle, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Terms of Service | Brainwise",
  description: "Terms of service for Brainwise.",
};

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-16 space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center mb-12">
        <Button variant="ghost" size="sm" className="interactive flex items-center mr-4" asChild>
          <Link href="/">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 pb-1">Terms of Service</h1>
      </div>

      <Card className="border shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-3 p-4 mb-6 rounded-lg bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Shield className="h-6 w-6 flex-shrink-0" />
            <p className="text-sm">
              These Terms of Service govern your use of our web application and services. By using Brainwise, you agree to these terms.
            </p>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Services
                </h2>
                <p className="mt-4">
                  Brainwise provides tools for stroke prediction, tumor detection, and health information through an AI chatbot. These services are provided for educational and informational purposes only.
                </p>
                <div className="flex items-center gap-3 p-4 mt-4 rounded-lg bg-yellow-50 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    <strong>Not Medical Advice:</strong> Brainwise is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  User Responsibilities
                </h2>
                <p className="mt-4">
                  As a user of Brainwise, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li>Provide accurate information when using our services</li>
                  <li>Not use our services for any illegal purpose</li>
                  <li>Not attempt to reverse engineer or compromise the security of our application</li>
                  <li>Not use our services to harm others</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Intellectual Property
                </h2>
                <p className="mt-4">
                  All content, features, and functionality of Brainwise, including but not limited to text, graphics, logos, icons, and software, are the exclusive property of Brainwise and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Limitation of Liability
                </h2>
                <p className="mt-4">
                  Brainwise and its creators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Changes to Terms
                </h2>
                <p className="mt-4">
                  We may update our Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold flex items-center border-b pb-2">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Contact Us
                </h2>
                <p className="mt-4">
                  If you have any questions about these Terms, please contact us at <a href="mailto:terms@brainwise.example.com" className="text-primary hover:underline inline-flex items-center">terms@brainwise.example.com <ExternalLink className="h-3 w-3 ml-1" /></a>.
                </p>
              </section>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-6">
        <div className="space-x-4">
          <Button className="interactive micro-bounce" asChild>
            <Link href="/privacy">View Privacy Policy</Link>
          </Button>
          <Button variant="outline" className="interactive micro-bounce" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 