# Data Visualization Components

## Overview

This document outlines the data visualization components used in the BrainWise application for displaying health metrics, progress data, and cognitive assessment results.

## Technology Stack

- **Chart Library**: [Recharts](https://recharts.org)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icon Library**: [Lucide React](https://lucide.dev)
- **Styling**: Tailwind CSS

## Key Components

### 1. HealthMetricsChart

A responsive line chart for visualizing health metrics over time.

```tsx
// components/charts/health-metrics-chart.tsx
"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MetricType } from "@/types/health-metrics";

interface HealthMetricsChartProps {
  data: {
    date: string;
    value: number;
    type: MetricType;
  }[];
  title?: string;
}

export function HealthMetricsChart({ data, title = "Health Metrics Trend" }: HealthMetricsChartProps) {
  const [metricType, setMetricType] = useState<MetricType | "all">("all");
  
  const metricTypes = Array.from(new Set(data.map(item => item.type)));
  
  const filteredData = metricType === "all" 
    ? data 
    : data.filter(item => item.type === metricType);
  
  // Group data by date
  const groupedData = filteredData.reduce((acc, item) => {
    const existingItem = acc.find(i => i.date === item.date);
    if (existingItem) {
      existingItem[item.type] = item.value;
    } else {
      const newItem: any = { date: item.date };
      newItem[item.type] = item.value;
      acc.push(newItem);
    }
    return acc;
  }, [] as any[]);
  
  // Sort by date
  const sortedData = groupedData.sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  const getMetricColor = (type: MetricType): string => {
    const colors: Record<MetricType, string> = {
      "blood-pressure": "#ef4444",
      "heart-rate": "#3b82f6",
      "blood-sugar": "#10b981",
      "cholesterol": "#f59e0b",
      "weight": "#8b5cf6",
      "sleep": "#6366f1",
      "steps": "#14b8a6",
      "hydration": "#3b82f6",
      "stress": "#f43f5e",
    };
    return colors[type] || "#64748b";
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        <Select
          value={metricType}
          onValueChange={(value) => setMetricType(value as MetricType | "all")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All metrics</SelectItem>
            {metricTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sortedData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  value, 
                  name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                ]}
                labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              />
              <Legend />
              {metricType === "all" 
                ? metricTypes.map(type => (
                    <Line 
                      key={type}
                      type="monotone" 
                      dataKey={type} 
                      stroke={getMetricColor(type as MetricType)} 
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                      connectNulls
                    />
                  ))
                : <Line 
                    type="monotone" 
                    dataKey={metricType} 
                    stroke={getMetricColor(metricType as MetricType)} 
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
              }
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
```

### 2. ProgressDonutChart

A donut chart showing progress toward cognitive improvement goals.

```tsx
// components/charts/progress-donut-chart.tsx
"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface ProgressDonutChartProps {
  value: number;
  title: string;
  description?: string;
}

export function ProgressDonutChart({ 
  value, 
  title, 
  description 
}: ProgressDonutChartProps) {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.max(0, Math.min(100, value));
  
  const data = [
    { name: "Progress", value: normalizedValue },
    { name: "Remaining", value: 100 - normalizedValue }
  ];
  
  const COLORS = ["#4f46e5", "#e2e8f0"];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="relative h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index]} 
                    strokeWidth={index === 0 ? 2 : 0}
                    stroke={index === 0 ? "#3730a3" : "transparent"}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Progress']}
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: '6px', 
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  border: 'none'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-3xl font-bold">{normalizedValue}%</p>
              <p className="text-sm text-gray-500">Completed</p>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
```

### 3. MetricsScorecard

A responsive grid of metric cards for displaying key health indicators.

```tsx
// components/charts/metrics-scorecard.tsx
"use client";

import { 
  Activity, 
  Heart, 
  Droplets, 
  Brain, 
  Footprints, 
  Moon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MetricType } from "@/types/health-metrics";

interface MetricItem {
  label: string;
  value: number | string;
  type: MetricType;
  unit?: string;
  change?: number;
  status?: "normal" | "warning" | "alert";
}

interface MetricsScorecardProps {
  metrics: MetricItem[];
  className?: string;
}

export function MetricsScorecard({ metrics, className }: MetricsScorecardProps) {
  const getIcon = (type: MetricType) => {
    const iconMap: Record<MetricType, React.ReactNode> = {
      "blood-pressure": <Activity className="h-5 w-5" />,
      "heart-rate": <Heart className="h-5 w-5" />,
      "blood-sugar": <Droplets className="h-5 w-5" />,
      "cholesterol": <Brain className="h-5 w-5" />,
      "weight": <Activity className="h-5 w-5" />,
      "sleep": <Moon className="h-5 w-5" />,
      "steps": <Footprints className="h-5 w-5" />,
      "hydration": <Droplets className="h-5 w-5" />,
      "stress": <Activity className="h-5 w-5" />,
    };
    
    return iconMap[type] || <Activity className="h-5 w-5" />;
  };
  
  const getStatusColor = (status?: "normal" | "warning" | "alert") => {
    switch (status) {
      case "normal":
        return "text-green-600 bg-green-50";
      case "warning":
        return "text-amber-600 bg-amber-50";
      case "alert":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };
  
  const getChangeIndicator = (change?: number) => {
    if (!change) return null;
    
    if (change > 0) {
      return <span className="text-green-600">↑ {change}%</span>;
    }
    
    if (change < 0) {
      return <span className="text-red-600">↓ {Math.abs(change)}%</span>;
    }
    
    return <span className="text-gray-600">-</span>;
  };
  
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {metrics.map((metric, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={cn("p-2 rounded-full", getStatusColor(metric.status))}>
                  {getIcon(metric.type)}
                </div>
                <h3 className="font-medium">{metric.label}</h3>
              </div>
              {getChangeIndicator(metric.change)}
            </div>
            <div className="mt-4">
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">{metric.value}</span>
                {metric.unit && (
                  <span className="ml-1 text-sm text-gray-500">{metric.unit}</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

### 4. CognitiveDomainRadarChart

A radar chart visualizing performance across cognitive domains.

```tsx
// components/charts/cognitive-domain-radar-chart.tsx
"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CognitiveDomain {
  name: string;
  value: number;
  fullMark: number;
}

