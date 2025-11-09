import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layout/AuthLayout";
import { VerificationSchema } from "@/lib/validation";
import {
  useVerifyIdentityMutation,
  type AuthVerificationForm,
} from "@/redux/query/auth";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/shared/FormInput";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatch-hooks";
import { setAuth } from "@/redux/slices/auth";
import { useState } from "react";

const VerificationForm = () => {
  const [loggedinUser, { isLoading }] = useVerifyIdentityMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthVerificationForm>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: { dateOfBirth: "", phone: "", jambNo: "" },
    mode: "onChange",
  });

  const submitHandler = async (values: AuthVerificationForm) => {
    const payload = {
      ...values,
      dateOfBirth: new Date(values.dateOfBirth).toISOString().split("T")[0],
    };
    const toastId = toast.loading("Verifying identity...");

    try {
      const response = await loggedinUser(payload).unwrap();

      if (response.success) {
        dispatch(setAuth({ token, nextStep: "change-password" }));
        navigate("/change-password");
        toast.success("Identity verified successfully!", { id: toastId });
      }
    } catch (error) {
      const errorMessage = (error as any)?.data?.msg;
      setErrorMsg(errorMessage);
      toast.error(errorMessage, { id: toastId });
    }
  };

  return (
    <AuthLayout
      title="Verify Your Identity"
      description={`Welcome, ${loggedinUser?.name}! Please provide the following details to activate your account.`}
    >
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        {errorMsg && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription className="text-red-500">
              {errorMsg}
            </AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <FormInput
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            control={control}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-destructive">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <FormInput
            name="phone"
            label="Phone Number"
            placeholder="Phone number on file"
            control={control}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <FormInput
            name="jambNo"
            label="JAMB/Matriculation No."
            placeholder="Your JAMB or Matric No."
            control={control}
          />
          {errors.jambNo && (
            <p className="text-sm text-destructive">{errors.jambNo.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify Account
        </Button>
      </form>
    </AuthLayout>
  );
};

export default VerificationForm;
