import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Power } from "lucide-react";
import useAdminExams from "@/lib/hooks/exam/useAdminExams";

const ExamStatusDialog = () => {
  const {
    isStatusDialogOpen,
    setIsStatusDialogOpen,
    statusExam: exam,
    handleSaveStatus,
  } = useAdminExams();
  if (!exam) return null;
  const isActivating = !exam.isActive;

  return (
    <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
      <DialogContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className={cn(
              "p-4 rounded-full",
              isActivating
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            )}
          >
            <Power className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">
            {isActivating ? "Activate Exam?" : "Deactivate Exam?"}
          </h2>
          <p className="text-gray-500 max-w-sm">
            You are about to {isActivating ? "enable" : "disable"} access to{" "}
            <strong>{exam.title}</strong>.
            {isActivating
              ? " Students will be able to take this exam immediately."
              : " Students will no longer be able to access this exam."}
          </p>
        </div>
        <div className="flex gap-3 mt-8">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsStatusDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant={isActivating ? "default" : "destructive"}
            className={cn(
              "w-full",
              isActivating && "bg-green-600 hover:bg-green-700"
            )}
            onClick={() => handleSaveStatus(isActivating)}
          >
            {isActivating ? "Activate Exam" : "Deactivate Exam"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExamStatusDialog;
