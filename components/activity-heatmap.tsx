"use client";

import { useState, useEffect } from 'react';
import { format, subMonths, eachDayOfInterval, startOfMonth, endOfMonth, addMonths } from 'date-fns';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface Activity {
  id: string;
  date: string;
  type: string;
}

interface ActivityHeatmapProps {
  userId: string;
}

export function ActivityHeatmap({ userId }: ActivityHeatmapProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("6");
  const [activitiesData, setActivitiesData] = useState<Activity[]>([]);
  
  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/user/activity?userId=${userId}&limit=200`);
        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }
        
        const result = await response.json();
        if (result.status === "success") {
          setActivitiesData(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch activities");
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load activity data. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchActivities();
  }, [userId, toast]);
  
  // Generate days for the heatmap based on selected period
  const generateDays = () => {
    const today = new Date();
    const startDate = subMonths(today, parseInt(selectedPeriod));
    return eachDayOfInterval({ start: startDate, end: today });
  };
  
  const days = generateDays();
  
  // Process activities data
  const activityMap = activitiesData.reduce<Record<string, number>>((acc, activity) => {
    const date = activity.date.split('T')[0]; // Get YYYY-MM-DD
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  
  // Get max activity count for color scaling
  const maxActivity = Math.max(...Object.values(activityMap), 1);
  
  // Get activity level (0-4) for color intensity
  const getActivityLevel = (count: number): number => {
    if (count === 0) return 0;
    const normalized = count / maxActivity;
    if (normalized < 0.25) return 1;
    if (normalized < 0.5) return 2;
    if (normalized < 0.75) return 3;
    return 4;
  };
  
  // Generate month labels
  const generateMonthLabels = () => {
    const months = [];
    let currentDate = startOfMonth(days[0]);
    const endDate = endOfMonth(days[days.length - 1]);
    
    while (currentDate <= endDate) {
      months.push(currentDate);
      currentDate = startOfMonth(addMonths(currentDate, 1));
    }
    
    return months;
  };
  
  const months = generateMonthLabels();
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Activity History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 flex items-center justify-center">
            <div className="animate-pulse">Loading activity data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" /> Activity History
        </CardTitle>
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 months</SelectItem>
              <SelectItem value="6">Last 6 months</SelectItem>
              <SelectItem value="12">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={() => console.log("Export data")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => console.log("Export data")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground ml-8 mb-1 grid grid-cols-[repeat(auto-fit,20px)] gap-[3px]">
          {months.map((month, i) => (
            <div 
              key={i} 
              className="col-span-4"
              style={{
                gridColumn: `${i * 4 + 1} / span 4`
              }}
            >
              {format(month, 'MMM')}
            </div>
          ))}
        </div>
        
        <div className="flex">
          <div className="text-xs text-muted-foreground flex flex-col gap-[3px] mt-[23px] mr-2">
            <div>Mon</div>
            <div>Wed</div>
            <div>Fri</div>
          </div>
          
          <div className="grid grid-cols-[repeat(auto-fill,20px)] grid-rows-7 gap-[3px]">
            {days.map((day, i) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const count = activityMap[dateStr] || 0;
              const level = getActivityLevel(count);
              
              return (
                <TooltipProvider key={i}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`
                          w-[18px] h-[18px] rounded-sm
                          ${level === 0 ? 'bg-gray-100 dark:bg-gray-800' : ''}
                          ${level === 1 ? 'bg-emerald-100 dark:bg-emerald-900' : ''}
                          ${level === 2 ? 'bg-emerald-200 dark:bg-emerald-800' : ''}
                          ${level === 3 ? 'bg-emerald-300 dark:bg-emerald-700' : ''}
                          ${level === 4 ? 'bg-emerald-400 dark:bg-emerald-600' : ''}
                          hover:ring-2 hover:ring-offset-2 hover:ring-black/5 dark:hover:ring-white/5
                        `}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="text-sm font-medium">
                        {format(day, 'MMMM d, yyyy')}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {count === 0 
                          ? 'No activities' 
                          : `${count} activit${count === 1 ? 'y' : 'ies'}`}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
        
        <div className="flex items-center justify-end mt-4 gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="w-[18px] h-[18px] rounded-sm bg-gray-100 dark:bg-gray-800" />
          <div className="w-[18px] h-[18px] rounded-sm bg-emerald-100 dark:bg-emerald-900" />
          <div className="w-[18px] h-[18px] rounded-sm bg-emerald-200 dark:bg-emerald-800" />
          <div className="w-[18px] h-[18px] rounded-sm bg-emerald-300 dark:bg-emerald-700" />
          <div className="w-[18px] h-[18px] rounded-sm bg-emerald-400 dark:bg-emerald-600" />
          <span>More</span>
        </div>
      </CardContent>
    </Card>
  );
} 