// src/components/auth/LoginForm.tsx
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/shared/FormInput";
import { Separator } from "@/components/ui/separator";
import type { LoginFormValues } from "@/types/auth";
import { useLoginMutation } from "@/redux/query/auth";
import { setAuth } from "@/redux/slices/auth";
import { useAppDispatch } from "@/lib/hooks/dispatch-hooks";

export const LoginForm: React.FC = () => {
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (values: LoginFormValues) => {
    const result = await login(values);

    if (result.data?.token) {
      dispatch(setAuth({ token: result.data.token, user: result.data.user }));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-[#9391a7]">Welcome back</h1>
        <p className="text-sm text-[#4a3f85]">Please sign in to continue.</p>
      </div>

      <FormInput
        name="identifier"
        label="Email"
        placeholder="you@example.com"
        control={control}
        error={errors.identifier?.message}
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
          aria-busy={isLoading}
        >
          {isSubmitting ? "Signing in..." : "Log in"}
        </Button>
        {isError && (
          <p className="text-sm text-red-500">
            "Login failed. Please try again."
          </p>
        )}
      </div>

      <button
        type="button"
        className="text-sm text-[#2b2653] hover:text-[#7371fc] transition-colors"
        onClick={() => console.log("Forgot password clicked for:")}
      >
        Forgot password?
      </button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1 bg-white/40" />

        <span className="text-xs text-[#4a3f85]">or</span>
        <Separator className="flex-1 bg-white/40" />
      </div>

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
