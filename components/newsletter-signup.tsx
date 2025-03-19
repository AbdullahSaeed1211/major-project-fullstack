import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function NewsletterSignup() {
  const { toast } = useToast();
  
  useEffect(() => {
    // Notify users that newsletter is coming soon
    toast({
      title: "Newsletter Feature (Coming Soon)",
      description: "Email delivery is under development. Your subscription will be recorded but emails won't be sent yet.",
      duration: 5000,
    });
  }, [toast]);
  
  // Rest of component...
} 