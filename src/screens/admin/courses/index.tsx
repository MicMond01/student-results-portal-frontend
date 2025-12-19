import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateACourseMutation,
} from "@/redux/query/admin-courses";
import type { CourseFormData } from "./type";
import CourseDetailsPage from "./CourseDetailsPage";
import ManageCourseDialog from "./components/manage-course-dialog";
import { toast } from "sonner";
import { useGetAllLecturersQuery } from "@/redux/query/admin-lecturers";
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import CourseListPage from "./CourseListPage";
import { useAdminCoursesStore } from "@/stores/useAdminCoursesStore";

const AdminCourses = () => {
  const [deleteCourseTrigger, { isLoading: isDeleting }] =
    useDeleteCourseMutation();
  const { data: lecturersList } = useGetAllLecturersQuery();
  const { data: departmentList } = useGetAllDepartmentsQuery();
  const [updateCourseTrigger, { isLoading: isUpdatingCourse }] =
    useUpdateACourseMutation();
  const [createCourseTrigger, { isLoading: isCreatingCourse }] =
    useCreateCourseMutation();

  const { editingCourse, view, selectedCourse, setIsDialogOpen } =
    useAdminCoursesStore();

  const handleDeleteCourse = async (id: string) => {
    const toastId = toast.loading("Deleting Course...");

    try {
      await deleteCourseTrigger(id).unwrap();

      toast.success("Course successfully Deleted!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Delete Exam", {
        id: toastId,
      });
    }
  };

  const handleSaveCourse = async (formData: CourseFormData) => {
    const toastId = toast.loading(
      editingCourse ? "Updating Course..." : "Creating Course..."
    );

    try {
      const lecturerObj = lecturersList?.lecturers?.find(
        (l) => l._id === formData.lecturer
      );
      const departmentObj = departmentList?.departments?.find(
        (d) => d._id === formData.department
      );

      if (!lecturerObj || !departmentObj) {
        toast.error("Please select a valid department and lecturer", {
          id: toastId,
        });
        return;
      }

      if (editingCourse) {
        // ---------------- UPDATE LOGIC ----------------
        const payload = {
          ...formData,
          lecturer: lecturerObj._id,
          department: departmentObj._id,
        };

        await updateCourseTrigger({
          id: editingCourse._id,
          data: payload,
        }).unwrap();

        setIsDialogOpen(false);

        toast.success("Course successfully updated!", { id: toastId });
      } else {
        // ---------------- CREATE LOGIC ----------------
        const payload = {
          ...formData,
          students: [],
          isActive: true,
          lecturer: lecturerObj._id,
          department: departmentObj._id,
        };

        await createCourseTrigger(payload).unwrap();

        toast.success("Course successfully created!", { id: toastId });
        setIsDialogOpen(false);
      }
    } catch (error: any) {
      const message = error?.data?.msg || error?.data?.message;

      toast.error(message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <main className="p-4 lg:p-8">
        <div className="mx-auto max-w-380">
          {view === "list" && (
            <CourseListPage
              onDelete={handleDeleteCourse}
              isDeleting={isDeleting}
            />
          )}
          {view === "details" && selectedCourse && <CourseDetailsPage />}
        </div>
      </main>

      {/* Reusable Dialog for Create/Edit */}
      <ManageCourseDialog
        onSave={handleSaveCourse}
        isUpdatingCourse={isUpdatingCourse}
        isCreatingCourse={isCreatingCourse}
      />
    </div>
  );
};
export default AdminCourses;
