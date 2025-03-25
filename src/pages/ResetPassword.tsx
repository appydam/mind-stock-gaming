
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { BACKEND_HOST } from "@/constants/config";

const passwordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const ResetPassword = () => {
    const navigate = useNavigate();
    const userId = Number(JSON.parse(localStorage.getItem("userId")));
    //   const [searchParams] = useSearchParams();
    //   const token = searchParams.get("token") || "";

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error for this field when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const validateForm = () => {
        try {
            passwordSchema.parse(formData);
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path[0]] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const apiPath = BACKEND_HOST + 'updatePassword';

            const response = await fetch(apiPath, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    newPassword: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Password reset successfully");
                navigate("/login");
            } else {
                toast.error(data.message || "Password reset failed");
            }
        } catch (error) {
            toast.error("Failed to connect to server. Please try again later.");
            console.error("Error resetting password:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Reset Password</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default ResetPassword;
