
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Banknote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suggestion } from "@/data/sample-data";
import { formatCurrency } from "@/lib/financial-calculations";
import { Badge } from "@/components/ui/badge";

interface SuggestionsProps {
  suggestions: Suggestion[];
}

export function Suggestions({ suggestions }: SuggestionsProps) {
  // Get top 3 suggestions by impact
  const topSuggestions = [...suggestions]
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 3);
    
  // Map difficulty to color
  const difficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate total potential savings
  const totalPotentialSavings = topSuggestions.reduce((sum, suggestion) => sum + suggestion.impact, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Lightbulb className="h-5 w-5 text-primary mr-2" />
            Smart Suggestions
          </CardTitle>
          <TrendingUp className="h-5 w-5 text-[hsl(var(--profit))]" />
        </div>
        <CardDescription>
          Potential monthly savings: {formatCurrency(totalPotentialSavings)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {topSuggestions.map((suggestion) => (
          <div key={suggestion.id} className="border rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{suggestion.title}</h3>
              <Badge variant="outline" className={difficultyColor(suggestion.difficulty)}>
                {suggestion.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Category: {suggestion.category}</span>
              <div className="flex items-center text-[hsl(var(--profit))]">
                <Banknote className="h-4 w-4 mr-1" />
                <span>Save {formatCurrency(suggestion.impact)}/mo</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <span>View All Suggestions</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
