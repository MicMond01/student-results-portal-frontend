import { useEffect, useState } from "react";
import type { IAdminLecturer, LecturerFormData } from "./type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";

const ManageLecturerDialog: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lecturer: IAdminLecturer | null;
  onSave: (data: LecturerFormData) => void;
  isLoading?: boolean;
}> = ({ open, onOpenChange, lecturer, onSave, isLoading }) => {
  const { data: allDepartments } = useGetAllDepartmentsQuery();

  const isEditMode = !!lecturer;
  const [formData, setFormData] = useState<LecturerFormData>({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    staffId: "",
    department: "",
    rank: "",
    specialization: "",
    yearsOfExperience: 0,
    highestDegree: "",
    institution: "",
    officeLocation: "",
    isHod: false,
  });

  useEffect(() => {
    if (open) {
      setFormData(
        lecturer
          ? {
              name: lecturer.name,
              email: lecturer.identifier || lecturer.email || "",
              phone: lecturer.phone || "",
              gender: lecturer.gender || "",
              dateOfBirth: lecturer.dateOfBirth
                ? new Date(lecturer.dateOfBirth).toISOString().split("T")[0]
                : "",
              address: lecturer.address || "",
              staffId: lecturer.staffId || "",
              department: lecturer.department._id || "",
              rank: lecturer.rank || "",
              specialization: lecturer.specialization || "",
              yearsOfExperience: lecturer.yearsOfExperience || 0,
              highestDegree: lecturer.highestDegree || "",
              institution: lecturer.institution || "",
              officeLocation: lecturer.officeLocation || "",
              isHod: lecturer.isHod || false,
            }
          : {
              name: "",
              email: "",
              phone: "",
              gender: "",
              dateOfBirth: "",
              address: "",
              staffId: "",
              department: "",
              rank: "",
              specialization: "",
              yearsOfExperience: 0,
              highestDegree: "",
              institution: "",
              officeLocation: "",
              isHod: false,
            }
      );
    }
  }, [open, lecturer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Lecturer" : "Add New Lecturer"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update the lecturer's information below."
              : "Enter the details for the new lecturer."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Personal Info */}
            <div className="md:col-span-2 font-semibold text-gray-900 border-b pb-2 mb-2">
              Personal Information
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Dr. John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@university.edu"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData?.gender}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    gender: value,
                  }))
                }
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={"select"} value={"select"}>
                    Select Gender
                  </SelectItem>
                  <SelectItem key={"male"} value={"Male"}>
                    Male
                  </SelectItem>
                  <SelectItem key={"female"} value={"Female"}>
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Academic Info */}
            <div className="md:col-span-2 font-semibold text-gray-900 border-b pb-2 mb-2 mt-4">
              Academic & Employment
            </div>
            <div className="space-y-2">
              <Label htmlFor="staffId">Staff ID</Label>
              <Input
                id="staffId"
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                required
                placeholder="e.g. UN/CS/001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">department</Label>
              <Select
                value={formData?.department}
                required
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    department: value,
                  }))
                }
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {allDepartments?.departments.map((l) => (
                    <SelectItem key={l._id} value={l._id}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rank">Rank</Label>
              <Select
                value={formData?.rank}
                required
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    rank: value,
                  }))
                }
              >
                <SelectTrigger id="rank">
                  <SelectValue placeholder="Select Rank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Select Rank</SelectItem>
                  <SelectItem value="Graduate Assistant">
                    Graduate Assistant
                  </SelectItem>
                  <SelectItem value="Assistant Lecturer">
                    Assistant Lecturer
                  </SelectItem>
                  <SelectItem value="Lecturer II">Lecturer II</SelectItem>
                  <SelectItem value="Lecturer I">Lecturer I</SelectItem>
                  <SelectItem value="Senior Lecturer">
                    Senior Lecturer
                  </SelectItem>
                  <SelectItem value="Associate Professor">
                    Associate Professor
                  </SelectItem>
                  <SelectItem value="Professor">Professor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="e.g. AI, Security"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="officeLocation">Office Location</Label>
              <Input
                id="officeLocation"
                name="officeLocation"
                value={formData.officeLocation}
                onChange={handleChange}
                placeholder="Block A, Room 1"
              />
            </div>
            <div className="space-y-2 flex items-center pt-6">
              <div className="flex items-center space-x-2">
                {/* <Checkbox
                  id="isHod"
                  checked={formData.isHod}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      isHod: e.target.checked,
                    }))
                  }
                /> */}
                <Label
                  htmlFor="isHod"
                  className="mb-0 cursor-pointer text-indigo-700 font-medium"
                >
                  Assign as HOD
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
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
                "Add Lecturer"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageLecturerDialog;
