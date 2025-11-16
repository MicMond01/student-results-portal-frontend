import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IExamCourse } from "@/types/exams";
import CourseSelectorItem from "./CourseSelectorItem";
import { useLecturerExamsStore } from "@/stores/useLecturerExamsStore";

const CourseSelectorSidebar = ({ courses }: { courses: IExamCourse[] }) => {
  // Zustand store
  const { selectedCourseId, setSelectedCourseId } = useLecturerExamsStore();
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
              onSelect={() => setSelectedCourseId(course._id)} //Change here
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseSelectorSidebar;
