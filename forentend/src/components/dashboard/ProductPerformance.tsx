
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, TrendingUp, AlertCircle } from "lucide-react";
import { ExpenseBreakdown } from "@/components/dashboard/ExpenseBreakdown";

interface ProductPerformanceProps {
  productData: {
    bestSellers: Array<{
      id: number;
      name: string;
      revenue: number;
      profit: number;
      margin: number;
    }>;
    worstPerformers: Array<{
      id: number;
      name: string;
      revenue: number;
      profit: number;
      margin: number;
    }>;
    categories: Record<string, number>;
  };
}

export function ProductPerformance({ productData }: ProductPerformanceProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Best Sellers */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-500" />
            Best Performing Products
          </CardTitle>
          <CardDescription>
            Products with highest revenue and profit margin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productData.bestSellers.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/10">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <div className="flex items-center mt-1 text-sm">
                    <Badge variant="outline" className="mr-2">
                      ${product.revenue.toLocaleString()}
                    </Badge>
                    <span className="text-green-500 flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {product.margin.toFixed(1)}% margin
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Profit</div>
                  <div className="font-medium">${product.profit.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>These products contribute 31% of your total revenue.</p>
          </div>
        </CardContent>
      </Card>

      {/* Worst Performers */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-destructive" />
            Underperforming Products
          </CardTitle>
          <CardDescription>
            Products with low revenue or profit margin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {productData.worstPerformers.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-accent/10">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  <div className="flex items-center mt-1 text-sm">
                    <Badge variant="outline" className="mr-2">
                      ${product.revenue.toLocaleString()}
                    </Badge>
                    <span className="text-red-500 flex items-center">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      {product.margin.toFixed(1)}% margin
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Profit</div>
                  <div className="font-medium">${product.profit.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Consider discontinuing or repricing these products to improve overall profitability.</p>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Product Categories</CardTitle>
          <CardDescription>
            Distribution of products by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ExpenseBreakdown categoryData={productData.categories} />
        </CardContent>
      </Card>

      {/* Optimization Suggestions */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Product Optimization Recommendations</CardTitle>
          <CardDescription>AI-generated suggestions to improve product performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-md bg-primary/5">
            <h3 className="font-medium mb-2">Inventory Rebalancing</h3>
            <p className="text-sm text-muted-foreground">
              Reduce inventory of low-margin items like USB Cables by 30% and increase stock of high-margin Wireless Earbuds by 15% to optimize warehouse space and capital allocation.
            </p>
          </div>
          
          <div className="p-4 border rounded-md bg-primary/5">
            <h3 className="font-medium mb-2">Bundle Opportunities</h3>
            <p className="text-sm text-muted-foreground">
              Create product bundles combining your best-selling Smart Watch with underperforming Phone Cases to increase average order value and clear slow-moving inventory.
            </p>
          </div>
          
          <div className="p-4 border rounded-md bg-primary/5">
            <h3 className="font-medium mb-2">Price Optimization</h3>
            <p className="text-sm text-muted-foreground">
              Testing shows that increasing the Kitchen Blender price by 8% would not significantly impact sales volume while increasing profit margin from 44.1% to 48.2%.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
