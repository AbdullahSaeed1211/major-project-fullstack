"use client";

import { useState } from "react";
import { 
  Trash2, 
  Bell, 
  Lock, 
  Download, 
  Shield, 
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface UserSettingsProps {
  userId: string;
}

export function UserSettings({ userId }: UserSettingsProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState({
    export: false,
    delete: false
  });
  
  // Settings states
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    activityReminders: true,
    assessmentResults: true,
    newFeatures: false,
    marketingEmails: false
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    shareDataForResearch: true,
    storeActivityHistory: true,
    useCookies: true,
    collectAnalytics: true
  });
  
  // Handlers
  const handleExportData = async () => {
    try {
      setIsLoading(prev => ({ ...prev, export: true }));
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        variant: "default",
        title: "Data export prepared",
        description: `Your data for account ${userId} is ready for download.`,
      });
      
      // In a real implementation, this would trigger a download
      // window.location.href = `/api/user/export-data?userId=${userId}`;
    } catch (error: Error | unknown) {
      console.error("Export error:", error instanceof Error ? error.message : 'Unknown error');
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Could not export your data. Please try again.",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, export: false }));
    }
  };
  
  const handleDeleteData = async () => {
    try {
      setIsLoading(prev => ({ ...prev, delete: true }));
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        variant: "default",
        title: "Data deleted",
        description: `Your requested data for account ${userId} has been deleted.`,
      });
    } catch (error: Error | unknown) {
      console.error("Delete error:", error instanceof Error ? error.message : 'Unknown error');
      toast({
        variant: "destructive",
        title: "Deletion failed",
        description: "Could not delete your data. Please try again.",
      });
    } finally {
      setIsLoading(prev => ({ ...prev, delete: false }));
    }
  };
  
  const updateNotificationSetting = (setting: keyof typeof notificationSettings, checked: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: checked }));
    toast({
      variant: "default",
      title: "Preferences updated",
      description: `Your notification preferences for account ${userId} have been updated.`,
    });
  };
  
  const updatePrivacySetting = (setting: keyof typeof privacySettings, checked: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [setting]: checked }));
    toast({
      variant: "default",
      title: "Privacy settings updated",
      description: `Your privacy settings for account ${userId} have been updated.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="notifications">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span>Notification Preferences</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-updates">Email Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates about your account
                    </p>
                  </div>
                  <Switch
                    id="email-updates"
                    checked={notificationSettings.emailUpdates}
                    onCheckedChange={(checked: boolean) => 
                      updateNotificationSetting('emailUpdates', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="activity-reminders">Activity Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminders to complete brain exercises
                    </p>
                  </div>
                  <Switch
                    id="activity-reminders"
                    checked={notificationSettings.activityReminders}
                    onCheckedChange={(checked: boolean) => 
                      updateNotificationSetting('activityReminders', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="assessment-results">Assessment Results</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications when assessment results are ready
                    </p>
                  </div>
                  <Switch
                    id="assessment-results"
                    checked={notificationSettings.assessmentResults}
                    onCheckedChange={(checked: boolean) => 
                      updateNotificationSetting('assessmentResults', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-features">New Features</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified about new features and improvements
                    </p>
                  </div>
                  <Switch
                    id="new-features"
                    checked={notificationSettings.newFeatures}
                    onCheckedChange={(checked: boolean) => 
                      updateNotificationSetting('newFeatures', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional emails and offers
                    </p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked: boolean) => 
                      updateNotificationSetting('marketingEmails', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="privacy">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>Privacy & Data</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="share-data">Share Data for Research</Label>
                    <p className="text-sm text-muted-foreground">
                      Anonymously contribute your data to improve brain health research
                    </p>
                  </div>
                  <Switch
                    id="share-data"
                    checked={privacySettings.shareDataForResearch}
                    onCheckedChange={(checked: boolean) => 
                      updatePrivacySetting('shareDataForResearch', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="store-history">Store Activity History</Label>
                    <p className="text-sm text-muted-foreground">
                      Keep a record of your activities and progress
                    </p>
                  </div>
                  <Switch
                    id="store-history"
                    checked={privacySettings.storeActivityHistory}
                    onCheckedChange={(checked: boolean) => 
                      updatePrivacySetting('storeActivityHistory', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="use-cookies">Use Cookies</Label>
                    <p className="text-sm text-muted-foreground">
                      Store cookies to improve your experience
                    </p>
                  </div>
                  <Switch
                    id="use-cookies"
                    checked={privacySettings.useCookies}
                    onCheckedChange={(checked: boolean) => 
                      updatePrivacySetting('useCookies', checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="collect-analytics">Usage Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow collection of anonymized usage data
                    </p>
                  </div>
                  <Switch
                    id="collect-analytics"
                    checked={privacySettings.collectAnalytics}
                    onCheckedChange={(checked: boolean) => 
                      updatePrivacySetting('collectAnalytics', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="data-management">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <span>Data Management</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-base font-medium">Export Your Data</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Download a copy of all your personal data stored on our platform.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={handleExportData}
                    disabled={isLoading.export}
                    className="mt-4"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isLoading.export ? "Preparing export..." : "Export my data"}
                  </Button>
                </div>
                
                <div>
                  <h3 className="text-base font-medium flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span>Clear Your Data</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select what data you&apos;d like to remove from our systems.
                  </p>
                  
                  <div className="mt-4 space-y-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                          Clear activity history
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Clear Activity History</DialogTitle>
                          <DialogDescription>
                            This will permanently delete all your activity records, including completed exercises, 
                            assessments, and progress data. This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm font-medium">Are you sure you want to proceed?</p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button 
                            variant="destructive" 
                            onClick={handleDeleteData}
                            disabled={isLoading.delete}
                          >
                            {isLoading.delete ? "Deleting..." : "Delete Data"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                          Clear health metrics
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Clear Health Metrics</DialogTitle>
                          <DialogDescription>
                            This will permanently delete all your health metrics data, including blood pressure, 
                            glucose, sleep, and activity readings. This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm font-medium">Are you sure you want to proceed?</p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button 
                            variant="destructive" 
                            onClick={handleDeleteData}
                            disabled={isLoading.delete}
                          >
                            {isLoading.delete ? "Deleting..." : "Delete Data"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Trash2 className="h-4 w-4 mr-2 text-red-500" />
                          Clear all personal data
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Clear All Personal Data</DialogTitle>
                          <DialogDescription>
                            This will permanently delete all your personal data from our systems, including 
                            activity history, health metrics, assessment results, and preferences. Your account 
                            will remain active, but all your data will be removed. This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <p className="text-sm font-medium text-red-500">This is a destructive action and cannot be undone.</p>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button 
                            variant="destructive" 
                            onClick={handleDeleteData}
                            disabled={isLoading.delete}
                          >
                            {isLoading.delete ? "Deleting..." : "Delete All Data"}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
} 