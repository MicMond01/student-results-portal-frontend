import PasswordInput from "@/components/ui-components/PasswordInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layout/AuthLayout";
import { cn } from "@/lib/utils";
import { LoginSchema } from "@/lib/validation";
import type { LoginFormData } from "@/redux/query/auth";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<LoginFormData>({
    identifier: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store token
        localStorage.setItem("token", data.token);
        
        // Store user data
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Login successful!");

        // ✅ Navigate based on nextStep
        if (data.nextStep === "verification") {
          navigate("/verify-identity");
        } else if (data.nextStep === "change-password") {
          navigate("/change-password");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout
      title="Welcome Back"
      description="Enter your credentials to access your account."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {apiError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="identifier">
            Identifier (Email, Matric No, etc.)
          </Label>
          <Input
            id="identifier"
            placeholder="e.g., 23000000001"
            value={formData.identifier}
            onChange={handleChange}
            className={cn(errors.identifier && "border-destructive")}
          />
          {errors.identifier && (
            <p className="text-sm text-destructive">{errors.identifier}</p>
          )}
        </div>
        <PasswordInput
          id="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="current-password"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;
