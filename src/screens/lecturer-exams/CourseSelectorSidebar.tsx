import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IExamCourse } from "@/types/exams";
import CourseSelectorItem from "./CourseSelectorItem";

const CourseSelectorSidebar = ({
  courses,
  selectedCourseId,
  onSelectCourse,
}: {
  courses: IExamCourse[];
  selectedCourseId: string | null;
  onSelectCourse: (id: string) => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Course</CardTitle>
        <CardDescription>
          View and manage exam questions for your courses.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        <div className="space-y-1">
          {courses.map((course) => (
            <CourseSelectorItem
              key={course._id}
              course={course}
              isSelected={selectedCourseId === course._id}
              onSelect={() => onSelectCourse(course._id)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSelectorSidebar;
