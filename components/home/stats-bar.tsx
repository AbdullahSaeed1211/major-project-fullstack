"use client";

export function StatsBar() {
  return (
    <section className="bg-muted/50">
      <div className="container mx-auto py-6 md:py-10 px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">5+</p>
            <p className="text-sm text-muted-foreground">Cognitive Tools</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">15min</p>
            <p className="text-sm text-muted-foreground">Daily for Results</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">47%</p>
            <p className="text-sm text-muted-foreground">Better Risk Awareness</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">All Ages</p>
            <p className="text-sm text-muted-foreground">Adult-Optimized</p>
          </div>
        </div>
      </div>
    </section>
  );
} 