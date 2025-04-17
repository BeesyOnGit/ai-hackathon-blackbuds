
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, SendHorizontal, Sparkles } from "lucide-react";
import { Suggestion } from "@/data/sample-data";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface AiAssistantProps {
  suggestions: Suggestion[];
}

export function AiAssistant({ suggestions }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI financial assistant. Ask me about your finances, or how you could save money.",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to generate AI responses based on user input
  const generateResponse = (userQuery: string): string => {
    // Simple pattern matching for demo purposes
    // In a real app, this would connect to an actual AI model
    const query = userQuery.toLowerCase();
    
    if (query.includes("save") || query.includes("saving") || query.includes("savings")) {
      const topSuggestion = suggestions[0];
      return `Based on your spending patterns, I recommend ${topSuggestion.title.toLowerCase()}. ${topSuggestion.description} This could save you approximately ${topSuggestion.impact} per month.`;
    }
    
    if (query.includes("budget") || query.includes("spending")) {
      return "Your highest spending category this month is Housing, followed by Food. You've spent 15% more on Food compared to last month. Consider reviewing your grocery expenses to find savings opportunities.";
    }
    
    if (query.includes("invest") || query.includes("investing")) {
      return "Based on your current savings rate of 70.66%, you have good potential for investing. I recommend starting with an emergency fund of 3-6 months of expenses, then considering index funds for long-term growth.";
    }
    
    if (query.includes("forecast") || query.includes("prediction") || query.includes("future")) {
      return "My forecast shows your income trending upward over the next 6 months. If you maintain your current savings rate, you could accumulate an additional $12,000 by the end of the year.";
    }
    
    return "I'm analyzing your financial data to provide personalized advice. Could you provide more details about what specific financial information you're looking for?";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(userMessage.content),
        role: "assistant",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Bot className="h-6 w-6 text-primary" />
          <div>
            <CardTitle>Financial AI Assistant</CardTitle>
            <CardDescription>Ask questions about your finances</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.role === "assistant"
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            placeholder="Ask about your finances..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <SendHorizontal className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
          <Button size="icon" variant="outline">
            <Sparkles className="h-4 w-4" />
            <span className="sr-only">AI Suggestions</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
