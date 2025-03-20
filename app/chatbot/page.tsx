import { Chatbot } from "@/components/chatbot";
import { Button } from "@/components/ui/button";
import { Brain, Heart, Activity, BookOpen, Zap } from "lucide-react";

export const metadata = {
  title: "Brain Health Chatbot | Brainwise",
  description: "Chat with our AI assistant about brain health, neurological conditions, and cognitive wellness.",
};

// Sample questions that users can click on to quickly ask
const sampleQuestions = [
  { icon: Brain, text: "What are the best foods for brain health?" },
  { icon: Heart, text: "How does sleep affect brain health?" },
  { icon: Activity, text: "What exercises benefit the brain most?" },
  { icon: BookOpen, text: "How can I improve memory and focus?" },
  { icon: Zap, text: "What are early signs of cognitive decline?" }
];

export default function ChatbotPage() {
  return (
    <main className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-primary">
            Brain Health Assistant
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ask questions about brain health, neurological conditions, and cognitive wellness
            to get evidence-based information.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {sampleQuestions.map((question, index) => (
              <Button 
                key={index}
                variant="outline" 
                size="sm"
                className="text-xs rounded-full border-primary/20 hover:bg-primary/10"
                onClick={() => {
                  // Find the textarea element and programmatically set its value and focus
                  const textarea = document.querySelector('textarea');
                  if (textarea) {
                    textarea.value = question.text;
                    textarea.focus();
                    
                    // Dispatch event to trigger onChange handler
                    const event = new Event('input', { bubbles: true });
                    textarea.dispatchEvent(event);
                  }
                }}
              >
                <question.icon className="mr-1 h-3 w-3" />
                {question.text}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="bg-card rounded-lg p-1 shadow-xl">
          <Chatbot />
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto border-t border-border pt-6">
          <p>
            This AI assistant provides educational information only and is not a substitute for professional medical advice.
            Always consult with healthcare professionals for medical concerns.
          </p>
        </div>
      </div>
    </main>
  );
} 