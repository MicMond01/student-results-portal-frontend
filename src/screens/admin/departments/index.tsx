// AdminDepartment.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateDepartmentMutation,
  useGetAllDepartmentsQuery,
  useUpdateADepartmentMutation,
} from "@/redux/query/admin-departments";
import { Building2, Plus, Search } from "lucide-react";
import { useState } from "react";
import DepartmentCard from "./DepartmentCard";
import ManageDepartmentDialog from "./ManageDepartmentDialog";
import { toast } from "sonner";
import { useAdminDepartmentStore } from "@/stores/useAdminDepartmentsStore";
import Banner from "@/components/ui-components/Banner";
import { FaBuilding } from "react-icons/fa";

export interface DepartmentFormData {
  hod: string;
  name: string;
  code: string;
  faculty: string;
  description: string;
  hodName: string;
  hodEmail: string;
  officeLocation: string;
  phone: string;
}

const AdminDepartment = () => {
  const { data: departments } = useGetAllDepartmentsQuery();
  const [createDepartmentTrigger, { isLoading: isCreating }] =
    useCreateDepartmentMutation();
  const [updateDepartmentTrigger, { isLoading: isUpdating }] =
    useUpdateADepartmentMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const { editingDept, openManageDialog, closeManageDialog } =
    useAdminDepartmentStore();

  // Filter logic
  const filteredDepartments = departments?.departments.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = async (data: DepartmentFormData) => {
    const toastId = toast.loading(
      editingDept ? "Updating Department..." : "Creating Department..."
    );

    try {
      const payload = editingDept
        ? data // when editing: submit everything
        : {
            name: data.name,
            code: data.code,
            faculty: data.faculty,
            description: data.description,
            phone: data.phone,
            officeLocation: data.officeLocation,
            ...(data.hod && { hod: data.hod }),
            ...(data.hodName && { hodName: data.hodName }),
            ...(data.hodEmail && { hodEmail: data.hodEmail }),
          };

      if (editingDept) {
        await updateDepartmentTrigger({
          id: editingDept._id,
          data: data,
        }).unwrap();
        toast.success("Dept. successfully updated!", { id: toastId });
      } else {
        await createDepartmentTrigger(payload).unwrap();
        toast.success("Dept. successfully created", { id: toastId });
      }
      closeManageDialog();
    } catch (error: any) {
      const message =
        error?.data?.msg || error?.data?.message || "An error occurred";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-380 space-y-8">
        <Banner
          title="Course Departments"
          desc="Manage faculty departments, HODs, and structure."
          actionButton={<FaBuilding className="text-primary" size={40} />}
          containterClass="mb-8"
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 max-w-md lg:w-120 bg-gray-100 border-0 shadow-sm"
              placeholder="Search departments by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button
            onClick={() => openManageDialog()}
            className="shadow-lg shadow-indigo-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Department
          </Button>
        </div>

        {/* Search Filter */}

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments?.map((dept) => (
            <DepartmentCard key={dept._id} dept={dept} />
          ))}

          {filteredDepartments?.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">
                No departments found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog - Only render on this page */}
      <ManageDepartmentDialog
        onSave={handleSave}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};

export default AdminDepartment;
