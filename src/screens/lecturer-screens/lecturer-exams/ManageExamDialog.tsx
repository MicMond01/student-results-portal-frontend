import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { IExamCourse } from "@/types/exams";
import { useEffect, useState } from "react";
import ManageQuestionDialog from "./ManageQuestionDialog";
import { Card } from "@/components/ui/card";
import { Plus, Save, Trash } from "lucide-react";
import type { ILecturerCourse } from "@/types/lecturer";
import { useLecturerExamsStore } from "@/stores/useLecturerExamsStore";

interface ManageExamProps {
  courses: IExamCourse[];
  handleCreateExam: (examData: any) => void;
  selectedCourse: ILecturerCourse | undefined;
  isCreatingExam?: boolean;
}

const ManageExamDialog = ({
  courses,
  handleCreateExam,
  isCreatingExam,
  selectedCourse,
}: ManageExamProps) => {
  const [course, setCourse] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [examType, setExamType] = useState<string>("mixed");
  const [duration, setDuration] = useState<number>(120);
  const [totalMarks, setTotalMarks] = useState<number>(1);
  const [passingMarks, setPassingMarks] = useState<number>(0);
  const [instructions, setInstructions] = useState<string>("");
  const [session, setSession] = useState<string>("");
  const [semester, setSemester] = useState<string>("");
  const [questions, setQuestions] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // Zustand store
  const { closeCreateExam, isCreateExamOpen, openAddQuestion } =
    useLecturerExamsStore();

  useEffect(() => {
    const marks = questions.reduce((acc, q) => acc + (q.marks || 0), 0);
    setTotalMarks(marks);
  }, [questions]);

  //TODO: Make the inner AddQuestion Dialog Work
  const handleAddQuestion = (newQuestionData: any) => {
    setQuestions([
      ...questions,
      { ...newQuestionData, _id: `temp-${Date.now()}` },
    ]);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q._id !== id));
  };

  // Main save handler for the *entire exam*
  const handleSubmit = async () => {
    if (!course || !title || !session || !semester || questions.length === 0) {
      setErrorMsg(
        "Please fill all required fields and add at least one question."
      );
      return;
    }

    const cleanedQuestions = questions.map(({ _id, ...rest }) => rest);

    const examData = {
      course,
      title,
      examType,
      duration,
      totalMarks,
      passingMarks,
      instructions,
      session,
      semester,
      questions: cleanedQuestions,
    };

    try {
      await handleCreateExam(examData);
      setQuestions([]);
      setErrorMsg("");
    } catch (error) {
      if (
        error instanceof Error &&
        "data" in error &&
        error.data &&
        typeof (error as any).data.msg === "string"
      ) {
        setErrorMsg((error as any).data.msg);
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    }
  };

  return (
    <Dialog open={isCreateExamOpen} onOpenChange={closeCreateExam}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create New Exam</DialogTitle>
          <DialogDescription>
            Fill in the exam details and add questions.
          </DialogDescription>
          <div className="text-red-500 font-semibold">{errorMsg}</div>
        </DialogHeader>
        <div className="grid max-h-[70vh] gap-6 overflow-y-auto p-4">
          {/* Exam Details Form */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select value={course} onValueChange={setCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c) => (
                    <SelectItem key={c._id} value={c._id}>
                      {c.code} - {c.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Exam Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Mid-Term Examination"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="examType">Exam Type</Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="theory">Theory</SelectItem>
                  <SelectItem value="objective">Objective</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (in minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session">Session</Label>
              <Input
                id="session"
                value={session}
                onChange={(e) => setSession(e.target.value)}
                placeholder="E.g., 2024/2025"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select value={semester} onValueChange={setSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="First">First</SelectItem>
                  <SelectItem value="Second">Second</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passingMarks">Passing Marks</Label>
              <Input
                id="passingMarks"
                type="number"
                value={passingMarks}
                onChange={(e) => setPassingMarks(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalMarks">Total Marks (auto-calculated)</Label>
              <Input
                id="totalMarks"
                type="number"
                value={totalMarks}
                disabled
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Enter exam instructions..."
              />
            </div>
          </div>

          <Separator />

          {/* Questions Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Questions</h3>
              {/* This inner dialog adds a new question *to this form's state* */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => openAddQuestion("temp-exam")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Question
                  </Button>
                </DialogTrigger>
                {/* <ManageQuestionDialog
                  question={null}
                  onSave={handleAddQuestion} // Adds to local state
                /> */}
              </Dialog>
            </div>
            <div className="space-y-2">
              {questions.length === 0 && (
                <p className="text-sm text-center text-gray-500">
                  No questions added yet.
                </p>
              )}
              {questions.map((q, index) => (
                <Card key={q._id} className="flex items-center p-3">
                  <div className="flex-1">
                    <p className="font-medium">
                      Q{index + 1}: {q.question}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">
                      {q.questionType} &middot; {q.marks} Marks
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleRemoveQuestion(q._id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter className="pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />{" "}
            {isCreatingExam ? "Creating..." : "Create Exam"}
          </Button>
        </DialogFooter>

        <ManageQuestionDialog question={null} onSave={handleAddQuestion} />
      </DialogContent>
    </Dialog>
  );
};

export default ManageExamDialog;
