import InfoItem from "@/components/ui-components/InfoItem";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateAge, formatDate } from "@/lib/functions";
import type { StudentProfile } from "@/types/student";
import {
  BarChart,
  Building,
  Calendar,
  ClipboardList,
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
  UserCheck,
} from "lucide-react";

interface IStudentProfileProps {
  profile?: StudentProfile;
}

const ProfileContent = ({ profile }: IStudentProfileProps) => {
  const statusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">{status}</Badge>
        );
      case "suspended":
        // ... (existing code) ...
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Tabs defaultValue="academic" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="academic">Academic Profile</TabsTrigger>
        <TabsTrigger value="personal">Personal Information</TabsTrigger>
      </TabsList>

      {/* Academic Info Tab */}
      <TabsContent value="academic">
        <Card>
          <CardHeader>
            <CardTitle>Academic Details</CardTitle>
            <CardDescription>
              Your current academic standing and information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoItem
                icon={BarChart}
                label="Current Level"
                value={`${profile?.level || "N/A"} Level`}
              />
              <InfoItem
                icon={Clock}
                label="Current Session"
                value={profile?.session || "N/A"}
              />
              <InfoItem
                icon={UserCheck}
                label="Academic Advisor"
                value={profile?.academicAdvisor || "N/A"}
              />
              <InfoItem
                icon={ClipboardList}
                label="Academic Status"
                value={statusBadge(profile?.status || "N/A")}
              />
              <InfoItem
                icon={Calendar}
                label="Admission Year"
                value={profile?.admissionYear || "N/A"}
              />
              <InfoItem
                icon={Building}
                label="Institution"
                value={profile?.school || "N/A"}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Personal Info Tab */}
      <TabsContent value="personal">
        <Card>
          <CardHeader>
            {/* ... (existing code) ... */}
            <CardTitle>Personal & Contact Details</CardTitle>
            <CardDescription>
              Your personal contact and biographical information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <InfoItem
                icon={Mail}
                label="University Email"
                value={profile?.email || "N/A"}
              />
              <InfoItem
                icon={Phone}
                label="Phone Number"
                value={profile?.phone || "N/A"}
              />
              <InfoItem
                icon={User}
                label="Gender"
                value={profile?.gender || "N/A"}
              />
              <InfoItem
                icon={Calendar}
                label="Date of Birth"
                value={`${formatDate(
                  profile?.dateOfBirth || ""
                )} (Age: ${calculateAge(profile?.dateOfBirth || "")})`}
              />
              <InfoItem
                icon={MapPin}
                label="Address"
                value={profile?.address || "N/A"}
              />
              <InfoItem
                icon={MapPin}
                // ... (existing code) ...
                label="Place of Birth"
                value={profile?.placeOfBirth || "N/A"}
              />
              <InfoItem
                icon={Globe}
                label="State of Origin"
                value={profile?.stateOfOrigin || "N/A"}
              />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProfileContent;
