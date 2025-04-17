import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ProductList } from "./pages/ProductList";
import { SalesForecast } from "./pages/SalesForecast";
import { useState } from "react";
import NewUserConfig from "./pages/NewUserConfig";

const App = () => {
    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden box-border bg-transparent">
            <button
                onClick={() => {
                    setIsNewUser(!isNewUser);
                }}
            >
                change
            </button>
            {isNewUser ? (
                <NewUserConfig />
            ) : (
                <DashboardLayout>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/product" element={<ProductList />} />
                        <Route path="/forcast" element={<SalesForecast />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </DashboardLayout>
            )}
        </div>
    );
};

export default App;
