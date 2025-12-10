import { Button } from "@/components/ui/button";
import { ChevronLeft, Plus, PrinterIcon } from "lucide-react";
import { useAdminResultsStore } from "@/stores/useAdminResultsStore";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentResultsQuery } from "@/redux/query/admin-results";
import ResultsCollapsDetails from "./table-config/results-collaps-details";
import ResultsDialogs from "./ResultsDialogs";
import { useMemo } from "react";
import { toast } from "sonner";
import {
  useCreateResultMutation,
  useUpdateResultMutation,
} from "@/redux/query/admin-results";

const calculateGrade = (total: number) => {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 45) return "D";
  if (total >= 40) return "E";
  return "F";
};

const StudentResultProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useStudentResultsQuery(id);
  const [createResultTrigger] = useCreateResultMutation();
  const [updateResultTrigger] = useUpdateResultMutation();

  // Get state and actions from store
  const openCreateModal = useAdminResultsStore(
    (state) => state.openCreateModal
  );
  const modals = useAdminResultsStore((state) => state.modals);
  const resultForm = useAdminResultsStore((state) => state.resultForm);
  const closeModals = useAdminResultsStore((state) => state.closeModals);

  // Get unique sessions from student's results
  const uniqueSessions = useMemo(() => {
    if (!data?.results) return [];
    const sessions = new Set<string>();
    data.results.forEach((r) => sessions.add(r.session));
    return Array.from(sessions).sort().reverse();
  }, [data]);

  // Computed values for form
  const calculatedTotal = (resultForm.ca || 0) + (resultForm.exam || 0);
  const calculatedGrade = calculateGrade(calculatedTotal);

  const handlePrint = () => {
    window.print();
  };

  const handleAddResult = () => {
    if (id) {
      openCreateModal(id); // Pre-fill student info in create dialog
    }
  };

  const handleSaveResult = async () => {
    const isUpdating = modals.selectedResult !== null;
    const toastId = toast.loading(
      isUpdating ? "Updating Result..." : "Creating Result..."
    );

    try {
      if (isUpdating) {
        const updatePayload = {
          ca: resultForm.ca,
          exam: resultForm.exam,
          session: resultForm.session,
          semester: resultForm.semester,
        };

        await updateResultTrigger({
          id: modals.selectedResult!._id,
          data: updatePayload,
        }).unwrap();

        toast.success("Result updated successfully!", { id: toastId });
      } else {
        const createPayload = {
          student: resultForm.studentId,
          course: resultForm.courseId,
          ca: resultForm.ca,
          exam: resultForm.exam,
          session: resultForm.session,
          semester: resultForm.semester,
        };

        await createResultTrigger(createPayload).unwrap();
        toast.success("Result created successfully!", { id: toastId });
      }

      closeModals();
    } catch (error: any) {
      toast.error(error?.data?.msg || "Something went wrong", {
        id: toastId,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-500">Loading student profile...</div>
      </div>
    );
  }

  if (!data?.student) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-500">Student not found</div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
        {/* Header / Breadcrumb */}
        <div className="flex items-center gap-4 no-print">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/results")}
            className="-ml-2 text-slate-500 hover:text-slate-900"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Students
          </Button>
          <div className="h-4 w-px bg-slate-300"></div>
          <span className="text-sm font-medium text-slate-900">
            Student Profile
          </span>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-32 bg-linear-to-r from-primary-800 to-primary-600"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="flex items-end gap-6">
                <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.student.matricNo}`}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="pb-1">
                  <h1 className="text-2xl font-bold text-slate-900">
                    {data.student.name}
                  </h1>
                  <div className="text-slate-500 flex items-center gap-2 text-sm">
                    <span>{data.student.matricNo}</span>
                    <span>•</span>
                    <span>{data.student.department?.name || "N/A"}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mb-1 no-print">
                <Button variant="outline" onClick={handlePrint}>
                  <PrinterIcon className="w-4 h-4 mr-2" />
                  Print Transcript
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => navigate(`/admin/students/${id}`)}
                >
                  View Full Profile
                </Button>
                <Button onClick={handleAddResult}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Result
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-slate-100 pt-6">
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <div className="text-sm font-medium text-slate-900">
                  {data.student.email || "N/A"}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Phone
                </label>
                <div className="text-sm font-medium text-slate-900">
                  {data.student.phone || "N/A"}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Current Level
                </label>
                <div className="text-sm font-medium text-slate-900">
                  {data.student.level} Level
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                  Status
                </label>
                <div className="text-sm font-bold text-green-600">
                  {data.student.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Academic Results
          </h2>
          <ResultsCollapsDetails results={data.results || []} />
        </div>
      </div>

      {/* FIXED: Added ResultsDialogs component */}
      <ResultsDialogs
        uniqueSessions={uniqueSessions}
        calculatedTotal={calculatedTotal}
        calculatedGrade={calculatedGrade}
        onSave={handleSaveResult}
      />
    </>
  );
};

export default StudentResultProfile;
