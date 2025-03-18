import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Brainwise",
  description: "Privacy policy for Brainwise.",
};

export default function PrivacyPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-8">
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          At Brainwise, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our web application.
        </p>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Information We Collect</h2>
          <p>
            <strong>Health Data:</strong> When you use our stroke prediction tool, we collect health information such as age, gender, medical history, and lifestyle factors. This information is processed locally in your browser and is not stored on our servers.
          </p>
          <p>
            <strong>Images:</strong> When you upload MRI scans for tumor detection, these images are processed locally in your browser and are not stored on our servers.
          </p>
          <p>
            <strong>Chat Data:</strong> When you interact with our chatbot, your questions and conversation history are processed locally and are not stored on our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">How We Use Your Information</h2>
          <p>
            We use the information you provide solely to deliver the requested services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To generate stroke risk predictions based on your health data</li>
            <li>To analyze MRI scans for potential tumors</li>
            <li>To provide relevant responses to your health-related questions</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Data Security</h2>
          <p>
            Brainwise processes all data locally in your browser. We do not store your health data, images, or chat conversations on our servers. This approach ensures your sensitive information remains private.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@brainwise.example.com.
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
  );
} 