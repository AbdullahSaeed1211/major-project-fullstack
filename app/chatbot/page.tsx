import { Chatbot } from "@/components/chatbot";

export const metadata = {
  title: "Brain Health Chatbot | Brainwise",
  description: "Chat with our AI assistant about brain health, neurological conditions, and cognitive wellness.",
};

export default function ChatbotPage() {
  return (
    <main className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-4xl font-bold tracking-tight magic-gradient-text">
            Brain Health Assistant
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ask questions about brain health, neurological conditions, cognitive wellness, 
            and get evidence-based information from our AI assistant.
          </p>
        </div>
        
        <Chatbot />
        
        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>
            This AI assistant provides educational information only and is not a substitute for professional medical advice.
            Always consult with healthcare professionals for medical concerns.
          </p>
        </div>
      </div>
    </main>
  );
} 