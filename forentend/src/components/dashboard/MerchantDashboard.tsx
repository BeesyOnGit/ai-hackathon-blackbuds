import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AiAssistant } from "@/components/dashboard/AiAssistant";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, ShoppingBag } from "lucide-react";
import { Suggestion } from "@/data/sample-data";

interface MerchantDashboardProps {
    financialData: {
        totalRevenue: number;
        totalCosts: number;
        netProfit: number;
        profitMargin: number;
        monthlySales: Array<{
            month: string;
            revenue: number;
            costs: number;
        }>;
    };
    suggestions: Array<Suggestion>;
}

export function MerchantDashboard({ financialData, suggestions }: MerchantDashboardProps) {
    // Calculate month-over-month growth
    const currentMonth = financialData.monthlySales[financialData.monthlySales.length - 1];
    const previousMonth = financialData.monthlySales[financialData.monthlySales.length - 2];
    const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
    const profitGrowth =
        ((currentMonth.revenue - currentMonth.costs - (previousMonth.revenue - previousMonth.costs)) /
            (previousMonth.revenue - previousMonth.costs)) *
        100;

    return (
        <div className=" gap-6">
            {/* Main financial metrics */}
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Revenue</CardDescription>
                        <CardTitle className="text-2xl flex items-center justify-between">
                            {financialData.totalRevenue.toLocaleString()} DZD
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <span className={`flex items-center ${revenueGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {revenueGrowth >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                                {Math.abs(revenueGrowth).toFixed(1)}%
                            </span>
                            <span className="ml-1">from previous month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Net Profit</CardDescription>
                        <CardTitle className="text-2xl flex items-center justify-between">
                            {financialData.netProfit.toLocaleString()} DZD
                            <TrendingUp className="h-5 w-5 text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <span className={`flex items-center ${profitGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {profitGrowth >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                                {Math.abs(profitGrowth).toFixed(1)}%
                            </span>
                            <span className="ml-1">from previous month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Profit Margin</CardDescription>
                        <CardTitle className="text-2xl flex items-center justify-between">
                            {financialData.profitMargin.toFixed(1)}%
                            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">Industry average: 35.2%</div>
                    </CardContent>
                </Card>

                {/* Monthly revenue chart */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Monthly Revenue & Costs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={financialData.monthlySales} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`$${value}`, ``]} />
                                    <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue" />
                                    <Bar dataKey="costs" fill="hsl(var(--destructive))" name="Costs" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* AI Assistant */}
            {/* <div className="lg:col-span-1 h-[600px]">
        <AiAssistant suggestions={suggestions} />
      </div> */}
        </div>
    );
}
