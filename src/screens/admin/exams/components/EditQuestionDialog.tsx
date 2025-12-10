import { useEffect, useState } from "react";
import type { IExamQuestion } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface EditQuestionsDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  questions: IExamQuestion[];
  handleSaveQuestions: (questions: IExamQuestion[]) => void;
}

const EditQuestionsDialog = ({
  isOpen,
  setIsOpen,
  questions,
  handleSaveQuestions,
}: EditQuestionsDialogProps) => {
  const [formData, setFormData] = useState<IExamQuestion[]>([]);

  useEffect(() => {
    if (questions) {
      setFormData(
        questions.map((q) => ({
          ...q,
          options: [...(q.options || [])],
        }))
      );
    }
  }, [questions]);

  const handleAddQuestion = () => {
    setFormData((prev) => [
      ...prev,
      {
        _id: "",
        question: "",
        questionType: "theory",
        marks: 0,
        options: [],
        correctAnswer: "",
        modelAnswer: "",
      },
    ]);
  };

  const handleRemoveQuestion = (idx: number) => {
    setFormData((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleQuestionChange = (
    idx: number,
    name: keyof IExamQuestion,
    value: any
  ) => {
    setFormData((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [name]: value } : item))
    );
  };

  const handleAddOption = (qIdx: number) => {
    setFormData((prev) =>
      prev.map((item, i) =>
        i === qIdx
          ? {
              ...item,
              options: [...(item.options || []), ""],
            }
          : item
      )
    );
  };

  const handleOptionChange = (qIdx: number, optIdx: number, val: string) => {
    setFormData((prev) =>
      prev.map((item, i) =>
        i === qIdx
          ? {
              ...item,
              options: (item.options || []).map((opt, j) =>
                j === optIdx ? val : opt
              ),
            }
          : item
      )
    );
  };

  const handleRemoveOption = (qIdx: number, optIdx: number) => {
    setFormData((prev) =>
      prev.map((item, i) =>
        i === qIdx
          ? {
              ...item,
              options: (item.options || []).filter((_, j) => j !== optIdx),
            }
          : item
      )
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex flex-col max-h-[85vh] max-w-[90vh] ">
        <DialogHeader className="p-6 border-b flex justify-between items-center rounded-t-xl">
          <DialogTitle className="text-lg font-bold text-gray-900">
            Edit Exam Questions
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleAddQuestion}
              type="button"
            >
              <Plus className="h-3 w-3 mr-1" /> Add Question
            </Button>
          </div>
          {formData.map((q, idx) => (
            <div
              key={q._id || idx}
              className="border rounded-lg p-4 space-y-4 relative"
            >
              <div className="absolute top-2 right-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveQuestion(idx)}
                  className="text-red-500 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text
                </label>
                <Textarea
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(idx, "question", e.target.value)
                  }
                  placeholder="Enter question..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </Label>
                  <Select
                    value={q.questionType}
                    onValueChange={(value) =>
                      handleQuestionChange(idx, "questionType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Question Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theory">Theory</SelectItem>
                      <SelectItem value="objective">Objective</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Marks
                  </label>
                  <Input
                    type="number"
                    value={q.marks}
                    onChange={(e) =>
                      handleQuestionChange(
                        idx,
                        "marks",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
              {q.questionType === "objective" && (
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleAddOption(idx)}
                      type="button"
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Option
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {q.options?.map((opt, optIdx) => (
                      <div key={optIdx} className="flex gap-2 items-center">
                        <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-bold shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <Input
                          value={opt}
                          onChange={(e) =>
                            handleOptionChange(idx, optIdx, e.target.value)
                          }
                          placeholder={`Option ${optIdx + 1}`}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveOption(idx, optIdx)}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">
                      Correct Answer
                    </Label>
                    <Select
                      value={q.correctAnswer}
                      onValueChange={(value) =>
                        handleQuestionChange(idx, "correctAnswer", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        {q.options?.map((opt, optIdx) => (
                          <SelectItem key={optIdx} value={opt}>
                            {opt}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {q.questionType === "theory" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Model Answer
                  </label>
                  <Textarea
                    value={q.modelAnswer}
                    onChange={(e) =>
                      handleQuestionChange(idx, "modelAnswer", e.target.value)
                    }
                    placeholder="Enter model answer key..."
                    className="h-24"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-6 border-t bg-gray-50 rounded-b-xl flex justify-end gap-3">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleSaveQuestions(formData)}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionsDialog;
