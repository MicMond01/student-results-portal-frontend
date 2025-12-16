import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Building,
  CheckCircle,
  ChevronRight,
  Database,
  XCircle,
} from "lucide-react";
import CourseInfoItem from "./lecturer-compo/CourseInfoItem";
import type { ILecturerCourse } from "@/types/lecturer";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: ILecturerCourse;
}
const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col justify-between overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{course.code}</Badge>
          <Badge variant={course.isActive ? "default" : "destructive"}>
            {course.isActive ? (
              <CheckCircle className="mr-1 h-3 w-3" />
            ) : (
              <XCircle className="mr-1 h-3 w-3" />
            )}
            {course.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
        <CardTitle className="pt-2">{course.title}</CardTitle>
        <CardDescription>
          {course.session} &middot; {course.semester} Semester
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <CourseInfoItem icon={BarChart} label={`${course.level} Level`} />
        <CourseInfoItem
          icon={Database}
          label={`${course.creditUnit} Credit Units`}
        />
        <CourseInfoItem icon={Building} label={course.department} />
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          className="w-full justify-between"
          onClick={() => navigate(`/courses/${course._id}`)}
        >
          Manage Course
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
