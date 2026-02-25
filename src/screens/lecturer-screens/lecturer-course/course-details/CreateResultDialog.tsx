import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { Course } from "./types";

interface CreateResultDialogProps {
  courses?: Course;
  onSubmit: (data: ResultFormData) => Promise<void>;
  isLoading?: boolean;
  defaultSession: string;
  defaultCourse: string;
  open: boolean;
  setOpen: (v: boolean) => void;
  selectedStudent?: string;
}

export interface ResultFormData {
  student: string;
  course: string;
  ca: number;
  exam: number;
  semester: string;
  session: string;
}

const initialFormState: ResultFormData = {
  student: "",
  course: "",
  ca: 0,
  exam: 0,
  semester: "",
  session: "",
};

const semesters = ["First", "Second"];

const currentYear = new Date().getFullYear();
const sessions = [
  `${currentYear - 2}/${currentYear - 1}`,
  `${currentYear - 1}/${currentYear}`,
  `${currentYear}/${currentYear + 1}`,
];

export function CreateResultDialog({
  courses,
  onSubmit,
  isLoading: externalLoading = false,
  defaultSession,
  defaultCourse,
  selectedStudent,
  open,
  setOpen,
}: CreateResultDialogProps) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof ResultFormData, string>>
  >({});

  const initialForm = useMemo<ResultFormData>(() => {
    return {
      student: selectedStudent || "",
      course: defaultCourse || "",
      ca: 0,
      exam: 0,
      semester: courses?.semester ?? "",
      session: courses?.session || "",
    };
  }, [defaultCourse, defaultSession, courses, selectedStudent]);

  const [formData, setFormData] = useState<ResultFormData>(initialForm);

  useEffect(() => {
    if (open) {
      setFormData(initialForm);
    }
  }, [open, initialForm]);

  const handleOpenChange = (state: boolean) => {
    setOpen(state);
    if (!state) {
      setErrors({});
    }
  };

  const handleInputChange = (
    field: keyof ResultFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ResultFormData, string>> = {};

    if (!formData.student.trim()) {
      newErrors.student = "Please enter student matric number";
    }
    if (!formData.course) {
      newErrors.course = "Please select a course";
    }
    if (formData.ca < 0 || formData.ca > 40) {
      newErrors.ca = "CA must be between 0 and 40";
    }
    if (formData.exam < 0 || formData.exam > 60) {
      newErrors.exam = "Exam must be between 0 and 60";
    }
    if (!formData.semester) {
      newErrors.semester = "Please select a semester";
    }
    if (!formData.session) {
      newErrors.session = "Please select a session";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      setOpen(false);
      setFormData(initialFormState);

      setErrors({});
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Submit Form");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setFormData(initialFormState);
    setErrors({});
  };

  const totalScore = formData.ca + formData.exam;
  const isLoading = externalLoading;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogContent key="create-result-modal" className="sm:max-w-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <DialogHeader>
                <DialogTitle>Create New Result</DialogTitle>
                <DialogDescription>
                  Enter the student's matric number and result information. All
                  fields are required.
                </DialogDescription>
              </DialogHeader>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="space-y-6 py-4"
              >
                {/* Student Identifier Input */}
                <div className="space-y-2">
                  <Label htmlFor="student">
                    Student Matric Number{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="student"
                    type="text"
                    placeholder="e.g., CSC/2020/001"
                    value={formData.student}
                    disabled={!!selectedStudent}
                    onChange={(e) =>
                      handleInputChange("student", e.target.value.trim())
                    }
                    className={errors.student ? "border-destructive" : ""}
                  />
                  {errors.student && (
                    <p className="text-xs text-destructive">{errors.student}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Enter the student's matric number
                  </p>
                </div>

                {/* Course Selection */}
                <div className="space-y-2">
                  <Label htmlFor="course">
                    Course <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.course}
                    onValueChange={(value) =>
                      handleInputChange("course", value)
                    }
                    disabled={!!defaultCourse}
                  >
                    <SelectTrigger
                      id="course"
                      className={errors.course ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent className="bg-bg-2">
                      <SelectItem key={courses?._id} value={courses?._id || ""}>
                        {courses?.code} - {courses?.title}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.course && (
                    <p className="text-xs text-destructive">{errors.course}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* CA Score */}
                  <div className="space-y-2">
                    <Label htmlFor="ca">
                      CA Score <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="ca"
                      type="number"
                      min="0"
                      max="40"
                      placeholder="0-40"
                      value={formData.ca || ""}
                      onChange={(e) =>
                        handleInputChange("ca", Number(e.target.value))
                      }
                      className={errors.ca ? "border-destructive" : ""}
                    />
                    {errors.ca && (
                      <p className="text-xs text-destructive">{errors.ca}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Maximum: 40 marks
                    </p>
                  </div>

                  {/* Exam Score */}
                  <div className="space-y-2">
                    <Label htmlFor="exam">
                      Exam Score <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="exam"
                      type="number"
                      min="0"
                      max="60"
                      placeholder="0-60"
                      value={formData.exam || ""}
                      onChange={(e) =>
                        handleInputChange("exam", Number(e.target.value))
                      }
                      className={errors.exam ? "border-destructive" : ""}
                    />
                    {errors.exam && (
                      <p className="text-xs text-destructive">{errors.exam}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Maximum: 60 marks
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Semester */}
                  <div className="space-y-2">
                    <Label htmlFor="semester">
                      Semester <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.semester}
                      onValueChange={(value) =>
                        handleInputChange("semester", value)
                      }
                    >
                      <SelectTrigger
                        id="semester"
                        className={errors.semester ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border cursor-pointer">
                        {semesters.map((semester) => (
                          <SelectItem key={semester} value={semester}>
                            {semester} Semester
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.semester && (
                      <p className="text-xs text-destructive">
                        {errors.semester}
                      </p>
                    )}
                  </div>

                  {/* Session */}
                  <div className="space-y-2">
                    <Label htmlFor="session">
                      Session <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.session}
                      onValueChange={(value) =>
                        handleInputChange("session", value)
                      }
                    >
                      <SelectTrigger
                        id="session"
                        className={errors.session ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Select session" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border cursor-pointer">
                        {sessions.map((session) => (
                          <SelectItem key={session} value={session}>
                            {session}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.session && (
                      <p className="text-xs text-destructive">
                        {errors.session}
                      </p>
                    )}
                  </div>
                </div>

                {/* Total Score Preview */}
                {(formData.ca > 0 || formData.exam > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/5 border border-primary/20 p-4 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total Score</span>
                      <span className="text-2xl font-bold text-primary">
                        {totalScore}/100
                      </span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-primary text-primary-foreground"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Creating..." : "Create Result"}
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
