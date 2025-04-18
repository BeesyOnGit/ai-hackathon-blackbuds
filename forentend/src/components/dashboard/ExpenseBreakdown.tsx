
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ProductCategoryChartProps {
  categoryData: Record<string, number>;
}

export function ExpenseBreakdown({ categoryData }: ProductCategoryChartProps) {
  // Convert category data object to array format for chart
  const data = Object.entries(categoryData).map(([category, count]) => ({
    name: category,
    value: count
  }));
  
  // Custom colors for the pie chart
  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--destructive))',
    'hsl(var(--accent))',
    'hsl(var(--highlight))',
    'hsl(var(--neutral))',
    '#a78bfa',
    '#f59e0b',
    '#3b82f6'
  ];
  
  // Remove categories with zero items
  const filteredData = data.filter(item => item.value > 0);
  
  // Calculate total items
  const totalItems = filteredData.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Categories</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {filteredData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip formatter={(value) => `${Number(value)} items`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">Total Products: {totalItems}</p>
        </div>
      </CardContent>
    </Card>
  );
}
