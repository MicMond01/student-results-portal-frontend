import Table from "@/components/table/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "@/redux/query/admin-students";
import { useMemo, useState } from "react";
import type { StudentFilterState } from "./types";
import { studentsListTableHeaders } from "./table-config/lecturers-table-headers";
import StudentsFilters from "./table-config/students-filters";
import { toast } from "sonner";
import { useAdminStudentsStore } from "@/stores/useAdminStudentsStore";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Banner from "@/components/ui-components/Banner";
import { PiStudentBold } from "react-icons/pi";

const StudentListPage = () => {
  const { data: students, isLoading: isLoadingStudents } =
    useGetAllStudentsQuery();
  const [deleteLecturerTrigger, { isLoading: isDeleting }] =
    useDeleteStudentMutation();

  console.log(students);
  const [filters, setFilters] = useState<StudentFilterState>({
    query: "",
    department: "all",
    level: "all",
    status: "all",
  });

  const { handleEdit, onCreateNew, handleViewDetails } =
    useAdminStudentsStore();

  const uniqueLevels = useMemo(() => {
    if (!students?.students) return [];
    return [...new Set(students.students.map((c) => c.level))];
  }, [students]);

  const handleDeleteStudent = async (id: string) => {
    const toastId = toast.loading("Deleting Student...");

    try {
      await deleteLecturerTrigger(id).unwrap();

      toast.success("Student successfully Deleted!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Delete Student", {
        id: toastId,
      });
    }
  };

  const filteredStudents = useMemo(() => {
    return students?.students?.filter((s) => {
      const query = filters.query.toLowerCase();
      const matchesQuery =
        s.name.toLowerCase().includes(query) ||
        s.matricNo.toLowerCase().includes(query) ||
        s.identifier.includes(query);
      const matchesDept =
        filters.department === "all" || s.department._id === filters.department;
      const matchesLevel =
        filters.level === "all" || s.level.toString() === filters.level;
      const matchesStatus =
        filters.status === "all" || s.status === filters.status;

      return matchesQuery && matchesDept && matchesLevel && matchesStatus;
    });
  }, [students, filters]);

  return (
    <div className="space-y-6">
      <Button onClick={onCreateNew}>
        <Plus className="mr-2 h-4 w-4" />
        Create Student
      </Button>
      <Banner
        title="Student Management"
        desc=" View, create, and manage all students in the university."
        actionButton={<PiStudentBold className="text-primary" size={40} />}
        containterClass="mb-8"
      />
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
    </div>
  );
};

export default StudentListPage;
