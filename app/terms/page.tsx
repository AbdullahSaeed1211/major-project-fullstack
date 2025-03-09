import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Brain AI",
  description: "Terms of service for Brain AI.",
};

export default function TermsPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Terms of Service
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Last updated: March 9, 2024
          </p>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">Introduction</h2>
            <p>
              Welcome to Brain AI. These Terms of Service govern your use of our web application and services. By using Brain AI, you agree to these terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold">Use of Services</h2>
            <p>
              Brain AI provides tools for stroke prediction, tumor detection, and health information through an AI chatbot. These services are provided for educational and informational purposes only.
            </p>
            <p>
              <strong>Not Medical Advice:</strong> Brain AI is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold">User Responsibilities</h2>
            <p>
              As a user of Brain AI, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate information when using our services</li>
              <li>Not use our services for any illegal purpose</li>
              <li>Not attempt to reverse engineer or compromise the security of our application</li>
              <li>Not use our services to harm others</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold">Intellectual Property</h2>
            <p>
              All content, features, and functionality of Brain AI, including but not limited to text, graphics, logos, icons, and software, are the exclusive property of Brain AI and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold">Limitation of Liability</h2>
            <p>
              Brain AI and its creators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold">Changes to Terms</h2>
            <p>
              We may update our Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at terms@brain-ai.example.com.
            </p>
          </section>
        </div>

        <div className="flex justify-center pt-6">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 