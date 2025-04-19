import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Clock, BarChart3, Tag, AlertTriangle, Lightbulb } from "lucide-react";
import { Suggestion } from "@/data/sample-data";
import { InsightCard } from "@/components/dashboard/InsightCard";

interface Product {
    id: number;
    name: string;
    revenue: number;
    profit: number;
    margin: number;
}

interface ProductDetailViewProps {
    product: Product;
    suggestions: Suggestion[];
}

export function ProductDetailView() {
    const product = { id: 1, name: "Wireless Earbuds", revenue: 15400, profit: 7200, margin: 46.8 };
    const suggestions: Suggestion[] = [
        {
            id: "1",
            title: "Optimize Inventory",
            description: "Reduce stock of low-margin USB cables and increase inventory of high-margin Wireless Earbuds.",
            impact: 3200,
            category: "Inventory",
            difficulty: "medium",
        },
        {
            id: "2",
            title: "Shipping Cost Reduction",
            description: "Negotiate with shipping providers for bulk rates to reduce per-order shipping costs by 15%.",
            impact: 4700,
            category: "Operations",
            difficulty: "hard",
        },
        {
            id: "3",
            title: "Marketing Budget Reallocation",
            description: "Shift marketing spend from underperforming Desk Lamp category to high-margin Electronics.",
            impact: 5800,
            category: "Marketing",
            difficulty: "easy",
        },
    ];
    // Sample sales history data (would come from API in a real app)
    const salesHistory = [
        { month: "Jan", sales: 42, revenue: 1050, profit: 420 },
        { month: "Feb", sales: 38, revenue: 950, profit: 380 },
        { month: "Mar", sales: 45, revenue: 1125, profit: 450 },
        { month: "Apr", sales: 56, revenue: 1400, profit: 560 },
        { month: "May", sales: 48, revenue: 1200, profit: 480 },
        { month: "Jun", sales: 62, revenue: 1550, profit: 620 },
        { month: "Jul", sales: 70, revenue: 1750, profit: 700 },
        { month: "Aug", sales: 68, revenue: 1700, profit: 680 },
        { month: "Sep", sales: 74, revenue: 1850, profit: 740 },
        { month: "Oct", sales: 78, revenue: 1950, profit: 780 },
        { month: "Nov", sales: 82, revenue: 2050, profit: 820 },
        { month: "Dec", sales: 92, revenue: 2300, profit: 920 },
    ];

    // Sample inventory data
    const inventoryData = {
        inStock: 156,
        onOrder: 250,
        reorderPoint: 100,
        leadTime: "15 days",
        supplier: "Tech Wholesale Inc.",
        unitCost: 32.5,
        totalInventoryValue: 5070,
    };

    // Sample product-specific suggestions
    const productSuggestions = suggestions.filter((s) => s.category === "Inventory" || s.category === "Marketing");

    // Calculate month-over-month growth
    const lastMonth = salesHistory[salesHistory.length - 1];
    const previousMonth = salesHistory[salesHistory.length - 2];
    const salesGrowth = ((lastMonth.sales - previousMonth.sales) / previousMonth.sales) * 100;
    const revenueGrowth = ((lastMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;

    return (
        <div className="space-y-6">
            {/* Product Overview Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <p className="text-muted-foreground">Product ID: {product.id}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Edit Product</Button>
                    <Button>Manage Inventory</Button>
                </div>
            </div>

            {/* Product Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Revenue</CardDescription>
                        <CardTitle className="text-2xl flex items-center justify-between">
                            ${product.revenue.toLocaleString()}
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
                        <CardDescription>Total Profit</CardDescription>
                        <CardTitle className="text-2xl flex items-center justify-between">
                            ${product.profit.toLocaleString()}
                            <TrendingUp className="h-5 w-5 text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-xs text-muted-foreground">
                            <span className={`flex items-center ${salesGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                                {salesGrowth >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                                {Math.abs(salesGrowth).toFixed(1)}%
                            </span>
                            <span className="ml-1">from previous month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Profit Margin</CardDescription>
                        <CardTitle className="text-2xl flex items-center justify-between">
                            {product.margin.toFixed(1)}%
                            <BarChart3 className="h-5 w-5 text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">Category average: 35.2%</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>In Stock</CardDescription>
                        <CardTitle className="text-2xl flex items-center justify-between">
                            {inventoryData.inStock}
                            <Tag className="h-5 w-5 text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">{inventoryData.onOrder} units on order</div>
                    </CardContent>
                </Card>
            </div>

            {/* Detailed Analysis Tabs */}
            <Tabs defaultValue="sales">
                <TabsList className="mb-4">
                    <TabsTrigger value="sales">Sales Performance</TabsTrigger>
                    <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
                </TabsList>

                <TabsContent value="sales" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Sales Performance</CardTitle>
                            <CardDescription>Sales, revenue, and profit trends over the past 12 months</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesHistory} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip formatter={(value, name) => [name === "sales" ? value : `$${value}`, name]} />
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="sales" name="Units Sold" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke="#82ca9d" />
                                    <Line yAxisId="right" type="monotone" dataKey="profit" name="Profit" stroke="#ffc658" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="inventory" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Inventory Management</CardTitle>
                            <CardDescription>Track current stock levels and inventory metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">In Stock</p>
                                            <p className="text-xl font-bold">{inventoryData.inStock} units</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">On Order</p>
                                            <p className="text-xl font-bold">{inventoryData.onOrder} units</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Reorder Point</p>
                                            <p className="text-xl font-bold">{inventoryData.reorderPoint} units</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Lead Time</p>
                                            <p className="text-xl font-bold">{inventoryData.leadTime}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Unit Cost</p>
                                            <p className="text-xl font-bold">${inventoryData.unitCost.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground mb-1">Inventory Value</p>
                                            <p className="text-xl font-bold">${inventoryData.totalInventoryValue.toLocaleString()}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <p className="font-medium">Supplier Information</p>
                                        <p className="text-sm text-muted-foreground mt-1">{inventoryData.supplier}</p>
                                    </div>
                                </div>

                                <div className="h-[240px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={[
                                                { name: "Current Stock", value: inventoryData.inStock },
                                                { name: "On Order", value: inventoryData.onOrder },
                                                { name: "Reorder Point", value: inventoryData.reorderPoint },
                                                { name: "Safety Stock", value: Math.round(inventoryData.reorderPoint * 0.5) },
                                            ]}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="value" fill="hsl(var(--primary))" name="Units" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4">
                            <div className="flex items-start space-x-2 text-sm">
                                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                                <p className="text-muted-foreground">
                                    Current stock level is {inventoryData.inStock > inventoryData.reorderPoint ? "above" : "below"} the reorder point.
                                    {inventoryData.inStock < inventoryData.reorderPoint && " Consider placing an order soon."}
                                </p>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="suggestions" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {productSuggestions.map((suggestion) => (
                            <InsightCard
                                key={suggestion.id}
                                title={suggestion.title}
                                description={suggestion.description}
                                icon={<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-primary">💡</div>}
                                badgeText={`Save $${suggestion.impact}`}
                                badgeVariant={
                                    suggestion.difficulty === "easy" ? "default" : suggestion.difficulty === "medium" ? "secondary" : "outline"
                                }
                                footer={
                                    <div className="text-sm flex items-center text-muted-foreground">
                                        <span>Difficulty: {suggestion.difficulty}</span>
                                    </div>
                                }
                            />
                        ))}

                        <InsightCard
                            title="Bundle Opportunity"
                            description={`Consider bundling ${product.name} with complementary products to increase average order value by 25%.`}
                            icon={
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-[hsl(var(--profit))]">📈</div>
                            }
                            badgeText="High Impact"
                            badgeVariant="outline"
                        />

                        <InsightCard
                            title="Price Optimization"
                            description={`Testing a 10% price increase could improve profit margins with minimal impact on sales volume.`}
                            icon={<div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">💰</div>}
                            badgeText="Medium Impact"
                            badgeVariant="secondary"
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
