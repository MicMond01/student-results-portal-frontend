import Banner from "@/components/ui-components/Banner";
import { Button } from "@/components/ui/button";
import {
  useCreateLecturerMutation,
  useDeleteLecturerMutation,
  useGetAllLecturersQuery,
  useUpdateLecturerMutation,
} from "@/redux/query/admin-lecturers";
import { Plus } from "lucide-react";
import { PiBooks } from "react-icons/pi";
import LecturersFilters from "./table-config/lecturers-filters";
import { Card, CardContent } from "@/components/ui/card";
import Table from "@/components/table/table";
import { lecturersListTableHeaders } from "./table-config/lecturers-table-headers";
import { useMemo, useState } from "react";
import type {
  IAdminLecturer,
  LecturerFilterState,
  LecturerFormData,
} from "./type";
import { toast } from "sonner";
import LecturerProfilePage from "./LecturerProfilePage";
import ManageLecturerDialog from "./manage-lecturer-dialog";
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import { useNavigate } from "react-router-dom";
import { useAdminLecturersStore } from "@/stores/useAdminLecturersStore";

const AdminLectures = () => {
  const { data: lecturersList, isLoading: isLoadingLecturers } =
    useGetAllLecturersQuery();
  const [deleteLecturerTrigger, { isLoading: isDeleting }] =
    useDeleteLecturerMutation();
  const { data: departmentList } = useGetAllDepartmentsQuery();
  const [updateLecturerTrigger, { isLoading: isUpdating }] =
    useUpdateLecturerMutation();
  const [createLecturerTrigger, { isLoading: isCreating }] =
    useCreateLecturerMutation();
  const navigate = useNavigate();

  const {
    view,
    setIsManageOpen,
    editingLecturer,
    selectedLecturer,
    openCreateDialog,
    openEditDialog,
  } = useAdminLecturersStore();

  const [filters, setFilters] = useState<LecturerFilterState>({
    query: "",
    department: "all",
  });

  const handleViewDetails = (lecturer: IAdminLecturer) => {
    navigate(`/admin/lecturers/${lecturer._id}`);
  };

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

  const handleSaveLecturer = async (formData: LecturerFormData) => {
    const toastId = toast.loading(
      editingLecturer ? "Updating Lecturer..." : "Creating Lecturer..."
    );

    try {
      const departmentObj = departmentList?.departments?.find(
        (d) => d._id === formData.department
      );

      if (!departmentObj) {
        toast.error("Please select a valid department", {
          id: toastId,
        });
        return;
      }

      if (editingLecturer) {
        // ---------------- UPDATE LOGIC ----------------
        const payload = {
          ...formData,
          department: departmentObj._id,
        };

        await updateLecturerTrigger({
          id: editingLecturer._id,
          data: payload,
        }).unwrap();

        setIsManageOpen(false);

        toast.success("Lecturer successfully updated!", { id: toastId });
      } else {
        // ---------------- CREATE LOGIC ----------------
        const payload = {
          ...formData,
          department: departmentObj._id,
        };

        await createLecturerTrigger(payload).unwrap();

        toast.success("Lecturer successfully created!", { id: toastId });
        setIsManageOpen(false);
      }
    } catch (error: any) {
      const message = error?.data?.msg || error?.data?.message;

      toast.error(message || "Something went wrong", {
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

  return (
    <div className="min-h-screen">
      <main className="p-4 lg:p-8">
        <div className="mx-auto max-w-380">
          {view === "list" && (
            <div>
              <Button onClick={() => openCreateDialog()}>
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
                      openEditDialog,
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

          {view === "details" && selectedLecturer && <LecturerProfilePage />}
        </div>
      </main>
      <ManageLecturerDialog
        onSave={handleSaveLecturer}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};

export default AdminLectures;
