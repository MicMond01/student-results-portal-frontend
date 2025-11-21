import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import { useGetLecturersByDepartmentQuery } from "@/redux/query/admin-lecturers";
import { useAdminCoursesStore } from "@/stores/useAdminCoursesStore";

type CourseFormData = {
  title: string;
  code: string;
  creditUnit: number;
  semester: "First" | "Second";
  level: 100 | 200 | 300 | 400 | 500 | 600;
  session: string;
  lecturer: string; // Will store lecturer ID
  department: string; // Will store department ID
  courseType: string;
  description: string;
  maxStudents: number | null;
};

const ManageCourseDialog: React.FC<{
  onSave: (formData: CourseFormData) => void;
  isUpdatingCourse: boolean;
  isCreatingCourse: boolean;
}> = ({ onSave, isUpdatingCourse, isCreatingCourse }) => {
  const [departmentId, setDepartmentId] = useState("");
  const { data: departmentList } = useGetAllDepartmentsQuery();
  const { data: lecturersByDepartment, isLoading: isLoadingLecturers } =
    useGetLecturersByDepartmentQuery(departmentId, {
      skip: !departmentId,
    });

  const {
    isDialogOpen,
    editingCourse: course,
    setIsDialogOpen,
  } = useAdminCoursesStore();

  const isEditMode = course !== null;
  const [formData, setFormData] = useState<CourseFormData>({
    title: course?.title || "",
    code: course?.code || "",
    creditUnit: course?.creditUnit || 0,
    semester: (course?.semester as "First" | "Second") || "First",
    level: (course?.level as 100 | 200 | 300 | 400 | 500 | 600) || 100, // changed: cast to union type to match CourseFormData type
    session: course?.session || "",
    lecturer: course?.lecturer._id || "",
    department: course?.department._id || "",
    courseType: course?.courseType || "Core",
    description: course?.description || "",
    maxStudents: course?.maxStudents || null,
  });

  // Reset form when dialog opens for a new course or different course
  useEffect(() => {
    if (isDialogOpen) {
      setFormData({
        title: course?.title || "",
        code: course?.code || "",
        creditUnit: course?.creditUnit || 0,
        semester: (course?.semester as "First" | "Second") || "First",
        level: (course?.level as 100 | 200 | 300 | 400 | 500 | 600) || 100,
        session: course?.session || "",
        lecturer: course?.lecturer._id || "",
        department: course?.department._id || "",
        courseType: course?.courseType || "Core",
        description: course?.description || "",
        maxStudents: course?.maxStudents || null,
      });
    }

    if (isDialogOpen && course) {
      setDepartmentId(course.department._id);
    }
  }, [course, isDialogOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        e.target.type === "number"
          ? value
            ? parseInt(value)
            : null
          : name === "level"
          ? parseInt(value) // changed: parse level as number
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave(formData);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto p-6">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Course" : "Create New Course"}
            </DialogTitle>
            <DialogDescription>
              Fill in the details for the course.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session">Session</Label>
              <Input
                id="session"
                name="session"
                value={formData.session}
                onChange={handleChange}
                placeholder="e.g., 2024/2025"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="semester">Semester</Label>
              <Select
                value={formData.semester}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    semester: value as "First" | "Second",
                  }))
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
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={String(formData.level)}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    level: Number(value) as 100 | 200 | 300 | 400 | 500 | 600,
                  }))
                }
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="100">100 Level</SelectItem>
                  <SelectItem value="200">200 Level</SelectItem>
                  <SelectItem value="300">300 Level</SelectItem>
                  <SelectItem value="400">400 Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditUnit">Credit Units</Label>
              <Input
                id="creditUnit"
                name="creditUnit"
                type="number"
                value={formData.creditUnit}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, department: value }));
                  setDepartmentId(value);
                }}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departmentList?.departments.map((d) => (
                    <SelectItem key={d._id} value={d._id}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lecturer">Lecturer</Label>
              <Select
                value={formData.lecturer}
                disabled={!formData.department || isLoadingLecturers}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, lecturer: value }))
                }
              >
                <SelectTrigger id="lecturer">
                  <SelectValue placeholder="Select Lecturer" />
                </SelectTrigger>
                <SelectContent>
                  {lecturersByDepartment?.lecturers.map((l) => (
                    <SelectItem key={l._id} value={l._id}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="courseType">Course Type</Label>
              {/* changed: use shadcn/ui Select API with SelectTrigger, SelectValue, SelectContent, SelectItem */}
              <Select
                value={formData.courseType}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, courseType: value }))
                }
              >
                <SelectTrigger id="courseType">
                  <SelectValue placeholder="Select course type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Core">Core</SelectItem>
                  <SelectItem value="Elective">Elective</SelectItem>
                  <SelectItem value="General">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxStudents">Max Students (Optional)</Label>
              <Input
                id="maxStudents"
                name="maxStudents"
                type="number"
                value={formData.maxStudents || 0}
                onChange={handleChange}
                placeholder="e.g., 100"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter course description..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isUpdatingCourse || isCreatingCourse}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {isEditMode
                ? `${isUpdatingCourse ? "Updating..." : "Save Changes"} `
                : `${isCreatingCourse ? "Creating..." : "Create Course"}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCourseDialog;
