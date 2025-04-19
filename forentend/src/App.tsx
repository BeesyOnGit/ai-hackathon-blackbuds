import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ProductList } from "./pages/ProductList";
import { SalesForecast } from "./pages/SalesForecast";
import { useEffect, useState } from "react";
import NewUserConfig from "./pages/NewUserConfig";
import Login from "./pages/Login";
import RouteProtection from "./components/route/RouteProtection";
import { ProductDetailView } from "./components/dashboard";

const App = () => {
    const [isNewUser, setIsNewUser] = useState<boolean>(!window.localStorage.getItem("newUser"));
    const [isAuth, setIsAuth] = useState<boolean>(!!window.localStorage.getItem("accessToken"));

    useEffect(() => {
        if (!window.localStorage.newUser) {
            console.log("change user");

            window.localStorage.setItem("newUser", "true");
        }
        const handleStorageChange = () => {
            console.log(window.localStorage.getItem("newUser"));

            const token = window.localStorage.getItem("accessToken");
            // const newUser = Boolean(window.localStorage.getItem("newUser"));
            setIsAuth(!!token);
            // setIsNewUser(newUser);
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const routes = {
        1: (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <RouteProtection>
                            <Index />
                        </RouteProtection>
                    }
                />
                <Route
                    path="/product"
                    element={
                        <RouteProtection>
                            <ProductList />
                        </RouteProtection>
                    }
                />
                <Route
                    path="/forcast"
                    element={
                        <RouteProtection>
                            <SalesForecast />
                        </RouteProtection>
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <RouteProtection>
                            <ProductDetailView />
                        </RouteProtection>
                    }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        ),
        2: (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <RouteProtection>
                            <NewUserConfig />
                        </RouteProtection>
                    }
                />
                <Route
                    path="/product"
                    element={
                        <RouteProtection>
                            <ProductList />
                        </RouteProtection>
                    }
                />
                <Route
                    path="/forcast"
                    element={
                        <RouteProtection>
                            <SalesForecast />
                        </RouteProtection>
                    }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        ),
    };

    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden box-border bg-transparent">
            {!isAuth ? routes[2] : isNewUser ? routes[2] : <DashboardLayout> {routes[1]} </DashboardLayout>}
        </div>
    );
};

export default App;
