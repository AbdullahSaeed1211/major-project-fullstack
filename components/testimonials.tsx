import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Neurologist",
    img: "/testimonials/doctor1.jpg",
    body: "Brainwise has revolutionized how I explain stroke risk factors to my patients. The visual representation of risk factors makes complex medical concepts accessible.",
  },
  {
    name: "Michael Davis",
    role: "Stroke Survivor",
    img: "/testimonials/user1.jpg",
    body: "After my stroke, I was determined to understand my risk factors better. Brainwise helped me visualize exactly what I needed to focus on for recovery.",
  },
  {
    name: "Dr. Thomas Chen",
    role: "Research Scientist",
    img: "/testimonials/doctor2.jpg",
    body: "The accuracy of Brainwise's stroke prediction model is impressive. It aligns well with clinical standards while being accessible to patients.",
  },
  {
    name: "Dr. Rebecca Martinez",
    role: "Hospital Director",
    img: "/testimonials/doctor3.jpg",
    body: "We've implemented Brainwise in our preventive care program. The engagement from patients has increased dramatically with these visual tools.",
  },
  {
    name: "Jane Wilson",
    role: "Caregiver",
    img: "/testimonials/user2.jpg",
    body: "Caring for my father after his stroke was challenging. Brainwise helped our family understand his condition and recovery journey.",
  },
  {
    name: "Dr. Kevin Walker",
    role: "Primary Care Physician",
    img: "/testimonials/doctor4.jpg",
    body: "I recommend Brainwise to patients at risk of stroke. The personalized recommendations have helped many take preventive measures seriously.",
  },
];

const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

const TestimonialCard = ({
  img,
  name,
  role,
  body,
}: {
  img: string;
  name: string;
  role: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-80 overflow-hidden rounded-xl border p-6 shadow-sm transition-all",
        // light styles
        "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50",
        // dark styles
        "dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900",
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={img} alt={name} />
          <AvatarFallback className="bg-gradient-to-br from-[rgb(var(--magic-primary))] to-[rgb(var(--magic-secondary))] text-white">
            {name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <figcaption className="font-medium text-foreground">
            {name}
          </figcaption>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
      <blockquote className="mt-4 text-pretty text-sm text-muted-foreground">
        &ldquo;{body}&rdquo;
      </blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl magic-gradient-text">
              Trusted by Healthcare Professionals
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See how Brainwise is making a difference in stroke prevention and brain health management.
            </p>
          </div>
        </div>
      </div>
      
      <div className="relative mt-12 flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:40s] [--gap:2rem]">
          {firstRow.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </Marquee>
        <div className="my-6"></div>
        <Marquee reverse pauseOnHover className="[--duration:40s] [--gap:2rem]">
          {secondRow.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
      </div>
    </section>
  );
} 