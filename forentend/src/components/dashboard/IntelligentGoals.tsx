
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/financial-calculations";
import { Clock, Target, TrendingUp, ShieldCheck } from "lucide-react";

interface Goal {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  deadlineDate: string;
  icon: React.ReactNode;
}

export function IntelligentGoals() {
  const goals: Goal[] = [
    {
      id: "1",
      name: "Emergency Fund",
      currentAmount: 6500,
      targetAmount: 10000,
      deadlineDate: "2025-09-15",
      icon: <ShieldCheck className="h-5 w-5 text-amber-500" />,
    },
    {
      id: "2",
      name: "Vacation",
      currentAmount: 1200,
      targetAmount: 3000,
      deadlineDate: "2025-07-01",
      icon: <Target className="h-5 w-5 text-blue-500" />,
    },
    {
      id: "3",
      name: "Down Payment",
      currentAmount: 15000,
      targetAmount: 60000,
      deadlineDate: "2026-12-01",
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    },
  ];

  function calculateDaysRemaining(deadlineDate: string): number {
    const deadline = new Date(deadlineDate);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  function calculatePercentComplete(current: number, target: number): number {
    return (current / target) * 100;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Smart Financial Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {goals.map((goal) => {
          const percentComplete = calculatePercentComplete(goal.currentAmount, goal.targetAmount);
          const daysRemaining = calculateDaysRemaining(goal.deadlineDate);
          
          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {goal.icon}
                  <span className="font-medium">{goal.name}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{daysRemaining} days left</span>
                </div>
              </div>
              
              <Progress value={percentComplete} className="h-2" />
              
              <div className="flex items-center justify-between text-sm">
                <span>
                  {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                </span>
                <span className="text-primary font-medium">
                  {percentComplete.toFixed(0)}%
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
