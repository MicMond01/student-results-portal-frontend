import {
  useChangePasswordMutation,
  useGetLecturerProfileQuery,
  useUpdateLecturerProfileMutation,
  useUpdateProfilePhotoMutation,
} from "@/redux/query/lecturer";
import type { PasswordFormData } from "@/types/lecturer";
import { toast } from "sonner";
import EditLecturerSidebar from "./lecturer-profile-compo/EditLecturerSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDetailsForm from "./lecturer-profile-compo/PersonalDetailsForm";
import PasswordResetForm from "./lecturer-profile-compo/PasswordResetForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UpdateProfile: React.FC = () => {
  const { data: profileData } = useGetLecturerProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateLecturerProfileMutation();
  const [updatePhoto, { isLoading: isUpdatingPhoto }] =
    useUpdateProfilePhotoMutation();

  const handleUpdateProfile = async (data: any) => {
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

  const handleUpdatePhoto = async (photoUrl: string) => {
    const toastId = toast.loading("Updating photo...");
    try {
      await updatePhoto({ profilePhoto: photoUrl }).unwrap();
      toast.success("Photo updated successfully!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update photo", {
        id: toastId,
      });
      throw error;
    }
  };

  //   const handleChangePassword = async (data: PasswordFormData) => {
  //     const toastId = toast.loading("Changing password...");
  //     try {
  //       await changePassword(data).unwrap();
  //       toast.success("Password changed successfully!", { id: toastId });
  //     } catch (error: any) {
  //       toast.error(error?.data?.message || "Failed to change password", {
  //         id: toastId,
  //       });
  //       throw error;
  //     }
  //   };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <EditLecturerSidebar />
          </aside>

          {/* Main Content Area with Tabs */}
          <main className="lg:col-span-2">
            <Tabs defaultValue="personalDetails" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personalDetails">
                  Personal Details
                </TabsTrigger>
                <TabsTrigger value="changePassword">
                  Change Password
                </TabsTrigger>
                <TabsTrigger value="others">Others</TabsTrigger>{" "}
                {/* Placeholder */}
              </TabsList>
              <TabsContent value="personalDetails" className="mt-4">
                <PersonalDetailsForm />
              </TabsContent>
              <TabsContent value="changePassword" className="mt-4">
                <PasswordResetForm />
              </TabsContent>
              <TabsContent value="others" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Other Settings</CardTitle>
                    <CardDescription>
                      This section can be expanded for other customizable
                      settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      (Content for other settings like notifications, privacy,
                      etc., would go here.)
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
