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
import { normalizeNigerianPhone } from "@/utils/normalizeNigerianPhone";

const VerificationForm = () => {
  const [loggedinUser, { isLoading }] = useVerifyIdentityMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);

  const dynamicVerificationSchema = VerificationSchema.superRefine(
    (data, ctx) => {
      if (
        user?.role === "student" &&
        (!data.jambNo || data.jambNo.length < 10)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["jambNo"],
          message: "JAMB No. must be at least 10 characters",
        });
      }

      if (
        user?.role === "lecturer" &&
        (!data.staffId || data.staffId.length < 6)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["staffId"],
          message: "Staff ID must be at least 6 characters",
        });
      }
    }
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthVerificationForm>({
    resolver: zodResolver(dynamicVerificationSchema),
    defaultValues: {
      dateOfBirth: "",
      phone: "",
      jambNo: "",
      staffId: "",
    },
    mode: "onChange",
  });

  const submitHandler = async (values: AuthVerificationForm) => {
    console.log(values);
    const normalizedPhone = normalizeNigerianPhone(values.phone);
    if (!normalizedPhone) {
      setErrorMsg(
        "Please enter a valid Nigerian phone number (e.g., 07027323037 or +2347027323037)"
      );
      toast.error("Invalid phone number format", { duration: 3000 });
      return;
    }

    const payload = {
      ...values,
      phone: normalizedPhone,
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
    } catch (error: any) {
      const message = error?.data?.msg || error?.data?.message;
      setErrorMsg(message);
      toast.error(message, { id: toastId });
      console.log(message);
    }
  };

  return (
    <AuthLayout
      title="Verify Your Identity"
      description={`Welcome, ${user?.name}! Please provide the following details to activate your account.`}
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
            placeholder="e.g., 07027323037 or +234 702 732 3037"
            control={control}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <FormInput
            name={user?.role === "student" ? "jambNo" : "staffId"}
            label={user?.role === "student" ? "JAMB No." : "Staff ID"}
            placeholder={user?.role === "student" ? "JAMB No." : "Staff ID"}
            control={control}
          />
          {user?.role === "student"
            ? errors.jambNo && (
                <p className="text-sm text-destructive">
                  {errors.jambNo.message}
                </p>
              )
            : errors.staffId && (
                <p className="text-sm text-destructive">
                  {errors.staffId.message}
                </p>
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
