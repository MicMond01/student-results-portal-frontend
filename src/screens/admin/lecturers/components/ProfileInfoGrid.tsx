import { Card, CardContent } from "@/components/ui/card";
import type { IAdminLecturer } from "../type";

const ProfileInfoGrid = ({ lecturer }: { lecturer: IAdminLecturer }) => {
  const fields = [
    { label: "Highest Degree", value: lecturer.highestDegree },
    { label: "Institution", value: lecturer.institution },
    { label: "Specialization", value: lecturer.specialization },
    { label: "Joined", value: lecturer.admissionYear },
    { label: "Experience", value: lecturer.yearsOfExperience + " years" },
  ];

  return (
    <Card>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {fields.map((f) => (
          <div key={f.label}>
            <p className="text-sm text-muted-foreground">{f.label}</p>
            <p className="font-medium">{f.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProfileInfoGrid;
