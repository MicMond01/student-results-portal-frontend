import type { IExam, IExamCourse } from "@/types/exams";
import QuestionCard from "./QuestionCard";
import { Card } from "@/components/ui/card";
import { AlertCircle, ClipboardList } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ExamHeader from "./ExamHeader";
import { toast } from "sonner";
import ManageQuestionDialog from "./ManageQuestionDialog";
import { useLecturerExamsStore } from "@/stores/useLecturerExamsStore";
import { useState } from "react";
import BulkUploadDialog from "@/components/functional-component/BulkUploadDialog";

interface ExamDetailsViewProps {
  course: IExamCourse | undefined;
  exams: IExam[];
  handleAddQuestion: (examId: string, data: any) => void;
  handleUpdateQuestion: (examId: string, questionId: string, data: any) => void;
  isUpdatingQuestion: boolean;
  onBulkUpload: (examId: string, file: File) => void; // Changed prop
}

const ExamDetailsView = ({
  course,
  exams,
  handleAddQuestion,
  handleUpdateQuestion,
  isUpdatingQuestion,
  onBulkUpload,
}: ExamDetailsViewProps) => {
  const [bulkUploadingToExamId, setBulkUploadingToExamId] = useState<
    string | null
  >(null);
  // Zustand store
  const { editingQuestion, addingToExamId, closeQuestionDialog } =
    useLecturerExamsStore();
  const handleBulkUploadClick = (examId: string) =>
    setBulkUploadingToExamId(examId);

  const handleSaveQuestion = async (data: any) => {
    const toastId = toast.loading("Saving Question...");

    try {
      if (editingQuestion && addingToExamId) {
        // Update existing question
        await handleUpdateQuestion(
          addingToExamId,
          editingQuestion._id,
          data.data
        );
        toast.success("Question updated successfully!", { id: toastId });
      } else if (addingToExamId) {
        // Add new question
        await handleAddQuestion(addingToExamId, data);
        toast.success("Question successfully added!", { id: toastId });
      } else {
        toast.error("No exam selected.", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save question", {
        id: toastId,
      });
    } finally {
      closeQuestionDialog();
    }
  };

  const handleBulkUploadSubmit = (examId: string, file: File) => {
    onBulkUpload(examId, file);
    // Parent will close dialog on success
  };

  if (!course) {
    return (
      <Card className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            No Course Selected
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a course from the list to view its exam questions.
          </p>
        </div>
      </Card>
    );
  }

  if (exams.length === 0) {
    return (
      <Card className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            No Exams Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no exams set up for {course.title}.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {exams.map((exam) => (
        <section key={exam._id} className="space-y-6">
          <ExamHeader
            course={course}
            exam={exam}
            onBulkUploadClick={() => handleBulkUploadClick(exam._id)}
          />
          {exam.questions.map((q, index) => (
            <QuestionCard
              key={q._id}
              examId={exam._id}
              question={q}
              index={index}
            />
          ))}
          <Separator className="my-8" />
        </section>
      ))}

      <ManageQuestionDialog
        question={editingQuestion}
        onSave={handleSaveQuestion}
        isUpdatingQuestion={isUpdatingQuestion}
      />
      <BulkUploadDialog
        open={bulkUploadingToExamId !== null}
        examId={bulkUploadingToExamId || ""}
        onUpload={handleBulkUploadSubmit}
        isUploading={isUpdatingQuestion}
      />
    </div>
  );
};

export default ExamDetailsView;
