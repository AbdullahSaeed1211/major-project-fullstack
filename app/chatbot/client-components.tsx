"use client";

import React from "react";
import { Brain, Heart, Activity, BookOpen, Zap } from "lucide-react";

// Define a type for the question prop
interface Question {
  iconName: string;
  text: string;
}

// Define props interface with proper types
interface SampleQuestionButtonProps {
  question: Question;
}

// Create client components for any interactive elements
export function SampleQuestionButton({ question }: SampleQuestionButtonProps) {
  // Render the icon based on the name
  const renderIcon = () => {
    switch (question.iconName) {
      case "Brain":
        return <Brain className="mr-1 h-3.5 w-3.5" />;
      case "Heart":
        return <Heart className="mr-1 h-3.5 w-3.5" />;
      case "Activity":
        return <Activity className="mr-1 h-3.5 w-3.5" />;
      case "BookOpen":
        return <BookOpen className="mr-1 h-3.5 w-3.5" />;
      case "Zap":
        return <Zap className="mr-1 h-3.5 w-3.5" />;
      default:
        return null;
    }
  };
  
  // Add a proper onClick handler inside the client component
  const handleClick = () => {
    // Find the textarea or input in the Chatbot component
    const textArea = document.querySelector('input[type="text"]') as HTMLInputElement;
    
    if (textArea) {
      // Set the value to the question text
      textArea.value = question.text;
      
      // Trigger a change event so React state updates
      const event = new Event('input', { bubbles: true });
      textArea.dispatchEvent(event);
      
      // Find the submit button and click it - Fix by casting to HTMLButtonElement
      const submitButton = textArea.form?.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitButton) {
        submitButton.click();
      }
    }
  };
  
  return (
    <button 
      className="px-3 py-1.5 text-sm rounded-full bg-secondary/50 hover:bg-secondary/70 transition-colors"
      onClick={handleClick}
    >
      {renderIcon()}
      {question.text}
    </button>
  );
} 