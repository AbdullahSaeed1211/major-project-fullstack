import Link from "next/link";

export const metadata = {
  title: "About | Brain AI",
  description: "Learn more about Brain AI and our mission to improve brain health.",
};

export default function AboutPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About Brain AI
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Our mission is to make brain health analysis accessible to everyone.
          </p>
        </div>

        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p>
              Brain AI was founded with a simple yet powerful mission: to leverage artificial intelligence to improve brain health outcomes worldwide. By making advanced diagnostic tools accessible to everyone, we aim to reduce the global burden of stroke and other neurological conditions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold">The Technology</h2>
            <p>
              Our platform uses state-of-the-art machine learning models trained on extensive medical datasets. These models can predict stroke risk based on health factors and detect potential tumors in MRI scans with high accuracy. All processing happens directly in your browser, ensuring your health data remains private.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold">The Team</h2>
            <p>
              Brain AI was developed by a multidisciplinary team of medical professionals, data scientists, and software engineers passionate about improving healthcare through technology. Our team combines expertise in neurology, machine learning, and user experience design to create tools that are both powerful and easy to use.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-bold">Disclaimer</h2>
            <p>
              Brain AI is designed to be an educational and screening tool, not a replacement for professional medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment of any medical condition.
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