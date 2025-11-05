import { useEffect, useMemo } from "react";
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
import { useLecturerExamsStore } from "@/stores/useLecturerExamsStore";
import { Skeleton } from "@/components/ui/skeleton";
import Banner from "@/components/ui-components/Banner";
import { LuNotebookPen } from "react-icons/lu";

const LecturerExams = () => {
  // Zustand store
  const {
    selectedCourseId,
    setSelectedCourseId,
    openCreateExam,
    closeCreateExam,
  } = useLecturerExamsStore();

  // API queries
  const { data: lecturerCourses, isLoading: isLoadingLecturerCourses } =
    useGetCoursesAssignedToLecturerQuery();
  const { data: examData, isLoading: isLoadingExam } = useGetExamsQuery();

  // API mutations
  const [addQuestionTrigger] = useAddQuestionTOExamMutation();
  const [updateQuestionTrigger, { isLoading: isUpdatingQuestion }] =
    useUpdateExamQuestionMutation();
  const [createExamTrigger, { isLoading: isCreatingExam }] =
    useCreateExamMutation();

  // Auto-select first course on initial load
  useEffect(() => {
    if (lecturerCourses?.courses?.length && !selectedCourseId) {
      setSelectedCourseId(lecturerCourses.courses[0]._id);
    }
  }, [lecturerCourses, selectedCourseId, setSelectedCourseId]);

  // Memoized derived state
  const selectedCourseData = useMemo(() => {
    return lecturerCourses?.courses.find((c) => c._id === selectedCourseId);
  }, [lecturerCourses, selectedCourseId]);

  const selectedExams = useMemo(() => {
    if (!selectedCourseId) return [];
    return examData?.exams.filter(
      (exam) => exam.course._id === selectedCourseId
    );
  }, [examData, selectedCourseId]);

  // Create Exam Handler
  const handleCreateExam = async (examData: any) => {
    const toastId = toast.loading("Creating Exam...");

    try {
      await createExamTrigger(examData).unwrap();
      toast.success("Exam successfully created!", { id: toastId });
      closeCreateExam();
    } catch (error) {
      console.log(error);
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

  if (isLoadingExam || isLoadingLecturerCourses) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-380">
        <Banner
          title="Course Exams"
          desc="Manage all examinations associated with your courses efficiently. Create new exams, organize questions, update existing assessments, and monitor course evaluation details"
          actionButton={<LuNotebookPen className="text-primary" size={40} />}
          containterClass="mb-8"
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* --- Sidebar (Desktop) --- */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto">
              {lecturerCourses && (
                <CourseSelectorSidebar
                  courses={lecturerCourses?.courses || []}
                />
              )}
              <Button className="mt-5 w-full" onClick={openCreateExam}>
                <Plus className="mr-2 h-4 w-4" />
                Create Exam
              </Button>
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
            {selectedExams && selectedCourseData && (
              <ExamDetailsView
                course={selectedCourseData}
                exams={selectedExams || []}
                handleAddQuestion={handleAddQuestion}
                handleUpdateQuestion={handleUpdateQuestion}
                isUpdatingQuestion={isUpdatingQuestion}
              />
            )}
          </main>
        </div>
      </div>

      <ManageExamDialog
        courses={lecturerCourses?.courses || []}
        handleCreateExam={handleCreateExam}
        selectedCourse={selectedCourseData || undefined}
        isCreatingExam={isCreatingExam}
      />
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-background p-6">
    <div className="max-w-7xl mx-auto">
      <Skeleton className="h-10 w-32 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-[600px]" />
        <Skeleton className="lg:col-span-2 h-[600px]" />
      </div>
    </div>
  </div>
);

export default LecturerExams;
