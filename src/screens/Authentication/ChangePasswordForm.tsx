import PasswordInput from "@/components/ui-components/PasswordInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import AuthLayout from "@/layout/AuthLayout";
import { ChangePasswordSchema } from "@/lib/validation";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

const ChangePasswordForm = () => {
  const { changePassword, isLoading, error: apiError, user } = useAuthStore();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const validation = ChangePasswordSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach(
        (err) => (fieldErrors[err.path[0]] = err.message)
      );
      setErrors(fieldErrors);
      return;
    }
    changePassword(validation.data);
  };

  return (
    <AuthLayout
      title="Create New Password"
      description={`Welcome, ${user?.name}. For security, you must change your default password.`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {apiError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Password Change Failed</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}
        <PasswordInput
          id="currentPassword"
          label="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
          autoComplete="current-password"
        />
        <PasswordInput
          id="newPassword"
          label="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          autoComplete="new-password"
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
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
