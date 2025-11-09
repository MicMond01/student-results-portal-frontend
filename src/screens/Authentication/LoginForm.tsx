import { FormInput } from "@/components/shared/FormInput";
import PasswordInput from "@/components/ui-components/PasswordInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layout/AuthLayout";
import { useAppDispatch } from "@/lib/hooks/dispatch-hooks";
import { LoginSchema } from "@/lib/validation";
import { useLoginMutation } from "@/redux/query/auth";
import { setAuth } from "@/redux/slices/auth";
import type { LoginFormValues } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { identifier: "", password: "" },
    mode: "onChange",
  });

  const submitHandler = async (values: LoginFormValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const result = await login(values).unwrap();

      if (result.token) {
        dispatch(
          setAuth({
            token: result.token,
            user: result.user,
            nextStep: result.nextStep,
          })
        );
      }
    } catch (error) {
      const errorMessage = (error as any)?.data?.msg;
      toast.error(errorMessage);
      setErrorMsg(errorMessage);
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  };
  return (
    <AuthLayout
      title="Welcome Back"
      description="Enter your credentials to access your account."
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {errorMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription className="text-red-500">
              {errorMsg}
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="identifier">
            Identifier (Email, Matric No, etc.)
          </Label>

          <FormInput
            name="identifier"
            label="Email"
            placeholder="e.g., 23000000001"
            control={control}
            error={errors.identifier?.message}
          />
        </div>
        <PasswordInput
          id="password"
          label="Password"
          control={control}
          error={errors.password?.message}
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
