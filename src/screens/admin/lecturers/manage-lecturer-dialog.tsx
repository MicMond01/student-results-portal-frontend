import { useEffect, useState } from "react";
import type { LecturerFormData } from "./type";
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import { useAdminLecturersStore } from "@/stores/useAdminLecturersStore";

const ManageLecturerDialog: React.FC<{
  onSave: (data: LecturerFormData) => void;
  isLoading?: boolean;
}> = ({ onSave, isLoading }) => {
  const { data: allDepartments } = useGetAllDepartmentsQuery();

  const {
    setIsManageOpen,
    isManageOpen,
    editingLecturer: lecturer,
  } = useAdminLecturersStore();

  const isEditMode = !!lecturer;

  const [formData, setFormData] = useState<LecturerFormData>({
    name: "",
    email: "",
    identifier: "",
    password: "",
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
  });

  useEffect(() => {
    if (isManageOpen) {
      setFormData(
        lecturer
          ? {
              name: lecturer.name,
              email: lecturer.email || "",
              identifier: lecturer.identifier || "",
              password: "", // never prefill passwords
              phone: lecturer.phone || "",
              gender: lecturer.gender || "",
              dateOfBirth: lecturer.dateOfBirth
                ? new Date(lecturer.dateOfBirth).toISOString().split("T")[0]
                : "",
              address: lecturer.address || "",
              staffId: lecturer.staffId || "",
              department: lecturer.department?._id || "",
              rank: lecturer.rank || "",
              specialization: lecturer.specialization || "",
              yearsOfExperience: lecturer.yearsOfExperience || 0,
              highestDegree: lecturer.highestDegree || "",
              institution: lecturer.institution || "",
              officeLocation: lecturer.officeLocation || "",
            }
          : {
              name: "",
              email: "",
              identifier: "",
              password: "",
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
            }
      );
    }
  }, [isManageOpen, lecturer]);

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
    <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
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
          {/* PERSONAL INFORMATION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="identifier">Identifier</Label>
              <Input
                id="identifier"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
                placeholder="Lecturer unique identifier"
              />
            </div>

            {!isEditMode && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

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
              <Label>Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, gender: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Address</Label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* ACADEMIC + EMPLOYMENT INFO */}
            <div className="md:col-span-2 font-semibold text-gray-900 border-b pb-2 mb-2 mt-4">
              Academic & Employment Information
            </div>

            <div className="space-y-2">
              <Label>Staff ID</Label>
              <Input
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Select
                value={formData.department}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger>
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
              <Label>Rank</Label>
              <Select
                value={formData.rank}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, rank: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Rank" />
                </SelectTrigger>
                <SelectContent>
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
              <Label>Specialization</Label>
              <Input
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Years of Experience</Label>
              <Input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Highest Degree</Label>
              <Input
                name="highestDegree"
                value={formData.highestDegree}
                onChange={handleChange}
                placeholder="e.g. PhD in Cybersecurity"
              />
            </div>

            <div className="space-y-2">
              <Label>Institution</Label>
              <Input
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="University where degree was obtained"
              />
            </div>

            <div className="space-y-2">
              <Label>Office Location</Label>
              <Input
                name="officeLocation"
                value={formData.officeLocation}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsManageOpen(false)}
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
