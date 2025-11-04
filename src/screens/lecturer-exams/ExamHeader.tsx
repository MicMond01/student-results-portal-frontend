import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDuration } from "@/lib/functions";
import { useDeleteExamMutation } from "@/redux/query/lecturer-exam";
import type { IExam, IExamCourse } from "@/types/exams";
import { Clock, Database, FileText, Plus } from "lucide-react";
import { toast } from "sonner";

interface ExamHeaderProps {
  course: IExamCourse;
  exam: IExam;
  onAddQuestionClick: () => void;
}

const ExamHeader = ({ course, exam, onAddQuestionClick }: ExamHeaderProps) => {
  const [deleteExamTrigger, { isLoading }] = useDeleteExamMutation();

  const handleDeleteExam = async () => {
    const toastId = toast.loading("Deleting Exam...");

    try {
      await deleteExamTrigger(exam._id).unwrap();

      toast.success("Exam successfully Deleted!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Delete Exam", {
        id: toastId,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="">
            <CardTitle className="text-2xl">{exam.title}</CardTitle>
            <CardDescription className="text-base capitalize">
              {course.code} &middot; {exam.examType} Exam
            </CardDescription>
          </div>

          <div className="flex gap-4">
            <ConfirmationDialog
              title="Confirm Delete"
              type="delete"
              description="Are you sure you want to Delete this Exam?"
              action={handleDeleteExam}
              triggerLabel="Delete Exam"
              confirmLabel={isLoading ? "Deleting..." : "Yes, Delete"}
            />

            <Button onClick={onAddQuestionClick}>
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
          <div className="flex items-center text-gray-700">
            <Clock className="mr-2 h-5 w-5 text-primary" />
            <span className="font-medium">Duration:</span>
            <span className="ml-1.5">{formatDuration(exam.duration)}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Database className="mr-2 h-5 w-5 text-primary" />
            <span className="font-medium">Total Marks:</span>
            <span className="ml-1.5">{exam.totalMarks}</span>
          </div>
        </div>
        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
          <h4 className="mb-2 flex items-center text-sm font-semibold text-yellow-800">
            <FileText className="mr-1.5 h-4 w-4" />
            Instructions
          </h4>
          <p className="text-sm text-yellow-700">{exam.instructions}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExamHeader;
