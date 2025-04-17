
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface InsightCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badgeText?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  footer?: React.ReactNode;
}

export function InsightCard({
  title,
  description,
  icon,
  badgeText,
  badgeVariant = "default",
  footer,
}: InsightCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {icon}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {badgeText && <Badge variant={badgeVariant}>{badgeText}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export function InsightsList() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">AI-Generated Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InsightCard
          title="Spending Pattern Detected"
          description="You tend to spend 30% more on weekends compared to weekdays. Consider planning budget-friendly weekend activities."
          icon={<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-primary">📊</div>}
          badgeText="Pattern"
          footer={
            <div className="text-sm flex items-center text-muted-foreground">
              <span>View spending breakdown</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          }
        />
        
        <InsightCard
          title="Income Trend Analysis"
          description="Your income shows a positive 6% growth trend year over year, outpacing inflation by approximately 2%."
          icon={<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-[hsl(var(--profit))]">📈</div>}
          badgeText="Positive"
          badgeVariant="outline"
        />
        
        <InsightCard
          title="Bill Optimization"
          description="You could save $45/month by switching your cell phone plan based on your actual data usage patterns."
          icon={<div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">💡</div>}
          badgeText="Opportunity"
          badgeVariant="secondary"
        />
        
        <InsightCard
          title="Savings Goal Progress"
          description="You're 65% toward your emergency fund goal of $10,000. At your current pace, you'll reach it in 4 months."
          icon={<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">🎯</div>}
          badgeText="On Track"
          badgeVariant="outline"
        />
      </div>
    </div>
  );
}
