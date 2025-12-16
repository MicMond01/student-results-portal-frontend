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
import { Ban, Save } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGetLecturerProfileQuery, useUpdateLecturerProfileMutation } from "@/redux/query/lecturer-profile";

interface ProfileFormData {
  fullName: string;
  phone: string;
  address: string;
  gender: string;
}

const PersonalDetailsForm = () => {
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateLecturerProfileMutation();
  const { data: profileData } = useGetLecturerProfileQuery();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: undefined as string | undefined,
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (profileData) {
      setFormData({
        fullName: profileData.lecturer.name || "",
        gender: profileData.lecturer.gender || undefined,
        phone: profileData.lecturer.phone || "",
        address: profileData.lecturer.address || "",
      });
    }
  }, [profileData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateProfile = async (data: ProfileFormData) => {
    const toastId = toast.loading("Updating profile...");
    try {
      await updateProfile(data).unwrap();
      toast.success("Profile updated successfully!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile", {
        id: toastId,
      });
      throw error;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
        <CardDescription>
          Update your basic personal and professional information.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" value={formData.phone} onChange={handleChange} />
          </div>
          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address"> Address</Label>
            <Input
              id="address"
              type="address"
              value={formData.address}
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-bg-2 border-0">
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <Ban className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleUpdateProfile({
                ...formData,
                gender: formData.gender || "",
              })
            }
            disabled={isUpdatingProfile}
          >
            <Save className="mr-2 h-4 w-4" />
            {isUpdatingProfile ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalDetailsForm;
