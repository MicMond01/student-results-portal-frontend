import {
  useCreateResultMutation,
  useGetAllResultsQuery,
  useUpdateResultMutation,
} from "@/redux/query/admin-results";
import { useEffect, useMemo } from "react";
import StudentsTable from "./table-config/StudentsTable";
import {
  exportFilteredPDF,
  exportToCSV,
  groupResultsByStudent,
} from "@/lib/admin-results-helper";
import ResultsDialogs from "./ResultsDialogs";
import {
  useAdminResultsStore,
  useFilteredResults,
} from "@/stores/useAdminResultsStore";
import { toast } from "sonner";
import { useGetAllAcademicSessionsQuery } from "@/redux/query/admin-sessions";

export const calculateGrade = (total: number) => {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 45) return "D";
  if (total >= 40) return "E";
  return "F";
};

const AdminResults = () => {
  const { data: studentResultData, isLoading: queryLoading } =
    useGetAllResultsQuery();
  const [createResultTrigger] = useCreateResultMutation();
  const [updateResultTrigger] = useUpdateResultMutation();
  const { data: academicSessions } = useGetAllAcademicSessionsQuery();
  const uniqueSessions = academicSessions?.sessions || [];

  const setData = useAdminResultsStore((state) => state.setData);
  const modals = useAdminResultsStore((state) => state.modals);
  const resultForm = useAdminResultsStore((state) => state.resultForm);
  const closeModals = useAdminResultsStore((state) => state.closeModals);

  const filteredData = useFilteredResults();

  const uniqueLevels = useMemo(
    () =>
      Array.from(
        new Set(
          studentResultData?.results?.map((r) => r?.student?.level || 100) || []
        )
      )
        .sort((a, b) => a - b)
        .map(String),
    [studentResultData]
  );

  useEffect(() => {
    if (studentResultData?.results) {
      const grouped = groupResultsByStudent(studentResultData.results);
      setData(grouped);
    }
  }, [studentResultData, setData]);

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

  const handleExportCSV = () => {
    exportToCSV(filteredData);
  };

  const handleExportPDF = () => {
    exportFilteredPDF(filteredData);
  };

  const calculatedTotal = (resultForm.ca || 0) + (resultForm.exam || 0);
  const calculatedGrade = calculateGrade(calculatedTotal);

  return (
    <div className="min-h-screen">
      <main className="p-4 lg:p-8">
        <div className="mx-auto max-w-380">
          <div className="space-y-6">
            <StudentsTable
              isLoading={queryLoading}
              onExportCSV={handleExportCSV}
              onExportPDF={handleExportPDF}
              levels={uniqueLevels}
              sessions={uniqueSessions || []}
            />
          </div>
        </div>
      </main>

      <ResultsDialogs
        uniqueSessions={uniqueSessions}
        calculatedTotal={calculatedTotal}
        calculatedGrade={calculatedGrade}
        onSave={handleSaveResult}
      />
    </div>
  );
};

export default AdminResults;
