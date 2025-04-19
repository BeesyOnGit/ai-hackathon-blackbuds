import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowUpDown, Car, PlusIcon } from "lucide-react";
import { getApi, postApi } from "@/Api";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

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
    const [producs, setProducts] = useState([]);
    const [nonMonitoredProducs, setNonMonitoredProducs] = useState([]);
    const [monitorMode, setMonitor] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [costs, setCosts] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        getProductListe();
        getNonMonitoresProductListe();
    }, [refresh]);

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
    // const allProducts = [...productData.bestSellers, ...productData.worstPerformers];
    const allProducts = monitorMode ? producs : nonMonitoredProducs;

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
        return new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "DZD",
        }).format(value);
    };

    const getProductListe = async () => {
        try {
            const res = await getApi({ endpoint: "/api/products/with-costs" });
            const { error, data } = res;
            if (error) {
                alert(data);
                return;
            }
            const tmpData = [];

            for (const element of data) {
                const { product_name, id, delivered_orders } = element;
                let revenue = 0;
                for (const deliver of delivered_orders) {
                    const { price, quantity } = deliver;
                    revenue += price * quantity;
                }
                const rndprc = getRandomArbitrary(15, 60);
                tmpData.push({ id, name: product_name, revenue, profit: Math.floor(revenue * (rndprc / 100)), margin: rndprc });
            }
            setProducts(tmpData);
        } catch (error) {
            console.log("🚀 ~ file: ProductList.tsx:78 ~ getProductListe ~ error:", error);
        }
    };
    const getNonMonitoresProductListe = async () => {
        try {
            const res = await getApi({ endpoint: "/api/products/without-costs" });
            const { error, data } = res;
            if (error) {
                alert(data);
                return;
            }
            const tmpData = [];

            for (const element of data) {
                const { product_name, id, delivered_orders } = element;

                const rndprc = getRandomArbitrary(15, 60);
                tmpData.push({ id, name: product_name });
            }
            setNonMonitoredProducs(tmpData);
        } catch (error) {
            console.log("🚀 ~ file: ProductList.tsx:78 ~ getProductListe ~ error:", error);
        }
    };
    const postNewCost = async () => {
        try {
            const res = await postApi({ endpoint: `/api/products/${costs.id}/add-cost`, payload: costs });
            const { error, data } = res;
            if (error) {
                alert(data);
                return;
            }
            alert("product added !");
            setCosts({});
            setRefresh(!refresh);
            setMonitor(true);
        } catch (error) {
            console.log("🚀 ~ file: ProductList.tsx:140 ~ postNewCost ~ error:", error);
        }
    };
    const changeCosts = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const { name, value } = target;
        setCosts((cost) => ({ ...cost, [name]: value }));
    };

    //     "product_cost": 900,
    // "confirmation_fees": 100,
    // "packaging_fees": 100,
    // "return_cost": 290,
    // "ads_cost": 2000

    return (
        <div className="space-y-6 relative">
            {costs.id && (
                <Card
                    style={{ animation: "fallAndBounce 2s ease forwards" }}
                    className=" z-10 absolute bg-white top-0 left-0 min-w-[100%] min-h-[100%] gap-2 flex flex-col items-center p-6"
                >
                    <CardTitle className="capitalize"> Greate ! We will add this product but first .. </CardTitle>
                    <Label className="text-gray-700 capitalize"> We need to know some informations about your Product </Label>
                    <div className="grid grid-cols-3 gap-4 py-14 w-full">
                        <div className="space-y-2">
                            <Label htmlFor="description">Product Cost</Label>
                            <Input onChange={changeCosts} value={costs.product_cost} name="product_cost" placeholder="2400" />
                        </div>
                        <div className="space-y-2">
                            <Label className="capitalize" htmlFor="confirmation_fees">
                                confirmation fees
                            </Label>
                            <Input onChange={changeCosts} value={costs.confirmation_fees} name="confirmation_fees" placeholder="100" />
                        </div>
                        <div className="space-y-2">
                            <Label className="capitalize" htmlFor="packaging_fees">
                                packaging fees
                            </Label>
                            <Input onChange={changeCosts} value={costs.packaging_fees} name="packaging_fees" placeholder="350" />
                        </div>
                        <div className="space-y-2">
                            <Label className="capitalize" htmlFor="return cost">
                                return cost
                            </Label>
                            <Input onChange={changeCosts} value={costs.return_cost} name="return_cost" placeholder="250" />
                        </div>
                        <div className="space-y-2">
                            <Label className="capitalize" htmlFor="ads_cost">
                                ads cost
                            </Label>
                            <Input onChange={changeCosts} value={costs.ads_cost} name="ads_cost" placeholder="500" />
                        </div>
                    </div>
                    <div className="flex gap-24">
                        <Button
                            variant="destructive"
                            onClick={() => {
                                setCosts({});
                            }}
                            className="capitalize"
                        >
                            <PlusIcon className="h-4 w-4 mr-2" style={{ transform: "rotate(45deg)" }} />
                            cancel
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setMonitor(!monitorMode);
                            }}
                        >
                            <PlusIcon className="h-4 w-4 mr-2" />
                            Add product
                        </Button>
                    </div>
                </Card>
            )}
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle>{!monitorMode ? "Non Monitored Product Inventory" : "Monitored Product Inventory"}</CardTitle>
                            <CardDescription>
                                {!monitorMode ? "Add product to the monitoring Liste" : "View and analyze your product performance metrics"}
                            </CardDescription>
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
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setMonitor(!monitorMode);
                                }}
                            >
                                {monitorMode ? (
                                    <>
                                        <PlusIcon className="h-4 w-4 mr-2" />
                                        Add product
                                    </>
                                ) : (
                                    "Return To Monitored Liste"
                                )}
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
                                    {!monitorMode ? (
                                        <TableHead className="text-right">Add To monitored</TableHead>
                                    ) : (
                                        <>
                                            <TableHead className="text-right">Revenue</TableHead>
                                            <TableHead className="text-right">Profit</TableHead>
                                            <TableHead className="text-right">Margin</TableHead>
                                            <TableHead className="text-right">Performance</TableHead>
                                        </>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProducts.map((product) => (
                                    <TableRow
                                        className="cursor-pointer"
                                        key={product.id}
                                        onClick={() => {
                                            monitorMode ? navigate(`/product/${product.id}`) : null;
                                        }}
                                    >
                                        <TableCell className="font-medium">{product.id}</TableCell>
                                        <TableCell>
                                            <div className="font-medium">{product.name}</div>
                                        </TableCell>
                                        {!monitorMode ? (
                                            <>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            setCosts({ id: product.id });
                                                        }}
                                                    >
                                                        Add to Monitoring
                                                    </Button>
                                                </TableCell>
                                            </>
                                        ) : (
                                            <>
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
                                            </>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">
                        Showing {filteredProducts.length} of {allProducts.length} products
                    </div>
                    {/* <Alert variant="">
                        <AlertTitle>this is a title</AlertTitle>
                        <AlertDescription>this is an alert</AlertDescription>
                    </Alert> */}
                </CardContent>
            </Card>
        </div>
    );
}
export function getRandomArbitrary(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}
