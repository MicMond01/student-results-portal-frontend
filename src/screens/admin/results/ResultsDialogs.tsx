// ResultsDialogs.tsx (new file)
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IStudentResult } from "./types";

interface ResultsDialogsProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
  selectedResult: IStudentResult | null;
  uniqueSessions: string[];
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  newResultForm: any; // Adjust type as needed
  setNewResultForm: (form: any) => void;
  calculatedTotal: number;
  calculatedGrade: string;
  selectedStudentId: string | null;
}

const ResultsDialogs: React.FC<ResultsDialogsProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedResult,
  uniqueSessions,
  isCreateModalOpen,
  setIsCreateModalOpen,
  newResultForm,
  setNewResultForm,
  calculatedTotal,
  calculatedGrade,
  selectedStudentId,
}) => {
  return (
    <>
      {/* Edit Result Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Result</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                defaultValue={selectedResult?.course.title}
                disabled
                className="bg-slate-50"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="session">Session</Label>
                <Select
                  value={selectedResult?.session || ""}
                  onValueChange={(value) => {
                    // Update logic here if needed
                  }}
                >
                  <SelectTrigger id="session">
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueSessions.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select
                  value={selectedResult?.semester || ""}
                  onValueChange={(value) => {
                    // Update logic here if needed
                  }}
                >
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="First">First</SelectItem>
                    <SelectItem value="Second">Second</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ca">CA</Label>
                <Input id="ca" type="number" defaultValue={selectedResult?.ca} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exam">Exam</Label>
                <Input id="exam" type="number" defaultValue={selectedResult?.exam} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total">Total</Label>
                <Input
                  id="total"
                  type="number"
                  value={(selectedResult?.ca || 0) + (selectedResult?.exam || 0)}
                  disabled
                  className="bg-slate-50"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  alert("Update logic would go here");
                  setIsEditModalOpen(false);
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Result Dialog */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Result</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            {/* Student Details Section */}
            <div className="bg-slate-50 p-4 rounded-md border border-slate-100 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="matricNo">Student Matric No</Label>
                <Input
                  id="matricNo"
                  placeholder="e.g LASU/CYS/2024/..."
                  value={newResultForm.matricNo}
                  onChange={(e) =>
                    setNewResultForm({
                      ...newResultForm,
                      matricNo: e.target.value,
                    })
                  }
                  disabled={!!selectedStudentId}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentName">Student Name</Label>
                <Input
                  id="studentName"
                  placeholder="Student Full Name"
                  value={newResultForm.studentName}
                  onChange={(e) =>
                    setNewResultForm({
                      ...newResultForm,
                      studentName: e.target.value,
                    })
                  }
                  disabled={!!selectedStudentId}
                />
              </div>
            </div>

            {/* Course Details Section */}
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="courseCode">Course Code</Label>
                <Input
                  id="courseCode"
                  placeholder="e.g CSC101"
                  value={newResultForm.courseCode}
                  onChange={(e) =>
                    setNewResultForm({
                      ...newResultForm,
                      courseCode: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-3 space-y-2">
                <Label htmlFor="courseTitle">Course Title</Label>
                <Input
                  id="courseTitle"
                  placeholder="e.g Intro to Computer Science"
                  value={newResultForm.courseTitle}
                  onChange={(e) =>
                    setNewResultForm({
                      ...newResultForm,
                      courseTitle: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-1 space-y-2">
                <Label htmlFor="unit">Units</Label>
                <Input
                  id="unit"
                  type="number"
                  min={0}
                  max={6}
                  value={newResultForm.unit}
                  onChange={(e) =>
                    setNewResultForm({
                      ...newResultForm,
                      unit: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="session">Session</Label>
                <Select
                  value={newResultForm.session}
                  onValueChange={(value) =>
                    setNewResultForm({
                      ...newResultForm,
                      session: value,
                    })
                  }
                >
                  <SelectTrigger id="session">
                    <SelectValue placeholder="Select session" />
                  </SelectTrigger>
                  <SelectContent>
                    {["2024/2025", "2023/2024", "2022/2023"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="semester">Semester</Label>
                <Select
                  value={newResultForm.semester}
                  onValueChange={(value) =>
                    setNewResultForm({
                      ...newResultForm,
                      semester: value as "First" | "Second",
                    })
                  }
                >
                  <SelectTrigger id="semester">
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="First">First</SelectItem>
                    <SelectItem value="Second">Second</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Scores Section */}
            <div className="grid grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="ca">CA (0-30)</Label>
                <Input
                  id="ca"
                  type="number"
                  max={30}
                  value={newResultForm.ca}
                  onChange={(e) =>
                    setNewResultForm({
                      ...newResultForm,
                      ca: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exam">Exam (0-70)</Label>
                <Input
                  id="exam"
                  type="number"
                  max={70}
                  value={newResultForm.exam}
                  onChange={(e) =>
                    setNewResultForm({
                      ...newResultForm,
                      exam: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="total">Total</Label>
                <div className="flex h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-900">
                  {calculatedTotal}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade</Label>
                <div
                  className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm font-bold justify-center
                            ${
                              calculatedGrade === "A"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : calculatedGrade === "F"
                                ? "bg-red-100 text-red-700 border-red-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }
                        `}
                >
                  {calculatedGrade}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Mock Add logic
                  alert(`Result Created! Grade: ${calculatedGrade}`);
                  setIsCreateModalOpen(false);
                }}
                disabled={!newResultForm.matricNo || !newResultForm.courseCode}
              >
                Create Result
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResultsDialogs;