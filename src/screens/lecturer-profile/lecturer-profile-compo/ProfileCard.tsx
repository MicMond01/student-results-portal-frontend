import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getNameInitials } from "@/lib/functions";
import {
  useGetLecturerProfileQuery,
  useUpdateProfilePhotoMutation,
} from "@/redux/query/lecturer";
import { Camera } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ProfileCard = () => {
  const { data: lecturerData } = useGetLecturerProfileQuery();
  const [updatePhoto, { isLoading: isUpdatingPhoto }] =
    useUpdateProfilePhotoMutation();

  //   const [currentProfilePhoto, setCurrentProfilePhoto] = useState(
  //     lecturer.profilePhoto
  //   );

  //   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setCurrentProfilePhoto(reader.result as string);
  //         onProfilePhotoChange(file); // Pass the File object up to the parent
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

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

  return (
    <Card className="flex flex-col items-center p-6 text-center">
      <div className="relative mb-4">
        <Avatar className="h-28 w-28 border-4 border-white shadow-sm">
          <AvatarImage
            src={lecturerData?.lecturer.profilePhoto}
            alt={lecturerData?.lecturer.name}
          />
          <AvatarFallback className="text-4xl">
            {getNameInitials(lecturerData?.lecturer.name || "")}
          </AvatarFallback>
        </Avatar>
        <Input
          id="profilePhotoUpload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={() => handleUpdatePhoto}
        />
        <Label
          htmlFor="profilePhotoUpload"
          className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
        >
          <Camera className="h-4 w-4" />
          <span className="sr-only">Change profile photo</span>
        </Label>
      </div>
      <h2 className="text-xl font-semibold text-gray-800">
        {lecturerData?.lecturer.name}
      </h2>
      <p className="text-sm text-gray-500">{lecturerData?.lecturer.rank}</p>
    </Card>
  );
};

export default ProfileCard;
