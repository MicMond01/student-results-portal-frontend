import InfoItem from "@/components/ui-components/InfoItem";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Book,
  Building,
  FileText,
  Mail,
  Phone,
  School,
  Users,
} from "lucide-react";
import type { ILecturerData, ILecturerLatestCourse } from "../type";
import { useNavigate } from "react-router-dom";

const LecturerSidebar: React.FC<{
  lecturer: ILecturerData;
  latestCourse: ILecturerLatestCourse;
}> = ({ lecturer, latestCourse }) => {
  const navigate = useNavigate();
  return (
    <aside className="space-y-6">
      {/* Contact & Office Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact & Office</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoItem icon={Mail} label="Email" value={lecturer.email} />
          <InfoItem icon={Phone} label="Phone" value={lecturer.phone} />
          <InfoItem
            icon={Building}
            label="Office"
            value={lecturer.officeLocation}
          />
          <InfoItem icon={FileText} label="Staff ID" value={lecturer.staffId} />
          <InfoItem icon={School} label="Faculty" value={lecturer.faculty} />
        </CardContent>
      </Card>

      {/* Latest Course Card */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Course</CardTitle>
          <CardDescription>
            Quick access to your most recently added course.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Badge>{latestCourse.code}</Badge>
            <h4 className="mt-1.5 text-lg font-semibold text-gray-900">
              {latestCourse.title}
            </h4>
          </div>
          <InfoItem
            icon={Book}
            label="Level / Session"
            value={`${latestCourse.level} Level · ${latestCourse.session}`}
          />
          <InfoItem
            icon={Users}
            label="Enrolled Students"
            value={latestCourse.studentCount}
          />
          <Button
            className="w-full"
            onClick={() => navigate(`/courses/${latestCourse._id}`)}
          >
            Manage Course
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
};

export default LecturerSidebar;
