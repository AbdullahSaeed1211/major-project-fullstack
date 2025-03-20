import { Chatbot } from "@/components/chatbot";
import { SampleQuestionButton } from "./client-components";

export const metadata = {
  title: "Brain Health Chatbot | Brainwise",
  description: "Chat with our AI assistant about brain health, neurological conditions, and cognitive wellness.",
};

// Define the sample questions with string identifiers instead of component functions
const sampleQuestions = [
  { iconName: "Brain", text: "What are the best foods for brain health?" },
  { iconName: "Heart", text: "How does sleep affect brain health?" },
  { iconName: "Activity", text: "What exercises benefit the brain most?" },
  { iconName: "BookOpen", text: "How can I improve memory and focus?" },
  { iconName: "Zap", text: "What are early signs of cognitive decline?" }
];

export default function ChatbotPage() {
  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Brain Health Assistant</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-3">Sample Questions</h2>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {sampleQuestions.map((question, index) => (
            <SampleQuestionButton 
              key={index} 
              question={question} 
            />
          ))}
        </div>
      </div>
      
      <Chatbot />
      
      <div className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto border-t border-border pt-6">
        <p>
          This AI assistant provides educational information only and is not a substitute for professional medical advice.
          Always consult with healthcare professionals for medical concerns.
        </p>
      </div>
    </div>
  );
} 