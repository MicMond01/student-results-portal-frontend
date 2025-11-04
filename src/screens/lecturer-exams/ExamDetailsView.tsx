import type { IExam, IExamCourse, IQuestion } from "@/types/exams";
import QuestionCard from "./QuestionCard";
import { Card } from "@/components/ui/card";
import { AlertCircle, ClipboardList } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ExamHeader from "./ExamHeader";
import { toast } from "sonner";
import { useState } from "react";
import ManageQuestionDialog from "./ManageQuestionDialog";

interface ExamDetailsViewProps {
  course: IExamCourse | undefined;
  exams: IExam[];
  onAddQuestion: (examId: string, data: any) => void;
  onUpdateQuestion: (examId: string, questionId: string, data: any) => void;
  isUpdatingQuestion: boolean;
}

const ExamDetailsView = ({
  course,
  exams,
  onAddQuestion,
  onUpdateQuestion,
  isUpdatingQuestion,
}: ExamDetailsViewProps) => {
  const [editingQuestion, setEditingQuestion] = useState<IQuestion | null>(
    null
  );
  const [addingToExamId, setAddingToExamId] = useState<string | null>(null);

  const handleEditClick = (question: IQuestion) => {
    setEditingQuestion(question);
  };

  const handleAddClick = (examId: string) => {
    setAddingToExamId(examId);
  };

  const closeDialog = () => {
    setEditingQuestion(null);
    setAddingToExamId(null);
  };

  const handleSaveQuestion = async (data: any) => {
    const toastId = toast.loading("Saving Question...");

    try {
      if (editingQuestion && addingToExamId) {
        // 🔁 Update existing question
        await onUpdateQuestion(addingToExamId, editingQuestion._id, data.data);
        toast.success("Question updated successfully!", { id: toastId });
      } else if (addingToExamId) {
        await onAddQuestion(addingToExamId, data);
        toast.success("Question successfully added!", { id: toastId });
      } else {
        toast.error("No exam selected.", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to save question", {
        id: toastId,
      });
    } finally {
      closeDialog();
    }
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

  // Placeholder if course has no exams
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
          {/* Render the header for THIS exam */}
          <ExamHeader
            course={course}
            exam={exam}
            onAddQuestionClick={() => handleAddClick(exam._id)}
          />
          {/* Render the questions for THIS exam */}
          {exam.questions.map((q, index) => (
            <QuestionCard
              key={q._id}
              examId={exam._id}
              question={q}
              index={index}
              onEditClick={() => {
                setAddingToExamId(exam._id);
                handleEditClick(q);
              }}
            />
          ))}
          {/* Add a separator between exams */}
          <Separator className="my-8" />
        </section>
      ))}

      <ManageQuestionDialog
        open={editingQuestion !== null || addingToExamId !== null}
        onClose={closeDialog}
        examId={addingToExamId || ""}
        question={editingQuestion}
        onSave={handleSaveQuestion}
        isUpdatingQuestion={isUpdatingQuestion}
      />
    </div>
  );
};

export default ExamDetailsView;
