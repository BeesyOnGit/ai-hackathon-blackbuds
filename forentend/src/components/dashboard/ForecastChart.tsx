
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Forecast } from "@/data/sample-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { formatCurrency } from "@/lib/financial-calculations";

interface ForecastChartProps {
  forecasts: Forecast[];
  confidence: number;
}

export function ForecastChart({ forecasts, confidence }: ForecastChartProps) {
  const confidencePercentage = (confidence * 100).toFixed(0);
  
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Financial Forecast</CardTitle>
        <CardDescription>
          Projected income and expenses for the next {forecasts.length} months 
          (Confidence: {confidencePercentage}%)
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={forecasts}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => formatCurrency(value).split('.')[0]}
            />
            <Tooltip 
              formatter={(value) => formatCurrency(Number(value))}
              labelFormatter={(label) => `${label} Forecast`}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="predictedIncome" 
              name="Income"
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary) / 20%)" 
              activeDot={{ r: 8 }} 
            />
            <Area 
              type="monotone" 
              dataKey="predictedExpenses" 
              name="Expenses"
              stroke="hsl(var(--destructive))" 
              fill="hsl(var(--destructive) / 20%)" 
            />
            <Area 
              type="monotone" 
              dataKey="predictedSavings" 
              name="Savings"
              stroke="hsl(var(--accent))" 
              fill="hsl(var(--accent) / 20%)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
