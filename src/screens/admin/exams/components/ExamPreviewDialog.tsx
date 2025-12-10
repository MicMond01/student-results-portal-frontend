import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, FileText } from "lucide-react";
import Badge from "@/components/ui-components/Badge";
import { formatDuration } from "@/lib/functions";
import type { IExam } from "../types";

interface ExamPreviewDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  exam: IExam | null;
  handleDownloadPDF: (exam: IExam) => void;
}

const ExamPreviewDialog = ({
  isOpen,
  setIsOpen,
  exam,
  handleDownloadPDF,
}: ExamPreviewDialogProps) => {
  if (!exam) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col max-h-[90vh] max-w-[90vh] ">
        <DialogHeader className="p-6 border-b flex justify-between items-start bg-gray-50 rounded-t-xl">
          <div>
            <DialogTitle className="text-xl font-bold text-gray-900">
              {exam.course?.code} - {exam.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 mt-1">
              {exam.course?.title} • {exam.session} • {exam.semester} Semester
            </DialogDescription>
          </div>
          <Badge variant={exam.isActive ? "success" : "default"}>
            {exam.isActive ? "Active" : "Inactive"}
          </Badge>
        </DialogHeader>

        <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-white">
          <div className="grid grid-cols-3 gap-4 text-sm p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <div>
              <span className="block text-indigo-400 text-xs uppercase font-bold">
                Duration
              </span>
              <span className="font-medium text-indigo-900">
                {formatDuration(exam.duration)}
              </span>
            </div>
            <div>
              <span className="block text-indigo-400 text-xs uppercase font-bold">
                Total Marks
              </span>
              <span className="font-medium text-indigo-900">
                {exam.totalMarks} Marks
              </span>
            </div>
            <div>
              <span className="block text-indigo-400 text-xs uppercase font-bold">
                Questions
              </span>
              <span className="font-medium text-indigo-900">
                {exam.questions.length} Items
              </span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-gray-500" /> Instructions
            </h3>
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200 italic">
              {exam.instructions}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-bold text-gray-900 border-b pb-2">
              Questions Preview
            </h3>
            {exam.questions.map((q, idx) => (
              <div key={q._id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-800 text-sm">
                    Q{idx + 1}. {q.question}
                  </span>
                  <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-600">
                    {q.marks} Marks
                  </span>
                </div>
                {q.questionType === "objective" && q.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4">
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`text-xs p-2 rounded border ${
                          opt === q.correctAnswer
                            ? "bg-green-50 border-green-200 text-green-800"
                            : "bg-white border-gray-100 text-gray-500"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}. {opt}
                      </div>
                    ))}
                  </div>
                )}
                {q.questionType === "theory" && (
                  <div className="pl-4 text-xs text-gray-400 italic">
                    [Theory Space]
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 rounded-b-xl flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button onClick={() => handleDownloadPDF(exam)}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExamPreviewDialog;
