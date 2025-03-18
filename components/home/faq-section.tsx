"use client";

import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "How can Brain AI help improve my cognitive health?",
      answer: "Our toolkit provides scientifically-designed exercises that target different cognitive domains including memory, attention, processing speed, and problem-solving. Regular use can help maintain and potentially improve cognitive function over time."
    },
    {
      question: "Is Brain AI suitable for all ages?",
      answer: "Yes! Our brain health tools are designed for adults of all ages. Whether you're in your 20s looking to optimize brain performance or in your 60s focused on maintaining cognitive health, our exercises adapt to different skill levels."
    },
    {
      question: "How often should I use the brain training tools?",
      answer: "For optimal results, we recommend using our brain training tools 3-5 times per week, for about 15-20 minutes per session. Consistency is more important than duration for building cognitive resilience."
    },
    {
      question: "Can Brain AI help with stroke prevention?",
      answer: "While no tool can guarantee stroke prevention, our risk assessment can help identify modifiable risk factors. Combined with our educational resources, this knowledge empowers you to make lifestyle changes that may reduce your risk."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We take data privacy seriously and comply with industry best practices for security. Your personal information and assessment results are encrypted and never shared without your explicit permission."
    }
  ];

  return (
    <section className="py-20 px-4 md:px-6 bg-muted/20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-4">
            <HelpCircle className="h-4 w-4 text-primary mr-2" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Common Questions About Brain AI
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our brain health platform and how it can benefit you.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 