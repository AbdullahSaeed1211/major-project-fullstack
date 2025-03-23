import React from "react";
import { Metadata } from "next";
import HealthMetricsClient from "./health-metrics-client";

export const metadata: Metadata = {
  title: "Health Metrics | Brainwise",
  description: "Track your health metrics and lifestyle factors that impact brain health",
  keywords: "brain health tracking, health metrics, cognitive health, lifestyle tracking, stroke prevention",
};

export default function HealthMetricsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Health Metrics</h1>
      <p className="text-muted-foreground mb-8 max-w-3xl">
        Track health metrics that impact your brain health. Regular monitoring of these factors can help
        you make lifestyle adjustments to reduce risk of cognitive decline and stroke.
      </p>
      
      <HealthMetricsClient />
    </div>
  );
} 