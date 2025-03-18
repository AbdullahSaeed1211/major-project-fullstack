"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export function Chatbot() {
  const { isSignedIn, user } = useUser();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Brainwise assistant. How can I help you with brain health today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  async function handleSend() {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = { 
      role: "user", 
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Format history for API
      const history = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Call API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history })
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        // Add assistant response
        setMessages(prev => [
          ...prev,
          { 
            role: "assistant", 
            content: data.response,
            timestamp: new Date(),
          }
        ]);
      } else {
        throw new Error(data.message || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }
  
  function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  return (
    <Card className="w-full h-[700px] flex flex-col magic-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/brain-ai-logo.png" alt="Brainwise" />
            <AvatarFallback className="bg-gradient-to-r from-[rgb(var(--magic-primary))] to-[rgb(var(--magic-secondary))] text-white">
              BW
            </AvatarFallback>
          </Avatar>
          Brain Health Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message, i) => (
              <div 
                key={i}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src="/brain-ai-logo.png" alt="Brainwise" />
                      <AvatarFallback className="bg-gradient-to-r from-[rgb(var(--magic-primary))] to-[rgb(var(--magic-secondary))] text-white">
                        BW
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex flex-col">
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-[rgb(var(--magic-primary))] to-[rgb(var(--magic-secondary))] text-white"
                          : "bg-muted"
                      }`}
                    >
                      {message.content}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 mt-1">
                      <AvatarImage src={user?.imageUrl} alt={user?.firstName || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.firstName?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="/brain-ai-logo.png" alt="Brainwise" />
                    <AvatarFallback className="bg-gradient-to-r from-[rgb(var(--magic-primary))] to-[rgb(var(--magic-secondary))] text-white">
                      BW
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col">
                    <div className="rounded-lg p-3 bg-muted">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce" />
                        <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.2s]" />
                        <div className="h-2 w-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="pt-4 pb-6">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full gap-2"
        >
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about brain health..."
            className="flex-1 min-h-[60px] max-h-[120px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="h-auto self-end"
          >
            Send
          </Button>
        </form>
        
        {!isSignedIn && (
          <p className="text-xs text-muted-foreground mt-2 w-full text-center">
            Sign in to save your chat history
          </p>
        )}
      </CardFooter>
    </Card>
  );
} 