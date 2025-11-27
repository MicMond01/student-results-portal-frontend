import Badge from "@/components/ui-components/Badge";
import InfoItem from "@/components/ui-components/InfoItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getNameInitials } from "@/lib/functions";
import {
  ArrowLeft,
  Briefcase,
  Building,
  Edit2,
  GraduationCap,
  School,
  Award,
  Calendar,
  Clock,
  Users,
  MapPin,
} from "lucide-react";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";
import { useNavigate } from "react-router-dom";
import type { IAdminLecturer } from "../../type";

interface ProfileHeaderProps {
  lecturerData: IAdminLecturer | undefined;
  isDeleting: boolean;
  onEdit: () => void;
  onDelete: (id: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  lecturerData,
  isDeleting,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();
  const initials = getNameInitials(lecturerData?.name || "");

  return (
    <>
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/lecturers")}
          className="pl-0 hover:bg-transparent hover:text-indigo-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lecturers
        </Button>
      </div>

      <Card className="overflow-hidden border-none shadow-md">
        <div className="h-32 bg-linear-to-r from-indigo-600 to-purple-600"></div>
        <div className="px-6 pb-6">
          <div className="relative flex flex-col items-center sm:flex-row sm:items-end -mt-12 mb-6 gap-4">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarImage src={lecturerData?.profilePhoto || undefined} />
              <AvatarFallback className="text-3xl bg-indigo-100 text-indigo-700">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center pt-8 sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {lecturerData?.name}
                </h1>
                <Badge
                  variant={
                    lecturerData?.status === "Active" ? "success" : "secondary"
                  }
                >
                  {lecturerData?.status}
                </Badge>
              </div>
              <p className="text-indigo-600 font-medium">
                {lecturerData?.rank}
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Building className="h-3.5 w-3.5" />{" "}
                  {lecturerData?.department.name}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" /> {lecturerData?.staffId}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />{" "}
                  {lecturerData?.address || "Lagos, NG"}
                </span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <Button onClick={onEdit}>
                <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
              <ConfirmationDialog
                title="Confirm Delete"
                triggerLabel="Delete Lecturer"
                description="Are you sure you want to delete this Lecturer? "
                action={() => onDelete(lecturerData?._id || "")}
                type="delete"
                confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
            <InfoItem
              icon={GraduationCap}
              label="Highest Degree"
              value={lecturerData?.highestDegree}
            />
            <InfoItem
              icon={School}
              label="Institution"
              value={lecturerData?.institution}
            />
            <InfoItem
              icon={Award}
              label="Specialization"
              value={lecturerData?.specialization}
            />
            <InfoItem
              icon={Calendar}
              label="Joined"
              value={new Date(
                lecturerData?.createdAt || ""
              ).toLocaleDateString()}
            />
            <InfoItem
              icon={Clock}
              label="Experience"
              value={`${lecturerData?.yearsOfExperience} Years`}
            />
            <InfoItem
              icon={Users}
              label="Academic Advisor"
              value={lecturerData?.academicAdvisor || "Not Assigned"}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default ProfileHeader;
