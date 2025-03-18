import Link from "next/link";

export const metadata = {
  title: "Terms of Service | Brainwise",
  description: "Terms of service for Brainwise.",
};

export default function TermsPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-8">
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead">
          Welcome to Brainwise. These Terms of Service govern your use of our web application and services. By using Brainwise, you agree to these terms.
        </p>

        <h2>Services</h2>
        <p>
          Brainwise provides tools for stroke prediction, tumor detection, and health information through an AI chatbot. These services are provided for educational and informational purposes only.
        </p>
        <p>
          <strong>Not Medical Advice:</strong> Brainwise is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>

        <h2>User Responsibilities</h2>
        <p>
          As a user of Brainwise, you agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate information when using our services</li>
          <li>Not use our services for any illegal purpose</li>
          <li>Not attempt to reverse engineer or compromise the security of our application</li>
          <li>Not use our services to harm others</li>
        </ul>

        <h2>Intellectual Property</h2>
        <p>
          All content, features, and functionality of Brainwise, including but not limited to text, graphics, logos, icons, and software, are the exclusive property of Brainwise and are protected by copyright, trademark, and other intellectual property laws.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          Brainwise and its creators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We may update our Terms of Service from time to time. We will notify you of any changes by posting the new Terms on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at terms@brainwise.example.com.
        </p>
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