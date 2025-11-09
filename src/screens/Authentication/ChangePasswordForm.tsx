import PasswordInput from "@/components/ui-components/PasswordInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ChangePasswordSchema } from "@/lib/validation";
import {
  useChangePasswordMutation,
  type ChangePasswordFormProps,
} from "@/redux/query/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "@/layout/AuthLayout";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatch-hooks";
import { setAuth } from "@/redux/slices/auth";
import { useState } from "react";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  console.log("User in ChangePasswordForm:", user);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePasswordFormProps>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = async (values: ChangePasswordFormProps) => {
    const toastId = toast.loading("Changing password...");
    try {
      const response = await changePassword(values).unwrap();

      if (response.success) {
        toast.success("Password changed successfully!", { id: toastId });
        dispatch(setAuth({ token, user, nextStep: "dashboard" }));
        navigate("/dashboard");
      } else {
        toast.error(response.message || "Password change failed", {
          id: toastId,
        });
      }
    } catch (error) {
      const errorMessage = (error as any)?.data?.msg;
      setErrorMsg(errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <AuthLayout
      title="Create New Password"
      description={`Welcome, ${user?.name}. For security, you must change your default password.`}
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {errorMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Password Change Failed</AlertTitle>
            <AlertDescription className="text-red-500">
              {errorMsg}
            </AlertDescription>
          </Alert>
        )}
        <PasswordInput
          id="currentPassword"
          label="Current Password"
          control={control}
          error={errors.currentPassword?.message}
          autoComplete="current-password"
        />
        <PasswordInput
          id="newPassword"
          label="New Password"
          control={control}
          error={errors.newPassword?.message}
          autoComplete="new-password"
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          control={control}
          error={errors.confirmPassword?.message}
          autoComplete="new-password"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Set New Password
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ChangePasswordForm;
