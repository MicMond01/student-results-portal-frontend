import Table from "@/components/table/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "@/redux/query/admin-students";
import { useMemo, useState } from "react";
import type { IAdminStudent, StudentFilterState } from "./types";
import { studentsListTableHeaders } from "./table-config/students-table-headers";
import StudentsFilters from "./table-config/students-filters";
import { toast } from "sonner";
import { useAdminStudentsStore } from "@/stores/useAdminStudentsStore";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import Banner from "@/components/ui-components/Banner";
import { PiStudentBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import BulkUploadDialog from "./components/BulkUploadDialog";

const StudentListPage = () => {
  const { data: students, isLoading: isLoadingStudents } =
    useGetAllStudentsQuery();
  const [deleteStudentTrigger, { isLoading: isDeleting }] =
    useDeleteStudentMutation();
  const navigate = useNavigate();

  const [filters, setFilters] = useState<StudentFilterState>({
    query: "",
    department: "all",
    level: "all",
    status: "all",
  });

  const { handleEdit, onCreateNew, setIsBulkUploadOpen } =
    useAdminStudentsStore();

  const uniqueLevels = useMemo(() => {
    if (!students?.students) return [];
    return [...new Set(students.students.map((c) => c.level))];
  }, [students]);

  const handleDeleteStudent = async (id: string) => {
    const toastId = toast.loading("Deleting Student...");

    try {
      await deleteStudentTrigger(id).unwrap();

      toast.success("Student successfully Deleted!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Delete Student", {
        id: toastId,
      });
    }
  };

  const handleViewDetails = (student: IAdminStudent) => {
    navigate(`/admin/students/${student._id}`);
  };

  const filteredStudents = useMemo(() => {
    return (
      students?.students?.filter((s) => {
        const query = filters.query.toLowerCase();
        const matchesQuery =
          s.name?.toLowerCase().includes(query) ||
          s.matricNo?.toLowerCase().includes(query) ||
          s.identifier?.includes(query);

        const matchesDept =
          filters.department === "all" ||
          s.department?._id === filters.department;

        const matchesLevel =
          filters.level === "all" || s.level?.toString() === filters.level;

        const matchesStatus =
          filters.status === "all" || s.status === filters.status;

        return matchesQuery && matchesDept && matchesLevel && matchesStatus;
      }) ?? []
    );
  }, [students, filters]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Student Management Directory
          </h1>
          <p className="text-slate-500">
            View, create, and manage all students in the university.
          </p>
        </div>

        <div className="flex gap-4 ml-auto">
          <Button variant="outline" onClick={() => setIsBulkUploadOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Bulk Upload
          </Button>
          <Button onClick={onCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            Create Student
          </Button>
        </div>
      </div>

      <StudentsFilters
        filters={filters}
        setFilters={setFilters}
        uniqueLevels={uniqueLevels}
      />

      <Card>
        <CardContent className="p-0">
          <Table
            header={studentsListTableHeaders(
              handleViewDetails,
              handleEdit,
              handleDeleteStudent,
              isDeleting
            )}
            isLoading={isLoadingStudents}
            rows={filteredStudents || []}
            id="_id"
          />
        </CardContent>
      </Card>

      <BulkUploadDialog />
    </div>
  );
};

export default StudentListPage;
