import { Card, CardContent } from "@/components/ui/card";
import type { IAdminStatCourse } from "../type";

interface CoursesTabProps {
  courses: IAdminStatCourse[]; 
}

const CoursesTab = ({ courses }: CoursesTabProps) => {
  if (!courses?.length) return <p>No courses assigned.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {courses.map((course) => (
        <Card key={course._id}>
          <CardContent className="p-4">
            <h3 className="font-semibold">
              {course.code} - {course.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Level: {course.level}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CoursesTab;
