import { useCreateResultMutation, useUpdateResultMutation } from "@/redux/query/admin-results";
import { calculateGrade } from "@/screens/admin/results/student-results";
import { useAdminResultsStore } from "@/stores/useAdminResultsStore";
import { toast } from "sonner";


export const useResultsCRUD = () => {
  const [createResultTrigger] = useCreateResultMutation();
  const [updateResultTrigger] = useUpdateResultMutation();
  const { modals, resultForm, closeModals } = useAdminResultsStore();

  const calculatedTotal = (resultForm.ca || 0) + (resultForm.exam || 0);
  const calculatedGrade = calculateGrade(calculatedTotal);

  const handleSave = async () => {
    const isUpdating = modals.selectedResult !== null;
    const toastId = toast.loading(
      isUpdating ? "Updating Result..." : "Creating Result..."
    );

    try {
      if (isUpdating) {
        await updateResultTrigger({
          id: modals.selectedResult!._id,
          data: {
            ca: resultForm.ca,
            exam: resultForm.exam,
            session: resultForm.session,
            semester: resultForm.semester,
          },
        }).unwrap();
        toast.success("Result updated successfully!", { id: toastId });
      } else {
        await createResultTrigger({
          student: resultForm.studentId,
          course: resultForm.courseId,
          ca: resultForm.ca,
          exam: resultForm.exam,
          session: resultForm.session,
          semester: resultForm.semester,
        }).unwrap();
        toast.success("Result created successfully!", { id: toastId });
      }
      closeModals();
    } catch (error: any) {
      toast.error(error?.data?.msg || "Something went wrong", { id: toastId });
    }
  };

  return {
    calculatedTotal,
    calculatedGrade,
    handleSave,
  };
};
