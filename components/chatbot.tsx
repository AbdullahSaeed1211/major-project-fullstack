"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export function Chatbot() {
  const { isSignedIn, user } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your Brain Health Assistant. How can I help you today?",
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
    <Card className="w-full h-[700px] flex flex-col shadow-lg border-primary/10">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-xl flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/brain-ai-logo.png" alt="Brainwise" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              BW
            </AvatarFallback>
          </Avatar>
          Brain Health Assistant
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 py-4">
            {messages.map((message, i) => (
              <div 
                key={i}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-in fade-in-0 slide-in-from-bottom-3 duration-300`}
              >
                <div className={`flex items-start gap-3 max-w-[85%] ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}>
                  {message.role === "assistant" ? (
                    <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                      <AvatarImage src="/brain-ai-logo.png" alt="Brainwise" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        BW
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                      <AvatarImage src={user?.image} alt={user?.name || "User"} />
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {user?.name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex flex-col">
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary/50"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                    <span className={`text-xs text-muted-foreground mt-1 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-in fade-in-0 slide-in-from-bottom-3">
                <div className="flex items-start gap-3 max-w-[85%]">
                  <Avatar className="h-8 w-8 mt-1 flex-shrink-0">
                    <AvatarImage src="/brain-ai-logo.png" alt="Brainwise" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      BW
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col">
                    <div className="rounded-2xl px-4 py-3 bg-secondary/50">
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-foreground/50 animate-pulse" />
                        <div className="h-2 w-2 rounded-full bg-foreground/50 animate-pulse [animation-delay:0.2s]" />
                        <div className="h-2 w-2 rounded-full bg-foreground/50 animate-pulse [animation-delay:0.4s]" />
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
      
      <CardFooter className="pt-4 pb-6 border-t">
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
            className="flex-1 min-h-[60px] max-h-[120px] resize-none focus-visible:ring-primary"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading || !input.trim()}
            className="h-[60px] w-[60px] rounded-full"
          >
            <Send className="h-5 w-5" />
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