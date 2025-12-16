import { Users } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "@/components/ui/button";
import type { ILecturerCourse } from "../type";
import { useNavigate } from "react-router-dom";

const CourseList: React.FC<{ courses: ILecturerCourse[] }> = ({ courses }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned Courses</CardTitle>
        <CardDescription>
          A list of all courses assigned for the current and previous sessions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col justify-between rounded-lg border p-3 sm:flex-row sm:items-center"
            >
              <div className="mb-2 sm:mb-0">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{course.code}</Badge>
                  <h4 className="font-semibold text-gray-800">
                    {course.title}
                  </h4>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {course.level} Level · {course.semester} Semester ·{" "}
                  {course.session} Session
                </p>
              </div>
              <div className="flex shrink-0 items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="mr-1.5 h-4 w-4" />
                  {course.studentCount} Students
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/courses/${course.id}`)}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseList;
