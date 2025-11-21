import ProfileAvatar from "@/components/ui-components/ProfileAvatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Edit } from "lucide-react";
import userImageBackgrond from "../../../../assets/user-grid-bg8.png";
import type { ILecturerData } from "../type";
import { useNavigate } from "react-router-dom";

const ProfileHeader: React.FC<{ lecturer: ILecturerData }> = ({ lecturer }) => {
  const navigate = useNavigate();
  return (
    <Card className="overflow-hidden border-0">
      {/* Cover Photo */}
      {/* <div className="h-32 w-full bg-indigo-600 lg:h-48" /> */}
      <img
        src={userImageBackgrond}
        alt="back Image"
        className="h-32 w-full lg:h-48"
      />

      {/* Profile Info */}
      <div className="flex flex-col justify-between p-4 sm:flex-row">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center sm:flex-row sm:items-end">
          <div className="-mt-16 sm:ml-4">
            <ProfileAvatar src={lecturer.profilePhoto} name={lecturer.name} />
          </div>
          <div className="mt-2 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">
              {lecturer.name}
            </h1>
            <p className="text-sm text-gray-600">{lecturer.rank}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-center space-x-2 sm:mt-0">
          <Button
            className="text-primary-3 bg-primary-4"
            size="sm"
            onClick={() => navigate("/profile/update")}
          >
            <Edit className="mr-2 h-4 w-4 " />
            Edit Profile
          </Button>
        </div>
      </div>

      <Separator />

      {/* Stats Bar */}
      <div className="flex flex-wrap justify-around p-4 text-center text-sm">
        <div className="p-2">
          <span className="block font-semibold text-gray-800">
            {lecturer.yearsOfExperience}
          </span>
          <span className="text-xs text-gray-500">Years Experience</span>
        </div>
        <div className="p-2">
          <span className="block font-semibold text-gray-800">
            {lecturer.specialization}
          </span>
          <span className="text-xs text-gray-500">Specialization</span>
        </div>
        <div className="p-2">
          <span className="block font-semibold text-gray-800">
            {lecturer.department}
          </span>
          <span className="text-xs text-gray-500">Department</span>
        </div>
      </div>
    </Card>
  );
};

export default ProfileHeader;
