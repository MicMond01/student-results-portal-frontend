// AcademicEmploymentForm.tsx (new file)
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { LecturerFormData } from "../type";

interface AcademicEmploymentFormProps {
  formData: LecturerFormData;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSelectChange: (
    name: keyof LecturerFormData,
    value: string | number
  ) => void;
}

const AcademicEmploymentForm: React.FC<AcademicEmploymentFormProps> = ({
  formData,
  onChange,
  onSelectChange,
}) => {
  const { data: allDepartments } = useGetAllDepartmentsQuery();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2 font-semibold text-gray-900 border-b pb-2 mb-2 mt-4">
        Academic & Employment Information
      </div>

      <div className="space-y-2">
        <Label>Staff ID</Label>
        <Input
          name="staffId"
          value={formData.staffId}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Department</Label>
        <Select
          value={formData.department}
          onValueChange={(value) => onSelectChange("department", value)}
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
          onValueChange={(value) => onSelectChange("rank", value)}
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
            <SelectItem value="Senior Lecturer">Senior Lecturer</SelectItem>
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
          onChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Years of Experience</Label>
        <Input
          type="number"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={onChange}
        />
      </div>

      <div className="space-y-2">
        <Label>Highest Degree</Label>
        <Input
          name="highestDegree"
          value={formData.highestDegree}
          onChange={onChange}
          placeholder="e.g. PhD in Cybersecurity"
        />
      </div>

      <div className="space-y-2">
        <Label>Institution</Label>
        <Input
          name="institution"
          value={formData.institution}
          onChange={onChange}
          placeholder="University where degree was obtained"
        />
      </div>

      <div className="space-y-2">
        <Label>Office Location</Label>
        <Input
          name="officeLocation"
          value={formData.officeLocation}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default AcademicEmploymentForm;
