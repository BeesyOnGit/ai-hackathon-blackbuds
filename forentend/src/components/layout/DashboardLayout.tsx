import React, { useEffect, useState } from "react";
import { ShoppingBag, Search, Heart, ShoppingCart, User, ChartBarIcon, Package, Gift, Tags, DollarSignIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StoreLayoutProps {
    children: React.ReactNode;
}

export function DashboardLayout({ children }: StoreLayoutProps) {
    const [route, setRoute] = useState<string>("/");

    const navigate = useNavigate();
    useEffect(() => {
        setRoute(window.location.pathname);
    }, [window.location.pathname]);

    const selectClassMap = {
        true: "flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium cursor-pointer",
        false: "flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600 cursor-pointer",
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-4">
                <div className="flex items-center gap-3 mb-8">
                    <DollarSignIcon className="h-8 w-8 text-primary" />
                    <h2 className="text-xl font-bold">Profit Pilot</h2>
                </div>

                <nav className="space-y-1">
                    <div
                        onClick={() => {
                            navigate("/");
                        }}
                        className={selectClassMap[`${route == "/"}`]}
                    >
                        <Package className="h-5 w-5" />
                        <span>Home</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/product");
                        }}
                        className={selectClassMap[`${route == "/product"}`]}
                    >
                        <Tags className="h-5 w-5" />
                        <span>Products</span>
                    </div>
                    <div
                        onClick={() => {
                            navigate("/forcast");
                        }}
                        className={selectClassMap[`${route == "/forcast"}`]}
                    >
                        <ChartBarIcon className="h-5 w-5" />
                        <span>Forcasting</span>
                    </div>

                    <div
                        onClick={() => {
                            navigate("/account");
                        }}
                        className={selectClassMap[`${route == "/account"}`]}
                    >
                        <User className="h-5 w-5" />
                        <span>Account</span>
                    </div>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-800">Profit Pilot</h1>
                        {/* <div className="flex items-center gap-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="py-2 pl-10 pr-4 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                            <button className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100">
                                <Heart className="h-6 w-6" />
                            </button>
                            <button className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100">
                                <ShoppingCart className="h-6 w-6" />
                                <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center bg-primary text-white text-xs rounded-full">
                                    3
                                </span>
                            </button>
                        </div> */}
                    </div>
                </header>
                <main className="p-6 overflow-y-scroll overflow-x-hidden h-[90vh]">{children}</main>
            </div>
        </div>
    );
}
