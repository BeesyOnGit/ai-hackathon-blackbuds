
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, PercentIcon, DollarSign, BarChart3, PieChart } from "lucide-react";

export function ProfitCalculator() {
  // Product pricing calculator state
  const [productCost, setProductCost] = useState<string>("10");
  const [shippingCost, setShippingCost] = useState<string>("2");
  const [marketingCost, setMarketingCost] = useState<string>("1.5");
  const [desiredMargin, setDesiredMargin] = useState<string>("40");
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [actualMargin, setActualMargin] = useState<string>("");

  // Bulk order calculator state
  const [bulkQuantity, setBulkQuantity] = useState<string>("100");
  const [unitPrice, setUnitPrice] = useState<string>("15");
  const [discountRate, setDiscountRate] = useState<string>("10");
  const [additionalCosts, setAdditionalCosts] = useState<string>("200");
  const [bulkTotalCost, setBulkTotalCost] = useState<string>("");
  const [bulkUnitCost, setBulkUnitCost] = useState<string>("");
  const [bulkSavings, setBulkSavings] = useState<string>("");

  // Calculate optimal selling price based on costs and desired margin
  const calculateSellingPrice = () => {
    const totalCost = parseFloat(productCost) + parseFloat(shippingCost) + parseFloat(marketingCost);
    const margin = parseFloat(desiredMargin) / 100;
    
    // Formula: selling price = total cost / (1 - desired margin)
    const price = totalCost / (1 - margin);
    setSellingPrice(price.toFixed(2));
    
    // Calculate actual margin based on rounded selling price
    const actualMarginVal = ((price - totalCost) / price) * 100;
    setActualMargin(actualMarginVal.toFixed(2));
  };

  // Calculate bulk order costs and savings
  const calculateBulkOrder = () => {
    const quantity = parseInt(bulkQuantity);
    const price = parseFloat(unitPrice);
    const discount = parseFloat(discountRate) / 100;
    const additional = parseFloat(additionalCosts);
    
    const regularTotal = quantity * price;
    const discountedTotal = regularTotal * (1 - discount) + additional;
    
    setBulkTotalCost(discountedTotal.toFixed(2));
    setBulkUnitCost((discountedTotal / quantity).toFixed(2));
    setBulkSavings((regularTotal - discountedTotal + additional).toFixed(2));
  };

  return (
    <Tabs defaultValue="pricing">
      <TabsList className="mb-4">
        <TabsTrigger value="pricing" className="flex items-center">
          <DollarSign className="w-4 h-4 mr-2" /> Product Pricing
        </TabsTrigger>
        <TabsTrigger value="bulk" className="flex items-center">
          <BarChart3 className="w-4 h-4 mr-2" /> Bulk Order
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="pricing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5" />
                Pricing Calculator
              </CardTitle>
              <CardDescription>
                Calculate optimal selling price based on costs and desired profit margin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-cost">Product Cost ($)</Label>
                <Input
                  id="product-cost"
                  type="number"
                  step="0.01"
                  value={productCost}
                  onChange={(e) => setProductCost(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping-cost">Shipping Cost ($)</Label>
                <Input
                  id="shipping-cost"
                  type="number"
                  step="0.01"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="marketing-cost">Marketing Cost ($)</Label>
                <Input
                  id="marketing-cost"
                  type="number"
                  step="0.01"
                  value={marketingCost}
                  onChange={(e) => setMarketingCost(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desired-margin">Desired Profit Margin (%)</Label>
                <Input
                  id="desired-margin"
                  type="number"
                  min="1"
                  max="99"
                  value={desiredMargin}
                  onChange={(e) => setDesiredMargin(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={calculateSellingPrice} className="w-full">
                Calculate
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing Results</CardTitle>
              <CardDescription>
                Recommended selling price and profit details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {sellingPrice ? (
                <>
                  <div className="rounded-lg bg-primary/10 p-4">
                    <div className="text-sm font-medium text-muted-foreground">Recommended Selling Price</div>
                    <div className="mt-1 text-3xl font-bold">${sellingPrice}</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Total Cost</div>
                      <div className="text-xl font-medium">
                        ${(parseFloat(productCost) + parseFloat(shippingCost) + parseFloat(marketingCost)).toFixed(2)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Profit per Item</div>
                      <div className="text-xl font-medium">
                        ${(parseFloat(sellingPrice) - parseFloat(productCost) - parseFloat(shippingCost) - parseFloat(marketingCost)).toFixed(2)}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Actual Profit Margin</div>
                      <div className="text-xl font-medium">{actualMargin}%</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center text-muted-foreground">
                  <PercentIcon className="w-12 h-12 mb-4" />
                  <p>Enter your product costs and desired margin, then click calculate to see the recommended selling price</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="bulk">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Bulk Order Calculator
              </CardTitle>
              <CardDescription>
                Calculate cost savings for bulk orders with volume discounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bulk-quantity">Order Quantity</Label>
                <Input
                  id="bulk-quantity"
                  type="number"
                  min="1"
                  value={bulkQuantity}
                  onChange={(e) => setBulkQuantity(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit-price">Regular Unit Price ($)</Label>
                <Input
                  id="unit-price"
                  type="number"
                  step="0.01"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount-rate">Bulk Discount Rate (%)</Label>
                <Input
                  id="discount-rate"
                  type="number"
                  min="0"
                  max="100"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="additional-costs">Additional Fixed Costs ($)</Label>
                <Input
                  id="additional-costs"
                  type="number"
                  step="0.01"
                  value={additionalCosts}
                  onChange={(e) => setAdditionalCosts(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={calculateBulkOrder} className="w-full">
                Calculate
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bulk Order Results</CardTitle>
              <CardDescription>
                Cost breakdown and savings for bulk purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {bulkTotalCost ? (
                <>
                  <div className="rounded-lg bg-primary/10 p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Bulk Order Cost</div>
                    <div className="mt-1 text-3xl font-bold">${bulkTotalCost}</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">New Unit Cost</div>
                      <div className="text-xl font-medium">${bulkUnitCost}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Cost Savings</div>
                      <div className="text-xl font-medium text-green-600">${bulkSavings}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Savings Percentage</div>
                      <div className="text-xl font-medium">
                        {((parseFloat(bulkSavings) / (parseInt(bulkQuantity) * parseFloat(unitPrice))) * 100).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center text-muted-foreground">
                  <PieChart className="w-12 h-12 mb-4" />
                  <p>Enter your bulk order details and click calculate to see cost savings</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}
