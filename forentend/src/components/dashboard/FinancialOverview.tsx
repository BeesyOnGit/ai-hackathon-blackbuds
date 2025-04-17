
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Wallet, PiggyBank, TrendingUp } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/financial-calculations";

interface FinancialMetric {
  current: number;
  previous: number;
  percentChange: number;
}

interface FinancialOverviewProps {
  income: FinancialMetric;
  expenses: FinancialMetric;
  savings: FinancialMetric;
  savingsRate: FinancialMetric;
}

export function FinancialOverview({ income, expenses, savings, savingsRate }: FinancialOverviewProps) {
  const renderTrend = (percentChange: number) => {
    const isPositive = percentChange >= 0;
    const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
    const trendClass = isPositive ? "text-[hsl(var(--profit))]" : "text-[hsl(var(--loss))]";
    
    return (
      <div className={`flex items-center ${trendClass} text-sm`}>
        <TrendIcon className="h-4 w-4 mr-1" />
        <span>{Math.abs(percentChange).toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center">
              <Wallet className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{formatCurrency(income.current)}</span>
            </div>
            {renderTrend(income.percentChange)}
          </div>
          <CardDescription className="mt-2">
            {income.percentChange >= 0 
              ? `Increased from ${formatCurrency(income.previous)}` 
              : `Decreased from ${formatCurrency(income.previous)}`}
          </CardDescription>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center">
              <Wallet className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{formatCurrency(expenses.current)}</span>
            </div>
            {renderTrend(-expenses.percentChange)} {/* Invert for expenses: decrease is good */}
          </div>
          <CardDescription className="mt-2">
            {expenses.percentChange <= 0 
              ? `Decreased from ${formatCurrency(expenses.previous)}` 
              : `Increased from ${formatCurrency(expenses.previous)}`}
          </CardDescription>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Net Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center">
              <PiggyBank className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{formatCurrency(savings.current)}</span>
            </div>
            {renderTrend(savings.percentChange)}
          </div>
          <CardDescription className="mt-2">
            {savings.percentChange >= 0 
              ? `Increased from ${formatCurrency(savings.previous)}` 
              : `Decreased from ${formatCurrency(savings.previous)}`}
          </CardDescription>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Savings Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{formatPercentage(savingsRate.current)}</span>
            </div>
            {renderTrend(savingsRate.percentChange)}
          </div>
          <CardDescription className="mt-2">
            {savingsRate.percentChange >= 0 
              ? `Increased from ${formatPercentage(savingsRate.previous)}` 
              : `Decreased from ${formatPercentage(savingsRate.previous)}`}
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
