import { postApi } from "@/Api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toast } from "@/components/ui/toast";
import { ToastProvider } from "@radix-ui/react-toast";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [log, setLog] = useState<any>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (window.localStorage.accessToken) {
            return navigate("/");
        }
    }, []);

    const onChange = (e) => {
        const { target } = e;
        const { value, name } = target;
        setLog((login) => ({ ...login, [name]: value }));
    };
    const loginFunction = async () => {
        try {
            if (!log.username || !log.password) {
                return;
            }
            // const RegisterPayload = { ...log, password2: log.password, first_name: "fn", last_name: "ln", username: "username" };
            const logniPayload = { ...log };
            // const register = await postApi({ endpoint: "/api/auth/register", payload: RegisterPayload });
            // console.log("🚀 ~ file: Login.tsx:25 ~ loginFunction ~ res:", register);,
            const loginReq = await postApi({ endpoint: "/api/auth/login", payload: logniPayload });
            const { error, data } = loginReq;
            const { access, refresh } = data;
            if (access) {
                window.localStorage.setItem("accessToken", access);
                navigate("/");
                window.location.reload();
            }
        } catch (error) {
            console.log("🚀 ~ file: Login.tsx:19 ~ loginFunction ~ error:", error);
        }
    };

    return (
        <div className="w-[100vw] h-[100vh] overflow-hidden flex justify-center items-center bg-gray-100">
            <Card className="w-60% h-60% px-14 py-8 bg-white flex flex-col justify-center items-center gap-4">
                <Label className="py-6 text-xl"> Login</Label>
                <div className="space-y-2">
                    <Label className="capitalize">Username</Label>
                    <Input onChange={onChange} type="text" value={log.Username} name="username" placeholder="username" />
                </div>
                <div className="space-y-2">
                    <Label className="capitalize">password</Label>
                    <Input onChange={onChange} type="password" value={log.password} name="password" placeholder="mail@company.com" />
                </div>
                <Button
                    variant="outline"
                    className="capitalize flex justify-center items-center"
                    onClick={() => {
                        loginFunction();
                    }}
                >
                    <span className="capitalize flex justify-center items-center"> Login </span>
                </Button>
            </Card>
        </div>
    );
}

export default Login;
