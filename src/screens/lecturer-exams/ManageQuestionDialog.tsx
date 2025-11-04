import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { IQuestion } from "@/types/exams";
import { Plus, Save, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ManageQuestionDialogProps {
  examId: string;
  question: IQuestion | null; // null for Create, Question object for Edit
  onSave: (data: any) => void;
  onClose: () => void;
  open: boolean;
  isUpdatingQuestion?: boolean;
}

const ManageQuestionDialog = ({
  examId,
  question,
  onSave,
  onClose,
  open,
  isUpdatingQuestion,
}: ManageQuestionDialogProps) => {
  const isEditMode = question !== null;
  const [questionType, setQuestionType] = useState(
    question?.questionType || "theory"
  );
  const [questionText, setQuestionText] = useState(question?.question || "");
  const [marks, setMarks] = useState(question?.marks || 0);
  const [modelAnswer, setModelAnswer] = useState(question?.modelAnswer || "");
  const [options, setOptions] = useState(question?.options || [""]);
  const [correctAnswer, setCorrectAnswer] = useState(
    question?.correctAnswer || ""
  );

  useEffect(() => {
    // Reset form when props change (e.g., opening for a new question)
    if (open) {
      setQuestionType(question?.questionType || "theory");
      setQuestionText(question?.question || "");
      setMarks(question?.marks || 0);
      setModelAnswer(question?.modelAnswer || "");
      setOptions(
        question?.options && question.options.length > 0
          ? question.options
          : [""]
      );
      setCorrectAnswer(question?.correctAnswer || "");
    }
  }, [question, open]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    let questionData: any = {
      question: questionText,
      questionType,
      marks: Number(marks),
    };

    if (questionType === "objective") {
      questionData = {
        ...questionData,
        options,
        correctAnswer,
      };
    } else {
      questionData = {
        ...questionData,
        modelAnswer,
      };
    }

    if (isEditMode && question) {
      // For `updateExamQuestion`
      onSave({
        examId: examId,
        questionId: question._id,
        data: questionData,
      });
    } else {
      // For `addQuestionTOExam`
      onSave(questionData);
    }
    // onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Question" : "Add New Question"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the details for this question."
              : "Add a new question to this exam."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Question Type */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="questionType" className="text-right">
              Type
            </Label>
            <Select
              value={questionType}
              onValueChange={(value) => setQuestionType(value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="theory">Theory</SelectItem>
                <SelectItem value="objective">Objective</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Question Text */}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="questionText" className="pt-2 text-right">
              Question
            </Label>
            <Textarea
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="col-span-3"
              placeholder="Enter the question text..."
            />
          </div>

          {/* Marks */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="marks" className="text-right">
              Marks
            </Label>
            <Input
              id="marks"
              type="number"
              value={marks}
              onChange={(e) => setMarks(Number(e.target.value))}
              className="col-span-3"
            />
          </div>

          {/* DYNAMIC FIELDS: Theory */}
          {questionType === "theory" && (
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="modelAnswer" className="pt-2 text-right">
                Model Answer
              </Label>
              <Textarea
                id="modelAnswer"
                value={modelAnswer}
                onChange={(e) => setModelAnswer(e.target.value)}
                className="col-span-3"
                placeholder="Enter the model answer..."
              />
            </div>
          )}

          {/* DYNAMIC FIELDS: Objective */}
          {questionType === "objective" && (
            <>
              {/* Options */}
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="pt-2 text-right">Options</Label>
                <div className="col-span-3 space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        placeholder={`Option ${index + 1}`}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleRemoveOption(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={handleAddOption}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                </div>
              </div>

              {/* Correct Answer */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="correctAnswer" className="text-right">
                  Correct Answer
                </Label>
                <Select value={correctAnswer} onValueChange={setCorrectAnswer}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select correct answer" />
                  </SelectTrigger>
                  <SelectContent>
                    {options
                      .filter((opt) => opt.trim() !== "")
                      .map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />

            {isEditMode
              ? `${isUpdatingQuestion ? "Updating..." : "Save Changes"} `
              : "Add Question"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageQuestionDialog;
