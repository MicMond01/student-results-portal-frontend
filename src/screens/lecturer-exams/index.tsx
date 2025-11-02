import { useEffect, useMemo, useState } from "react";
import CourseSelectorSidebar from "./CourseSelectorSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExamDetailsView from "./ExamDetailsView";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { useGetCoursesAssignedToLecturerQuery } from "@/redux/query/lecturer";
import { Loader2 } from "lucide-react";
import { useGetExamsQuery } from "@/redux/query/lecturer-exam";

const LecturerExams = () => {
  const { data: lecturerCourses, isLoading } =
    useGetCoursesAssignedToLecturerQuery();
  const { data: examData } = useGetExamsQuery();

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  useEffect(() => {
    if (lecturerCourses?.courses?.length && !selectedCourseId) {
      setSelectedCourseId(lecturerCourses.courses[0]._id);
    }
  }, [lecturerCourses, selectedCourseId]);

  const selectedCourse = useMemo(() => {
    return lecturerCourses?.courses.find((c) => c._id === selectedCourseId);
  }, [lecturerCourses, selectedCourseId]);

  const selectedExams = useMemo(() => {
    if (!selectedCourseId) return [];
    return examData?.exams.filter(
      (exam) => exam.course._id === selectedCourseId
    );
  }, [examData, selectedCourseId]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  console.log(selectedCourse);

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-380">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* --- Sidebar (Desktop) --- */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto">
              {lecturerCourses && (
                <CourseSelectorSidebar
                  courses={lecturerCourses.courses}
                  selectedCourseId={selectedCourseId}
                  onSelectCourse={(id) => setSelectedCourseId(id)}
                />
              )}
            </div>
          </aside>

          {/* --- Course Selector (Mobile) --- */}
          <div className="block lg:hidden">
            <Card>
              <CardHeader>
                <CardTitle>Select a Course</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedCourseId || ""}
                  onValueChange={setSelectedCourseId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course..." />
                  </SelectTrigger>
                  <SelectContent>
                    {lecturerCourses?.courses.map((course) => (
                      <SelectItem key={course._id} value={course._id}>
                        {course.code} - {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* --- Main Content Area --- */}
          <main className="lg:col-span-3 h-[calc(100vh-4rem)] overflow-y-auto pr-2">
            {selectedExams && (
              <ExamDetailsView
                course={selectedCourse}
                exams={selectedExams || []}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default LecturerExams;
