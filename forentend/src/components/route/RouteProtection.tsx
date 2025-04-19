import { postApi } from "@/Api";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export type routeProtectionType = {
    children: any;
    openFor?: 1 | 2;
    needValidation?: boolean;
};

function RouteProtection({ children, openFor, needValidation }: routeProtectionType) {
    const navigate = useNavigate();
    const [showProtected, setShowProtected] = useState(false);

    useEffect(() => {
        if (!window.localStorage.accessToken) {
            return navigate("/login");
        }
        return setShowProtected(true);
    }, []);

    if (!window.localStorage.accessToken) {
        return <Navigate to="/login" />;
    }

    if (showProtected == false) {
        <Navigate to="/" />;
        return;
    }
    if (showProtected) {
        return children;
    }
}

export default RouteProtection;

export const colorMap: any = {
    1: "#00d188",
    2: "#eb8015",
};
