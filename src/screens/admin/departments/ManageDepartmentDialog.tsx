// ManageDepartmentDialog.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetLecturersByDepartmentQuery } from "@/redux/query/admin-lecturers";
import type { DepartmentFormData } from ".";
import { useAdminDepartmentStore } from "@/stores/useAdminDepartmentsStore";

const ManageDepartmentDialog: React.FC<{
  onSave: (data: DepartmentFormData) => void;
  isLoading?: boolean;
}> = ({ onSave, isLoading }) => {
  const { editingDept: department, isManageOpen, closeManageDialog } = 
    useAdminDepartmentStore();

  const isEditMode = !!department;

  const { data: lecturersByDepartment, isLoading: isLoadingLecturers } =
    useGetLecturersByDepartmentQuery(department?._id, {
      skip: !department?._id,
    });

  const [formData, setFormData] = useState<DepartmentFormData>({
    name: "",
    code: "",
    faculty: "Faculty of Science",
    description: "",
    hod: "",
    hodName: "",
    hodEmail: "",
    officeLocation: "",
    phone: "",
  });

  useEffect(() => {
    if (isManageOpen) {
      setFormData(
        department
          ? {
              hod: department.hod || "",
              name: department.name,
              code: department.code,
              faculty: department.faculty,
              description: department.description || "",
              hodName: department.hodName || "",
              hodEmail: department.hodEmail || "",
              officeLocation: department.officeLocation || "",
              phone: department.phone || "",
            }
          : {
              name: "",
              code: "",
              faculty: "Faculty of Science",
              description: "",
              hod: "",
              hodName: "",
              hodEmail: "",
              officeLocation: "",
              phone: "",
            }
      );
    }
  }, [isManageOpen, department]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isManageOpen} onOpenChange={closeManageDialog}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Department" : "Create Department"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the details of the department below."
              : "Add a new department to the faculty."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Department Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                placeholder="e.g. Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Department Code</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                required
                placeholder="e.g. CS"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="faculty">Faculty</Label>
              <Input
                id="faculty"
                value={formData.faculty}
                onChange={(e) =>
                  setFormData({ ...formData, faculty: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of the department..."
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <User className="h-4 w-4" /> Head of Department (HOD) Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* HOD Select */}
                <div className="space-y-2">
                  <Label htmlFor="hodId">Select HOD (Lecturer)</Label>
                  <Select
                    disabled={
                      !isEditMode ||
                      isLoadingLecturers ||
                      lecturersByDepartment?.lecturers.length === 0
                    }
                    value={formData?.hod}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        hod: value,
                        hodName:
                          lecturersByDepartment?.lecturers.find(
                            (l) => l._id === value
                          )?.name || "",
                        hodEmail:
                          lecturersByDepartment?.lecturers.find(
                            (l) => l._id === value
                          )?.email || "",
                      }))
                    }
                  >
                    <SelectTrigger id="hodId">
                      <SelectValue placeholder="Select Lecturer" />
                    </SelectTrigger>
                    <SelectContent>
                      {lecturersByDepartment?.lecturers?.map((l) => (
                        <SelectItem key={l._id} value={l._id}>
                          {l.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Email Autopopulated */}
                <div className="space-y-2">
                  <Label htmlFor="hodEmail">HOD Email</Label>
                  <Input
                    id="hodEmail"
                    type="email"
                    value={formData.hodEmail}
                    disabled
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+234..."
                  />
                </div>

                {/* Office Location */}
                <div className="space-y-2">
                  <Label htmlFor="office">Office Location</Label>
                  <Input
                    id="office"
                    value={formData.officeLocation}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        officeLocation: e.target.value,
                      })
                    }
                    placeholder="Block A, Room 1"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => closeManageDialog()}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : isEditMode ? (
                "Save Changes"
              ) : (
                "Create Department"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageDepartmentDialog;