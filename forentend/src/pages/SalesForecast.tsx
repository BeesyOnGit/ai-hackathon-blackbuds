import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

interface SalesForecastProps {
    salesData: Array<{
        month: string;
        revenue: number;
        costs: number;
    }>;
}

export function SalesForecast() {
    const [forecastPeriod, setForecastPeriod] = useState<string>("3");

    // Generate forecast data based on historical trends
    const salesData = [
        { month: "Jan", revenue: 8200, costs: 5100 },
        { month: "Feb", revenue: 7900, costs: 4900 },
        { month: "Mar", revenue: 9500, costs: 5800 },
        { month: "Apr", revenue: 10200, costs: 6300 },
        { month: "May", revenue: 11800, costs: 7200 },
        { month: "Jun", revenue: 12400, costs: 7400 },
        { month: "Jul", revenue: 10800, costs: 6700 },
        { month: "Aug", revenue: 12700, costs: 7800 },
        { month: "Sep", revenue: 13500, costs: 8100 },
        { month: "Oct", revenue: 14200, costs: 8400 },
        { month: "Nov", revenue: 13800, costs: 8300 },
        { month: "Dec", revenue: 15700, costs: 9200 },
    ];
    const generateForecast = () => {
        // Simple linear regression for forecasting
        const months = salesData.length;
        const lastRevenue = salesData[months - 1].revenue;
        const lastCosts = salesData[months - 1].costs;

        // Calculate average monthly growth rates
        let revenueGrowthSum = 0;
        let costsGrowthSum = 0;

        for (let i = 1; i < months; i++) {
            revenueGrowthSum += (salesData[i].revenue - salesData[i - 1].revenue) / salesData[i - 1].revenue;
            costsGrowthSum += (salesData[i].costs - salesData[i - 1].costs) / salesData[i - 1].costs;
        }

        const avgRevenueGrowth = revenueGrowthSum / (months - 1);
        const avgCostsGrowth = costsGrowthSum / (months - 1);

        // Generate forecast data
        const forecastMonths = parseInt(forecastPeriod);
        const lastMonthIdx = months - 1;
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const forecast = [];
        for (let i = 0; i < forecastMonths; i++) {
            const monthIdx = (lastMonthIdx + i + 1) % 12;
            const projectedRevenue = lastRevenue * Math.pow(1 + avgRevenueGrowth, i + 1);
            const projectedCosts = lastCosts * Math.pow(1 + avgCostsGrowth, i + 1);
            const projectedProfit = projectedRevenue - projectedCosts;

            forecast.push({
                month: monthNames[monthIdx],
                revenue: Math.round(projectedRevenue),
                costs: Math.round(projectedCosts),
                profit: Math.round(projectedProfit),
                isProjected: true,
            });
        }

        // Combine historical and forecast data
        return [
            ...salesData.map((d) => ({
                ...d,
                profit: d.revenue - d.costs,
                isProjected: false,
            })),
            ...forecast,
        ];
    };

    const combinedData = generateForecast();
    console.log("🚀 ~ file: SalesForecast.tsx:85 ~ SalesForecast ~ combinedData:", combinedData);

    // Create separate datasets for historical and projected data
    const historicalData = combinedData.filter((d) => !d.isProjected);
    const projectedData = combinedData.filter((d) => d.isProjected);

    return (
        <div className="grid grid-cols-1 gap-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle className="flex items-center">
                                <TrendingUp className="mr-2 h-5 w-5" />
                                Sales Forecast
                            </CardTitle>
                            <CardDescription>Projected revenue, costs, and profit based on historical data</CardDescription>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Forecast period:</span>
                            <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="3 months" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="3">3 months</SelectItem>
                                    <SelectItem value="6">6 months</SelectItem>
                                    <SelectItem value="12">12 months</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" domain={[0, 5]} />
                                <YAxis />
                                <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
                                <Legend />

                                {/* Historical Revenue Line */}
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Revenue"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    dot={{ strokeWidth: 2 }}
                                    activeDot={{ r: 8 }}
                                    connectNulls
                                    data={historicalData}
                                />

                                {/* Projected Revenue Line */}
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    name="Projected Revenue"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={2}
                                    dot={{ strokeWidth: 2 }}
                                    strokeDasharray="5 5"
                                    data={projectedData}
                                />

                                {/* Historical Costs Line */}
                                <Line
                                    type="monotone"
                                    dataKey="costs"
                                    name="Costs"
                                    stroke="hsl(var(--destructive))"
                                    strokeWidth={2}
                                    dot={{ strokeWidth: 2 }}
                                    connectNulls
                                    data={historicalData}
                                />

                                {/* Projected Costs Line */}
                                <Line
                                    type="monotone"
                                    dataKey="costs"
                                    name="Projected Costs"
                                    stroke="hsl(var(--destructive))"
                                    strokeWidth={2}
                                    dot={{ strokeWidth: 2 }}
                                    strokeDasharray="5 5"
                                    data={projectedData}
                                />

                                {/* Historical Profit Line */}
                                <Line
                                    type="monotone"
                                    dataKey="profit"
                                    name="Profit"
                                    stroke="hsl(var(--accent))"
                                    strokeWidth={2}
                                    dot={{ strokeWidth: 2 }}
                                    connectNulls
                                    data={historicalData}
                                />

                                {/* Projected Profit Line */}
                                <Line
                                    type="monotone"
                                    dataKey="profit"
                                    name="Projected Profit"
                                    stroke="hsl(var(--accent))"
                                    strokeWidth={2}
                                    dot={{ strokeWidth: 2 }}
                                    strokeDasharray="5 5"
                                    data={projectedData}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <div className="flex items-start space-x-2 text-sm">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                        <p className="text-muted-foreground">
                            Forecast accuracy depends on market conditions. Projections are more reliable for shorter time periods.
                        </p>
                    </div>
                    <div className="flex items-start space-x-2 text-sm">
                        <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                        <p className="text-muted-foreground">
                            Based on your sales trend, consider increasing inventory for the projected high-demand months to maximize profit.
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
