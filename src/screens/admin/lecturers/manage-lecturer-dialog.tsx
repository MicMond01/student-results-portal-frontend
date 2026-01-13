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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useAdminLecturersStore } from "@/stores/useAdminLecturersStore";
import PersonalInfoForm from "./components/PersonalInfoForm";
import AcademicEmploymentForm from "./components/AcademicEmploymentForm";

const ManageLecturerDialog: React.FC<{
  onSave: (data: LecturerFormData) => void;
  isLoading?: boolean;
}> = ({ onSave, isLoading }) => {
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

  const handleSelectChange = (
    name: keyof LecturerFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={isManageOpen} onOpenChange={setIsManageOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-[40vw]">
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
          <PersonalInfoForm
            formData={formData}
            isEditMode={isEditMode}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
          />
          <AcademicEmploymentForm
            formData={formData}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
          />

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
