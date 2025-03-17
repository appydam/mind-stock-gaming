
"use client"; // Required for Next.js Client Components

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // For Next.js: use 'next/link' and 'useRouter'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Home } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
    const navigate = useNavigate(); // For Next.js: useRouter from 'next/router'
    const [formData, setFormData] = useState({
        emailId: "",
        phoneNo: "",
        password: "",
    });
    const [loginMethod, setLoginMethod] = useState("email");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Check if already logged in
    useEffect(() => {
        const checkLoginStatus = () => {
            const hasCookie = document.cookie.split(';').some(item => item.trim().startsWith('stockplay='));
            if (hasCookie) {
                navigate('/');
            }
        };

        checkLoginStatus();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const loginData = {
                username: loginMethod === "email" ? formData.emailId : formData.phoneNo,
                password: formData.password,
            };

            const response = await fetch("http://localhost:8082/authenticateUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loginData),
                credentials: "include", // Include credentials to set/send cookies
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                // Cookie 'stockplay' is set by backend, no need to manage it here
                localStorage.setItem("userName", JSON.stringify(data.data.name));
                localStorage.setItem("userEmail", JSON.stringify(data.data.emailId));
                localStorage.setItem("userAge", JSON.stringify(data.data.age));
                localStorage.setItem("userPhone", JSON.stringify(data.data.phoneNo));
                localStorage.setItem("userUsername", JSON.stringify(data.data.username));

                toast({
                    title: "Login successful",
                    description: `Welcome back, ${data.data.name}!`,
                    variant: "default",
                });

                navigate("/"); // For Next.js: router.push('/')
            } else {
                setError(data.message || "Login failed");
            }
        } catch (error) {
            setError("Failed to connect to server. Please ensure the backend is running.");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="text-red-500 text-sm p-2 bg-red-100 rounded">
                                {error}
                            </div>
                        )}
                        <div className="flex space-x-4 mb-4">
                            <Button
                                type="button"
                                variant={loginMethod === "email" ? "default" : "outline"}
                                onClick={() => setLoginMethod("email")}
                                className="flex-1"
                                disabled={isLoading}
                            >
                                Email
                            </Button>
                            <Button
                                type="button"
                                variant={loginMethod === "phone" ? "default" : "outline"}
                                onClick={() => setLoginMethod("phone")}
                                className="flex-1"
                                disabled={isLoading}
                            >
                                Phone
                            </Button>
                        </div>

                        {loginMethod === "email" ? (
                            <div className="space-y-2">
                                <Label htmlFor="emailId">Email</Label>
                                <Input
                                    id="emailId"
                                    name="emailId"
                                    type="email"
                                    value={formData.emailId}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label htmlFor="phoneNo">Phone Number</Label>
                                <Input
                                    id="phoneNo"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                        <div className="flex w-full justify-between">
                            <p className="text-sm text-muted-foreground">
                                Don’t have an account?{" "}
                                <Link to="/register" className="text-primary hover:underline">
                                    Register
                                </Link>
                            </p>
                            <Link to="/">
                                <Button
                                    variant="outline"
                                    className="rounded-full"
                                    disabled={isLoading}
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Return to Home
                                </Button>
                            </Link>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;
