import Banner from "@/components/ui-components/Banner";
import { Button } from "@/components/ui/button";
import {
  useDeleteLecturerMutation,
  useGetAllLecturersQuery,
  useGetLectureDetailsQuery,
} from "@/redux/query/admin-lecturers";
import { Plus } from "lucide-react";
import { PiBooks } from "react-icons/pi";
import LecturersFilters from "./table-config/lecturers-filters";
import { Card, CardContent } from "@/components/ui/card";
import Table from "@/components/table/table";
import { lecturersListTableHeaders } from "./table-config/lecturers-table-headers";
import { useMemo, useState } from "react";
import type { IAdminLecturer, LecturerFilterState } from "./type";
import { toast } from "sonner";

const AdminLectures = () => {
  const { data: lecturersList, isLoading: isLoadingLecturers } =
    useGetAllLecturersQuery();
  const [deleteLecturerTrigger, {isLoading: isDeleting}] = useDeleteLecturerMutation()

  const [view, setView] = useState<"list" | "details">("list");

  const [filters, setFilters] = useState<LecturerFilterState>({
    query: "",
    department: "all",
  });
    const [selectedLecturer, setSelectedLecturer] = useState<IAdminLecturer | null>(null);
  
  // Dialog States
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [editingLecturer, setEditingLecturer] = useState<IAdminLecturer | null>(null);
  
    // Delete States
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [lecturerToDelete, setLecturerToDelete] = useState<string | null>(null);
  // Actions
  const handleCreate = () => {
    setEditingLecturer(null);
    setIsManageOpen(true);
  };

  const handleEdit = (lecturer: IAdminLecturer) => {
    setEditingLecturer(lecturer);
    setIsManageOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setLecturerToDelete(id);
    setIsDeleteOpen(true);
  };

  const handleViewDetails = (lecturer: IAdminLecturer) => {
    setSelectedLecturer(lecturer);
    setView('details');
  };

  const handleBack = () => {
    setSelectedLecturer(null);
    setView('list');
  };

  


  const { data: lecturerDetails } = useGetLectureDetailsQuery(
    "68f43863c364896a74c4041d"
  );

    const handleDeleteLecturer = async (id: string) => {
      const toastId = toast.loading("Deleting Lecturer...");
  
      try {
        await deleteLecturerTrigger(id).unwrap();
  
        toast.success("Lecturer successfully Deleted!", { id: toastId });
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to Delete Lecturer", {
          id: toastId,
        });
      }
    };

  const filteredLecturers = useMemo(() => {
    return lecturersList?.lecturers.filter((l) => {
      const matchesSearch =
        l.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        (l.identifier || "")
          .toLowerCase()
          .includes(filters.query.toLowerCase());
      const matchesDept =
        filters.department === "all" || l.department._id === filters.department;
      return matchesSearch && matchesDept;
    });
  }, [lecturersList, filters]);

  console.log("lecturer Details", lecturerDetails);
  return (
    <div className="min-h-screen">
      <main className="p-4 lg:p-8">
        <div className="mx-auto max-w-380">
          {view === "list" && (
            <div>
              <Button onClick={() => handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Create Lecturer
              </Button>
              <Banner
                title="Course Management"
                desc=" View, create, and manage all courses in the university."
                actionButton={<PiBooks className="text-primary" size={40} />}
                containterClass="mb-8"
              />
              <LecturersFilters filters={filters} setFilters={setFilters} />
              <Card>
                <CardContent className="p-0">
                  <Table
            header={lecturersListTableHeaders(
              handleViewDetails,
              handleEdit,
              handleDeleteLecturer,
              isDeleting
            )}
            isLoading={isLoadingLecturers}
            rows={filteredLecturers || []}
            id="_id"
          />
                </CardContent>
              </Card>
            </div>
          )}
          
      {view === "details" && selectedLecturer && (
        <LecturerDetailsPage
          lecturer={selectedLecturer}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )} 
        </div>
      </main>
    </div>
  );
};

export default AdminLectures;
