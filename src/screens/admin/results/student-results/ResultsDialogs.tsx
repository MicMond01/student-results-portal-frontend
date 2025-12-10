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
import { useResultsDialog } from "@/lib/hooks/useResultsDialog";

interface ResultsDialogsProps {
  uniqueSessions: string[];
  calculatedTotal: number;
  calculatedGrade: string;
  onSave: () => void;
}

const ResultsDialogs: React.FC<ResultsDialogsProps> = ({
  uniqueSessions,
  calculatedTotal,
  calculatedGrade,
  onSave,
}) => {
  const dialog = useResultsDialog();

  return (
    <>
      <Dialog open={dialog.modals.isEditOpen} onOpenChange={dialog.closeModals}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Result</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Student Info - Disabled */}
            <div className="bg-slate-50 p-4 rounded-md border border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Matric No</Label>
                  <Input value={dialog.resultForm.matricNo} disabled />
                </div>
                <div className="space-y-2">
                  <Label>Student Name</Label>
                  <Input value={dialog.resultForm.studentName} disabled />
                </div>
              </div>
            </div>

            {/* Course Info - Disabled */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-courseCode">Course Code</Label>
                <Input
                  id="edit-courseCode"
                  value={dialog.resultForm.courseCode}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-courseTitle">Course Title</Label>
                <Input
                  id="edit-courseTitle"
                  value={dialog.resultForm.courseTitle}
                  disabled
                />
              </div>
            </div>

            {/* Session & Semester */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-session">Session</Label>
                <Select
                  value={dialog.resultForm.session}
                  onValueChange={(value) =>
                    dialog.updateResultForm({ session: value })
                  }
                >
                  <SelectTrigger id="edit-session">
                    <SelectValue />
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
                <Label htmlFor="edit-semester">Semester</Label>
                <Select
                  value={dialog.resultForm.semester}
                  onValueChange={(value: "First" | "Second") =>
                    dialog.updateResultForm({ semester: value })
                  }
                >
                  <SelectTrigger id="edit-semester">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="First">First</SelectItem>
                    <SelectItem value="Second">Second</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Scores */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-ca">CA (0-30)</Label>
                <Input
                  id="edit-ca"
                  type="number"
                  min={0}
                  max={30}
                  value={dialog.resultForm.ca}
                  onChange={(e) =>
                    dialog.updateResultForm({ ca: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-exam">Exam (0-60)</Label>
                <Input
                  id="edit-exam"
                  type="number"
                  min={0}
                  max={60}
                  value={dialog.resultForm.exam}
                  onChange={(e) =>
                    dialog.updateResultForm({ exam: Number(e.target.value) })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Total</Label>
                <div className="flex h-10 items-center rounded-md border bg-slate-50 px-3 font-bold">
                  {calculatedTotal}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={dialog.closeModals}>
              Cancel
            </Button>
            <Button onClick={onSave} disabled={!dialog.isFormValid}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialog.modals.isCreateOpen}
        onOpenChange={dialog.closeModals}
      >
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Result</DialogTitle>
          </DialogHeader>
          <div className="space-y-5">
            {/* Step 1: Select Department */}
            <div className="space-y-2">
              <Label
                htmlFor="create-department"
                className="text-base font-semibold"
              >
                1. Select Department
              </Label>
              <Select
                value={dialog.resultForm.departmentId}
                onValueChange={dialog.handleDepartmentChange}
              >
                <SelectTrigger id="create-department">
                  <SelectValue placeholder="Choose department first" />
                </SelectTrigger>
                <SelectContent>
                  {dialog.departments?.departments?.map((dept: any) => (
                    <SelectItem key={dept._id} value={dept._id}>
                      {dept.name} ({dept.code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Step 2: Select Student */}
            {dialog.resultForm.departmentId && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label
                  htmlFor="create-student"
                  className="text-base font-semibold"
                >
                  2. Select Student
                </Label>
                <Select
                  value={dialog.resultForm.studentId}
                  onValueChange={dialog.handleStudentChange}
                >
                  <SelectTrigger id="create-student">
                    <SelectValue placeholder="Choose student" />
                  </SelectTrigger>
                  <SelectContent>
                    {dialog.students?.students?.map((student: any) => (
                      <SelectItem key={student._id} value={student._id}>
                        {student.name} - {student.matricNo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Step 3: Enter Course & Result Details */}
            {dialog.resultForm.studentId && (
              <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
                <Label className="text-base font-semibold">
                  3. Enter Course & Result Details
                </Label>

                {/* Selected Student Info */}
                <div className="bg-primary-50 p-4 rounded-md border border-primary-100">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Matric No:</span>{" "}
                      <span className="font-semibold">
                        {dialog.resultForm.matricNo}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-600">Name:</span>{" "}
                      <span className="font-semibold">
                        {dialog.resultForm.studentName}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Course Selection Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="create-course">Select Course</Label>
                  <Select
                    value={dialog.resultForm.courseId}
                    onValueChange={dialog.handleCourseChange}
                  >
                    <SelectTrigger id="create-course">
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {dialog?.courses?.map((course: any) => (
                        <SelectItem key={course._id} value={course._id}>
                          {course.code} - {course.title} ({course.creditUnit}{" "}
                          units)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Course Details - Auto-filled from selection */}
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="create-courseCode">Course Code</Label>
                    <Input
                      id="create-courseCode"
                      placeholder="Auto-filled"
                      value={dialog.resultForm.courseCode}
                      disabled
                      className="bg-slate-50"
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label htmlFor="create-courseTitle">Course Title</Label>
                    <Input
                      id="create-courseTitle"
                      placeholder="Auto-filled"
                      value={dialog.resultForm.courseTitle}
                      disabled
                      className="bg-slate-50"
                    />
                  </div>
                  <div className="col-span-1 space-y-2">
                    <Label htmlFor="create-unit">Units</Label>
                    <Input
                      id="create-unit"
                      type="number"
                      value={dialog.resultForm.unit}
                      disabled
                      className="bg-slate-50"
                    />
                  </div>
                </div>

                {/* Session & Semester */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="create-session">Session</Label>
                    <Select
                      value={dialog.resultForm.session}
                      onValueChange={(value) =>
                        dialog.updateResultForm({ session: value })
                      }
                    >
                      <SelectTrigger id="create-session">
                        <SelectValue />
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
                    <Label htmlFor="create-semester">Semester</Label>
                    <Select
                      value={dialog.resultForm.semester}
                      onValueChange={(value: "First" | "Second") =>
                        dialog.updateResultForm({ semester: value })
                      }
                    >
                      <SelectTrigger id="create-semester">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="First">First</SelectItem>
                        <SelectItem value="Second">Second</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Scores */}
                <div className="grid grid-cols-4 gap-4 items-end">
                  <div className="space-y-2">
                    <Label htmlFor="create-ca">CA (0-30)</Label>
                    <Input
                      id="create-ca"
                      type="number"
                      min={0}
                      max={30}
                      value={dialog.resultForm.ca}
                      onChange={(e) =>
                        dialog.updateResultForm({ ca: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="create-exam">Exam (0-60)</Label>
                    <Input
                      id="create-exam"
                      type="number"
                      min={0}
                      max={60}
                      value={dialog.resultForm.exam}
                      onChange={(e) =>
                        dialog.updateResultForm({
                          exam: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Total</Label>
                    <div className="flex h-10 items-center rounded-md border bg-slate-50 px-3 font-bold">
                      {calculatedTotal}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Grade</Label>
                    <div
                      className={`flex h-10 items-center justify-center rounded-md border px-3 font-bold
                        ${
                          calculatedGrade === "A"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : calculatedGrade === "F"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                    >
                      {calculatedGrade}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={dialog.closeModals}>
              Cancel
            </Button>
            <Button onClick={onSave} disabled={!dialog.isFormValid}>
              Create Result
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResultsDialogs;
