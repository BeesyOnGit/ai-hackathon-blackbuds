import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpDown } from "lucide-react";

interface Product {
    id: number;
    name: string;
    revenue: number;
    profit: number;
    margin: number;
}

interface ProductListProps {
    productData: {
        bestSellers: Product[];
        worstPerformers: Product[];
        categories: Record<string, number>;
    };
}

export function ProductList() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"name" | "revenue" | "profit" | "margin">("revenue");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");

    // Combine all products
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
    const allProducts = [...productData.bestSellers, ...productData.worstPerformers];

    // Filter and sort products
    const filteredProducts = allProducts
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            const multiplier = sortOrder === "asc" ? 1 : -1;
            return multiplier * (a[sortBy] > b[sortBy] ? 1 : -1);
        });

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle>Product Inventory</CardTitle>
                            <CardDescription>View and analyze your product performance metrics</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Search and filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="relative flex-grow">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {Object.keys(productData.categories).map((category) => (
                                        <SelectItem key={category} value={category.toLowerCase()}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button variant="outline" onClick={toggleSortOrder}>
                                <ArrowUpDown className="h-4 w-4 mr-2" />
                                {sortOrder === "asc" ? "Ascending" : "Descending"}
                            </Button>
                        </div>
                    </div>

                    {/* Products table */}
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[40px]">#</TableHead>
                                    <TableHead className="w-[250px]">Product</TableHead>
                                    <TableHead className="text-right">Revenue</TableHead>
                                    <TableHead className="text-right">Profit</TableHead>
                                    <TableHead className="text-right">Margin</TableHead>
                                    <TableHead className="text-right">Performance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.id}</TableCell>
                                        <TableCell>
                                            <div className="font-medium">{product.name}</div>
                                        </TableCell>
                                        <TableCell className="text-right">{formatCurrency(product.revenue)}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(product.profit)}</TableCell>
                                        <TableCell className="text-right">{product.margin.toFixed(1)}%</TableCell>
                                        <TableCell className="text-right">
                                            {product.margin > 40 ? (
                                                <Badge className="ml-auto bg-green-300">High Margin</Badge>
                                            ) : product.margin > 30 ? (
                                                <Badge className="ml-auto" variant="outline">
                                                    Medium
                                                </Badge>
                                            ) : (
                                                <Badge className="ml-auto bg-red-300">Low Margin</Badge>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                        Showing {filteredProducts.length} of {allProducts.length} products
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
