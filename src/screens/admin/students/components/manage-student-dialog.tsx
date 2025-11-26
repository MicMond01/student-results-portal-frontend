import { useEffect, useState } from "react";
import type { StudentFormData } from "../types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import { useAdminStudentsStore } from "@/stores/useAdminStudentsStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ManageStudentDialog: React.FC<{
  onSave: (data: StudentFormData) => void;
  isUpdatingStudent: boolean;
  isCreatingStudent: boolean;
}> = ({ onSave, isUpdatingStudent, isCreatingStudent }) => {
  const { data: allDepartments } = useGetAllDepartmentsQuery();

  const {
    editingStudent: student,
    isDialogOpen,
    setIsDialogOpen,
  } = useAdminStudentsStore();

  const isEditMode = !!student;
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    email: "",
    phone: "",
    matricNo: "",
    jambNo: "",
    department: "",
    level: 100,
    program: "",
    gender: "",
    address: "",
    academicAdvisor: "",
  });

  useEffect(() => {
    if (isDialogOpen) {
      setFormData(
        student
          ? {
              name: student.name,
              email: student.email,
              phone: student.phone,
              matricNo: student.matricNo,
              jambNo: student.jambNo,
              department: student.department._id,
              level: student.level,
              program: student.program,
              gender: student.gender,
              address: student.address,
              academicAdvisor: student.academicAdvisor,
            }
          : {
              name: "",
              email: "",
              phone: "",
              matricNo: "",
              jambNo: "",
              department: "",
              level: 100,
              program: "",
              gender: "",
              address: "",
              academicAdvisor: "",
            }
      );
    }
  }, [isDialogOpen, student]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Student Profile" : "Register New Student"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>Full Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-span-2">
              <Label>Email Address</Label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, gender: value }));
                }}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="Male" value="Male">
                    Male
                  </SelectItem>
                  <SelectItem key="Female" value="Female">
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Matric No</Label>
              <Input
                name="matricNo"
                value={formData.matricNo}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label>JAMB No</Label>
              <Input
                name="jambNo"
                value={formData.jambNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <Label>Program</Label>
              <Input
                name="program"
                value={formData.program}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, department: value }));
                }}
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {allDepartments?.departments.map((d) => (
                    <SelectItem key={d._id} value={d._id}>
                      {d.name}
                    </SelectItem>
                  ))}
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
            <div className="col-span-2">
              <Label>Academic Advisor</Label>
              <Input
                name="academicAdvisor"
                value={formData.academicAdvisor}
                onChange={handleChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isUpdatingStudent || isCreatingStudent}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdatingStudent || isCreatingStudent}
            >
              {isEditMode
                ? `${isUpdatingStudent ? "Updating..." : "Save Changes"} `
                : `${isCreatingStudent ? "Creating..." : "Create Course"}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageStudentDialog;
