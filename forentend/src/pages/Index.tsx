import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MerchantDashboard, ProductDetailView } from "@/components/dashboard";
import { ProfitCalculator } from "@/components/dashboard/ProfitCalculator";
import { Suggestion } from "@/data/sample-data";

const Index = () => {
    // Sample merchant financial data
    const financialData = {
        totalRevenue: 124500,
        totalCosts: 78200,
        netProfit: 46300,
        profitMargin: 37.2,
        monthlySales: [
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
        ],
    };

    // Sample product performance data
    const productData = {
        bestSellers: [
            { id: 1, name: "Wireless Earbuds", revenue: 15400, profit: 7200, margin: 46.8 },
            { id: 2, name: "Smart Watch", revenue: 12800, profit: 6100, margin: 47.7 },
            { id: 3, name: "Kitchen Blender", revenue: 10200, profit: 4500, margin: 44.1 },
        ],
        worstPerformers: [
            { id: 4, name: "Desk Lamp", revenue: 1200, profit: 240, margin: 20.0 },
            { id: 5, name: "Phone Case", revenue: 1800, profit: 450, margin: 25.0 },
            { id: 6, name: "USB Cable", revenue: 2100, profit: 630, margin: 30.0 },
        ],
        categories: {
            Electronics: 42,
            "Home & Kitchen": 27,
            Beauty: 15,
            Clothing: 18,
            Books: 8,
            Toys: 12,
        },
    };

    // Sample financial suggestions
    const financialSuggestions: Suggestion[] = [
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

    return (
        <Tabs defaultValue="dashboard">
            <TabsList className="mb-6">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="product-details">Product Details</TabsTrigger>
                <TabsTrigger value="calculator">Profit Calculator</TabsTrigger>
                <TabsTrigger value="forecast">Sales Forecast</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
                <MerchantDashboard financialData={financialData} suggestions={financialSuggestions} />
            </TabsContent>

            {/* <TabsContent value="products" className="space-y-6">
                <ProductList productData={productData} />
            </TabsContent> */}

            {/* <TabsContent value="product-details" className="space-y-6">
                <ProductDetailView product={productData.bestSellers[0]} suggestions={financialSuggestions} />
            </TabsContent> */}

            {/* <TabsContent value="calculator" className="space-y-6">
                <ProfitCalculator />
            </TabsContent> */}
            {/* 
            <TabsContent value="forecast" className="space-y-6">
                <SalesForecast salesData={financialData.monthlySales} />
            </TabsContent> */}
        </Tabs>
    );
};

export default Index;
