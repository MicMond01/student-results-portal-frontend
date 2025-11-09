import InfoItem from "@/components/ui-components/InfoItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getNameInitials } from "@/lib/functions";
import type { StudentProfile } from "@/types/student";
import { Book, Building, GraduationCap } from "lucide-react";

interface IStudentProfileProps {
  profile?: StudentProfile;
}
const ProfileSideItems = ({ profile }: IStudentProfileProps) => {
  console.log(profile);
  return (
    <Card className="lg:sticky lg:top-8">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
            <AvatarImage
              src={profile?.profilePhoto}
              alt={profile?.name || "Profile Image"}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/112x112/60A5FA/FFFFFF?text=" +
                  getNameInitials(profile?.name || "");
              }}
            />
            <AvatarFallback className="text-4xl">
              {getNameInitials(profile?.name || "")}
            </AvatarFallback>
          </Avatar>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            {profile?.name || "N/A"}
          </h1>
          <p className="text-sm font-medium text-primary">
            {profile?.matricNo || "N/A"}
          </p>
          <Badge className="mt-2 capitalize text-primary-3 bg-primary-4">
            {profile?.role || "N/A"}
          </Badge>
        </div>
        <Separator className="my-6" />
        <div className="space-y-4">
          <InfoItem
            icon={GraduationCap}
            label="Program"
            value={profile?.program || "N/A"}
          />
          <InfoItem
            icon={Building}
            label="Department"
            value={profile?.department || "N/A"}
          />
          <InfoItem
            icon={Book}
            label="Faculty"
            value={profile?.faculty || "N/A"}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSideItems;
