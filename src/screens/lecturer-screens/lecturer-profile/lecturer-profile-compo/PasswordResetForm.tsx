import { useState } from "react";
import { toast } from "sonner";
import { Ban, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PasswordFormData } from "@/types/lecturer";
import { passwordSchema } from "@/lib/validation";
import { useChangePasswordMutation } from "@/redux/query/lecturer-profile";

// ✅ Zod schema for password validation

const PasswordResetForm: React.FC = () => {
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [id]: value }));
  };

  const handleChangePassword = async (data: PasswordFormData) => {
    const result = passwordSchema.safeParse(data);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message;
      toast.error(firstError || "Invalid input");
      return;
    }

    const toastId = toast.loading("Changing password...");

    try {
      await changePassword(data).unwrap();
      toast.success("Password changed successfully!", { id: toastId });

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password", {
        id: toastId,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your account password. Make sure to use a strong, unique
          password.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Current Password</Label>
            <Input
              id="oldPassword"
              type="password"
              value={passwordData.oldPassword}
              onChange={handleChange}
              disabled={isChangingPassword}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handleChange}
              disabled={isChangingPassword}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              disabled={isChangingPassword}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            disabled={isChangingPassword}
            onClick={() =>
              setPasswordData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
              })
            }
          >
            <Ban className="mr-2 h-4 w-4" />
            Cancel
          </Button>

          <Button
            disabled={isChangingPassword}
            onClick={() => handleChangePassword(passwordData)}
          >
            <KeyRound className="mr-2 h-4 w-4" />
            {isChangingPassword ? "Changing..." : "Change Password"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PasswordResetForm;
