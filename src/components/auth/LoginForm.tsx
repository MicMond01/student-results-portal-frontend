// src/components/auth/LoginForm.tsx
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/FormInput";
import { Separator } from "@/components/ui/separator";
import { SocialButton } from "./SocialButton";
import type { LoginFormValues } from "@/types/auth";
import { useGetTestRouteQuery } from "@/redux/query/auth";

export const LoginForm: React.FC = () => {
  const { data: testData } = useGetTestRouteQuery();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = (values: LoginFormValues) => {
    // For now: just log to console

    console.log("Login submit:", values);
  };

  const email = watch("email");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-[#9391a7]">Welcome back</h1>
        <p className="text-sm text-[#4a3f85]">Please sign in to continue.</p>
      </div>

      <FormInput
        name="email"
        label="Email"
        placeholder="you@example.com"
        control={control}
        error={errors.email?.message}
      />

      <FormInput
        name="password"
        label="Password"
        placeholder="Enter your password"
        type="password"
        control={control}
        error={errors.password?.message}
      />

      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 cursor-pointer bg-[#7371fc] hover:bg-[#6b67f0] text-white"
        >
          {isSubmitting ? "Signing in..." : "Log in"}
        </Button>
        {testData && (
          <p className="text-green-600">
            Backend connected ✅ — {testData.data}
          </p>
        )}

        <button
          type="button"
          className="text-sm text-[#2b2653] hover:text-[#7371fc] transition-colors"
          onClick={() => console.log("Forgot password clicked for:", email)}
        >
          Forgot password?
        </button>
      </div>

      <div className="flex items-center gap-3">
        <Separator className="flex-1 bg-white/40" />

        <span className="text-xs text-[#4a3f85]">or</span>
        <Separator className="flex-1 bg-white/40" />
      </div>

      <SocialButton onClick={() => console.log("Google login clicked")}>
        <div className="flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.7 32.3 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c10 0 19-7.3 19-20 0-1.2-.1-2.5-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 16 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.3 29.6 4 24 4 16.1 4 9.2 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.4-5.3L31.3 33C29.3 34.6 26.8 35.5 24 35.5c-5.3 0-9.7-3.7-11.3-8.5l-6.5 5C9.2 39.7 16.1 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.2-3.4 5.8-6.3 7.5l6.1 5.6C37.3 38.8 40 33.9 40 28c0-1.2-.1-2.5-.4-3.5z"
            />
          </svg>
          <span>Log in with Google</span>
        </div>
      </SocialButton>

      <div className="pt-2 text-center text-sm text-[#2b2653]">
        Don’t have an account?{" "}
        <button
          type="button"
          className="font-medium text-[#7371fc] hover:text-[#6b67f0] underline-offset-4 hover:underline"
          onClick={() => console.log("Register clicked")}
        >
          Register
        </button>
      </div>
    </form>
  );
};
