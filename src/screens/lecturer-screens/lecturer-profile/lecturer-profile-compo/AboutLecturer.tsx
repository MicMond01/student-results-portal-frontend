import InfoItem from "@/components/ui-components/InfoItem";
import InfoSection from "@/components/ui-components/InfoSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAge, formatDate } from "@/lib/functions";
import {
  Award,
  Briefcase,
  Calendar,
  GraduationCap,
  MapPin,
  School,
  User,
} from "lucide-react";
import { useMemo } from "react";
import type { ILecturerData } from "../type";

const AboutLecturer: React.FC<{ lecturer: ILecturerData }> = ({ lecturer }) => {
  // Memoize computed values
  const age = useMemo(
    () => calculateAge(lecturer.dateOfBirth),
    [lecturer.dateOfBirth],
  );
  const dob = useMemo(
    () => formatDate(lecturer.dateOfBirth),
    [lecturer.dateOfBirth],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>About {lecturer.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Professional & Academic Details */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoSection title="Academic & Professional">
            <InfoItem icon={Award} label="Rank" value={lecturer.rank} />
            <InfoItem
              icon={Briefcase}
              label="Specialization"
              value={lecturer.specialization}
            />
            <InfoItem
              icon={GraduationCap}
              label="Highest Degree"
              value={lecturer.highestDegree}
            />
            <InfoItem
              icon={School}
              label="Institution"
              value={lecturer.institution}
            />
          </InfoSection>

          <InfoSection title="Personal Details">
            <InfoItem icon={User} label="Gender" value={lecturer.gender} />
            <InfoItem
              icon={Calendar}
              label="Date of Birth"
              value={`${dob} (Age: ${age})`}
            />
            <InfoItem icon={MapPin} label="Address" value={lecturer.address} />
          </InfoSection>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutLecturer;
