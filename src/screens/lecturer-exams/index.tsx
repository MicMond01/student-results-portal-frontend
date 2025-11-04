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
import { Plus } from "lucide-react";
import {
  useAddQuestionTOExamMutation,
  useCreateExamMutation,
  useGetExamsQuery,
  useUpdateExamQuestionMutation,
} from "@/redux/query/lecturer-exam";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ManageExamDialog from "./ManageExamDialog";

const LecturerExams = () => {
  const { data: lecturerCourses } = useGetCoursesAssignedToLecturerQuery();
  const { data: examData } = useGetExamsQuery();
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  const [addQuestionTrigger] = useAddQuestionTOExamMutation();
  const [updateQuestionTrigger, { isLoading: isUpdatingQuestion }] =
    useUpdateExamQuestionMutation();
  const [createExamTrigger] = useCreateExamMutation();

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

  //Create Exam Handler
  const handleCreateExam = async (examData: any) => {
    const toastId = toast.loading("Creating Exam...");

    try {
      await createExamTrigger(examData).unwrap();
      toast.success("Exam successfully created!", { id: toastId });
    } catch (error) {
      toast.error((error as any)?.data?.message || "Failed to create exam", {
        id: toastId,
      });
    }
  };

  // Add Question Handler
  const handleAddQuestion = async (examId: string, data: any) => {
    const toastId = toast.loading("Adding Question...");

    try {
      await addQuestionTrigger({
        examId,
        data,
      }).unwrap();

      toast.success("Question successfully added!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add question", {
        id: toastId,
      });
    }
  };

  // Update Question Handler
  const handleUpdateQuestion = async (
    examId: string,
    questionId: string,
    data: any
  ) => {
    const toastId = toast.loading("Updating Question...");

    try {
      await updateQuestionTrigger({
        examId,
        questionId,
        data,
      }).unwrap();

      toast.success("Question successfully updated!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update question", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-380">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Exam Question Bank
          </h2>
          <Button onClick={() => setIsCreateExamOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* --- Sidebar (Desktop) --- */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto">
              {lecturerCourses && (
                <CourseSelectorSidebar
                  courses={lecturerCourses?.courses || []}
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
                onAddQuestion={handleAddQuestion}
                onUpdateQuestion={handleUpdateQuestion}
                isUpdatingQuestion={isUpdatingQuestion}
              />
            )}
          </main>
        </div>
      </div>

      <ManageExamDialog
        courses={lecturerCourses?.courses || []}
        open={isCreateExamOpen}
        onOpenChange={setIsCreateExamOpen}
        onSave={handleCreateExam}
        selectedCourse={selectedCourse || undefined}
      />
    </div>
  );
};

export default LecturerExams;
