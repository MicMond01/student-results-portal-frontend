import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import {
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "@/redux/query/admin-students";
import { useAdminStudentsStore } from "@/stores/useAdminStudentsStore";
import StudentListPage from "./StudentListPage";
import StudentProfilePage from "./StudentProfilePage";
import { toast } from "sonner";
import ManageStudentDialog from "./components/manage-student-dialog";
import type { StudentFormData } from "./types";

const AdminStudents = () => {
  const { data: departmentList } = useGetAllDepartmentsQuery();

  const [createStudentTrigger, { isLoading: isCreatingStudent }] =
    useCreateStudentMutation();
  const [updateStudentTrigger, { isLoading: isUpdatingStudent }] =
    useUpdateStudentMutation();

  const { editingStudent, view, selectedStudent, setIsDialogOpen } =
    useAdminStudentsStore();

  //Save Function

  const handleSaveStudent = async (formData: StudentFormData) => {
    const toastId = toast.loading(
      editingStudent ? "Updating Student..." : "Creating Student..."
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

      if (editingStudent) {
        // ---------------- UPDATE LOGIC ----------------
        const payload = {
          ...formData,
          department: departmentObj._id,
        };

        await updateStudentTrigger({
          id: editingStudent._id,
          data: payload,
        }).unwrap();

        setIsDialogOpen(false);

        toast.success("Student successfully updated!", { id: toastId });
      } else {
        // ---------------- CREATE LOGIC ----------------
        const payload = {
          ...formData,
          students: [],
          isActive: true,
          department: departmentObj._id,
          password: "123456",
        };

        await createStudentTrigger(payload).unwrap();

        toast.success("Student successfully created!", { id: toastId });
        setIsDialogOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      });
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <main className="p-4 lg:p-8">
        <div className="mx-auto max-w-380">
          {view === "list" && <StudentListPage />}
          {view === "details" && selectedStudent && <StudentProfilePage />}
        </div>
      </main>

      <ManageStudentDialog
        onSave={handleSaveStudent}
        isLoading={isUpdatingStudent || isCreatingStudent}
      />
    </div>
  );
};

export default AdminStudents;
