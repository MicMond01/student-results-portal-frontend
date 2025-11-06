import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layout/AuthLayout";
import { cn } from "@/lib/utils";
import { VerificationSchema } from "@/lib/validation";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

const VerificationForm = () => {
  const { verifyIdentity, isLoading, error: apiError, user } = useAuthStore();
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    phone: "",
    jambNo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const validation = VerificationSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach(
        (err) => (fieldErrors[err.path[0]] = err.message)
      );
      setErrors(fieldErrors);
      return;
    }
    verifyIdentity(validation.data);
  };

  return (
    <AuthLayout
      title="Verify Your Identity"
      description={`Welcome, ${user?.name}! Please provide the following details to activate your account.`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {apiError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={cn(errors.dateOfBirth && "border-destructive")}
          />
          {errors.dateOfBirth && (
            <p className="text-sm text-destructive">{errors.dateOfBirth}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="Phone number on file"
            value={formData.phone}
            onChange={handleChange}
            className={cn(errors.phone && "border-destructive")}
          />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="jambNo">JAMB/Matriculation No.</Label>
          <Input
            id="jambNo"
            placeholder="Your JAMB or Matric No."
            value={formData.jambNo}
            onChange={handleChange}
            className={cn(errors.jambNo && "border-destructive")}
          />
          {errors.jambNo && (
            <p className="text-sm text-destructive">{errors.jambNo}</p>
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
