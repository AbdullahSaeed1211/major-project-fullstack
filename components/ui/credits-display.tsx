"use client";

import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { formatDate } from "@/app/utils/date";
import axios from "axios";
import { SidebarContent } from "@/app/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";

interface UserCredits {
  creditsUsed: number;
  addOnCreditsUsed: number;
  creditAddons: number;
  subscription?: {
    quantity: number;
    status: string;
  };
  planRenewalDate?: Date;
}

export function CreditsDisplay() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [userCredits, setUserCredits] = useState<UserCredits | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddCreditsClick = () => {
    console.log("Add credits clicked");
    // In a real implementation, this would open a dialog to add credits
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      fetchUserCredits();
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchUserCredits = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/user/credits');
      
      if (response.data.user) {
        setUserCredits(response.data.user);
      }
    } catch (error) {
      console.error("Failed to fetch user credits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculatePercentage = (used: number, total: number) => {
    if (!total) return 0;
    const percentage = (used / (total * 1000000)) * 100;
    return Math.min(Math.round(percentage), 100);
  };

  if (isLoading || !isSignedIn || !userCredits) {
    return (
      <div className="px-3 py-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-1"></div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
      </div>
    );
  }
  
  // If no active subscription, don't show credits
  if (!userCredits.subscription || userCredits.subscription.status !== 'active') {
    return null;
  }

  return (
    <div className="mt-4 text-sm">
      <SidebarContent>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                  Credits
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-200">
                  {((userCredits.creditsUsed || 0) / 1000000).toFixed(2)} of{" "}
                  <span className="relative transition-colors duration-150 text-neutral-600 dark:text-neutral-200">
                    {userCredits.subscription?.quantity} M
                  </span>
                </span>
              </div>
            </div>
            <div className="mt-1.5">
              <div className="h-0.5 w-full overflow-hidden rounded-full bg-neutral-900/10 transition-colors dark:bg-white/5">
                <div
                  className="h-full w-full dark:bg-white/10"
                  style={{ 
                    transform: `translateX(-${100 - calculatePercentage(userCredits.creditsUsed || 0, userCredits.subscription?.quantity || 0)}%)`,
                    background: "linear-gradient(to right, transparent, #6366f1)"
                  }}
                />
              </div>
            </div>
          </div>

          {userCredits.creditAddons > 0 && (
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                    Add-ons
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-medium text-neutral-600 dark:text-neutral-200">
                    {((userCredits.addOnCreditsUsed || 0) / 1000000).toFixed(2)}{" "}
                    of{" "}
                    <span className="relative transition-colors duration-150 text-neutral-600 dark:text-neutral-200">
                      {userCredits.creditAddons.toFixed(2)} M
                    </span>
                  </span>
                </div>
              </div>
              <div className="mt-1.5">
                <div className="h-0.5 w-full overflow-hidden rounded-full bg-neutral-900/10 transition-colors dark:bg-white/5">
                  <div
                    className="h-full w-full dark:bg-white/10"
                    style={{ 
                      transform: `translateX(-${100 - calculatePercentage(userCredits.addOnCreditsUsed || 0, userCredits.creditAddons || 0)}%)`,
                      background: "linear-gradient(to right, transparent, #6366f1)"
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {userCredits.planRenewalDate && (
          <div className="mt-1">
            <p className="text-xs text-neutral-900/40 dark:text-neutral-200">
              Credits will reset on {formatDate(userCredits.planRenewalDate)}
            </p>
          </div>
        )}
      </SidebarContent>

      <Button
        className="w-full mt-3 text-xs cursor-pointer bg-indigo-600/90 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000 before:ease-in-out dark:text-white"
        onClick={handleAddCreditsClick}
      >
        <Wallet className="w-4 h-4 mr-2 dark:text-white" />
        Add Credits
      </Button>
    </div>
  );
} 