interface CognitiveDomainRadarChartProps {
  data: CognitiveDomain[];
  title?: string;
}

export function CognitiveDomainRadarChart({ 
  data, 
  title = "Cognitive Domain Performance" 
}: CognitiveDomainRadarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid strokeOpacity={0.2} />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Performance"
                dataKey="value"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
```

## Usage Examples

### Basic Usage

```tsx
// Example usage in a dashboard component
import { HealthMetricsChart } from "@/components/charts/health-metrics-chart";
import { ProgressDonutChart } from "@/components/charts/progress-donut-chart";
import { MetricsScorecard } from "@/components/charts/metrics-scorecard";
import { CognitiveDomainRadarChart } from "@/components/charts/cognitive-domain-radar-chart";

export default function Dashboard() {
  // Sample data
  const healthMetricsData = [
    { date: "2023-06-01", value: 120, type: "blood-pressure" },
    { date: "2023-06-02", value: 118, type: "blood-pressure" },
    // ...more data
  ];
  
  const metricsData = [
    { 
      label: "Blood Pressure", 
      value: "120/80", 
      type: "blood-pressure", 
      unit: "mmHg", 
      status: "normal" 
    },
    // ...more metrics
  ];
  
  const cognitiveData = [
    { name: "Memory", value: 80, fullMark: 100 },
    { name: "Attention", value: 65, fullMark: 100 },
    { name: "Processing", value: 90, fullMark: 100 },
    { name: "Executive", value: 75, fullMark: 100 },
    { name: "Language", value: 85, fullMark: 100 },
  ];
  
  return (
    <div className="grid gap-6">
      <MetricsScorecard metrics={metricsData} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HealthMetricsChart 
          data={healthMetricsData} 
          title="Blood Pressure Trend" 
        />
        
        <ProgressDonutChart
          value={65}
          title="Recovery Progress"
          description="Overall recovery progress based on goals"
        />
      </div>
      
      <CognitiveDomainRadarChart 
        data={cognitiveData} 
        title="Cognitive Assessment Results" 
      />
    </div>
  );
}
```

## Responsive Design

All chart components are designed to be responsive:

1. **Mobile View**: Charts stack vertically for optimal viewing on small screens
2. **Tablet View**: Grid-based layout with appropriate sizing
3. **Desktop View**: Multi-column layout with additional details

## Accessibility Considerations

1. **Color Contrast**: All charts use colors that meet WCAG AA standards
2. **Alternative Text**: Meaningful descriptions provided for screen readers
3. **Keyboard Navigation**: Charts can be navigated using keyboard controls

## Performance Optimization

1. **Client Components**: All charts are marked with "use client" directive
2. **Lazy Loading**: Implemented with Suspense boundaries
3. **Memoization**: Complex calculations are memoized to prevent unnecessary re-renders

## Future Enhancements

1. **Interactive Drilldowns**: Allow users to click on chart elements for detailed information
2. **Data Export**: Enable exporting chart data in various formats
3. **Animation Enhancements**: Add more sophisticated animations for data transitions
4. **Dark Mode Support**: Automatically adapt chart colors to dark/light mode preferences 