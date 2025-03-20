import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Brainwise | Brain Health Platform",
  description: "Our mission is to make brain health analysis accessible to everyone through innovative AI-powered tools and evidence-based approaches.",
  keywords: "about brainwise, brain health mission, cognitive health team, brain science, neurological wellbeing",
  openGraph: {
    title: "About Brainwise | Brain Health Platform",
    description: "Our mission is to make brain health analysis accessible to everyone through innovative AI-powered tools and evidence-based approaches.",
    url: "https://brainwise-sigma.vercel.app/about",
    type: "website",
    images: [
      {
        url: "/images/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Brainwise"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "About Brainwise | Brain Health Platform",
    description: "Our mission is to make brain health analysis accessible to everyone through innovative AI-powered tools and evidence-based approaches.",
    images: ["/images/og-about.jpg"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="mb-8 text-4xl font-bold">About Brainwise</h1>
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About Brain AI
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Our mission is to make brain health analysis accessible to everyone.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="lead">
            Brainwise was founded with a simple yet powerful mission: to leverage artificial intelligence to improve brain health outcomes worldwide. By making advanced diagnostic tools accessible to everyone, we aim to empower individuals to take control of their neurological wellbeing.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is to democratize access to brain health information and provide reliable tools for monitoring and improving neurological wellbeing. We believe that prevention and early detection are critical to addressing neurological disorders.
          </p>

          <h2>Our Team</h2>
          <p>
            Brainwise was developed by a multidisciplinary team of medical professionals, data scientists, and software engineers passionate about improving healthcare through technology. Our team combines expertise in neurology, radiology, machine learning, and user experience design.
          </p>

          <h2>Important Note</h2>
          <p>
            Brainwise is designed to be an educational and screening tool, not a replacement for professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment of any medical condition.
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
    </div>
  );
} 