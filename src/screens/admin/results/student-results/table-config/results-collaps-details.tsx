import { Edit, Trash } from "lucide-react";
import { useMemo } from "react";
import type { IStudentResult } from "../types";
import Badge from "@/components/ui-components/Badge";
import { useAdminResultsStore } from "@/stores/useAdminResultsStore";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";
import { toast } from "sonner";
import { useDeleteResultMutation } from "@/redux/query/admin-results";

interface ResultsCollapsDetailsProps {
  results: IStudentResult[];
  isLoading?: boolean;
}

type GroupedResults = Record<string, Record<string, IStudentResult[]>>;

const groupResults = (results: IStudentResult[]): GroupedResults => {
  const grouped: GroupedResults = {};

  results.forEach((result) => {
    if (!grouped[result.session]) {
      grouped[result.session] = {};
    }
    if (!grouped[result.session][result.semester]) {
      grouped[result.session][result.semester] = [];
    }
    grouped[result.session][result.semester].push(result);
  });

  return grouped;
};

const getGradeColor = (grade: string) => {
  if (grade === "A") return "success";
  if (grade === "B" || grade === "C") return "neutral";
  if (grade === "F") return "danger";
  return "warning";
};

const ResultsCollapsDetails: React.FC<ResultsCollapsDetailsProps> = ({
  results,
}) => {
  const openEditModal = useAdminResultsStore((state) => state.openEditModal);
  const [deleteResultTrigger] = useDeleteResultMutation();
  const groupedData = useMemo(() => groupResults(results), [results]);
  const sessions = useMemo(
    () => Object.keys(groupedData).sort().reverse(),
    [groupedData]
  );

  const handleEditResult = (result: IStudentResult) => {
    openEditModal(result);
  };

  const handleDeleteResult = async (resultId: string) => {
    const toastId = toast.loading("Deleting Result...");

    try {
      await deleteResultTrigger(resultId).unwrap();

      toast.success("Result successfully Deleted!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Delete Result", {
        id: toastId,
      });
    }
  };

  if (results.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-lg">
        No academic records found.
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {sessions.map((session) => (
        <div
          key={session}
          className="border border-slate-200 rounded-lg overflow-hidden shadow-sm bg-white"
        >
          {/* Session Header */}
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-semibold text-slate-700">{session} Session</h3>
            <Badge>
              {Object.values(groupedData[session]).flat().length} Courses
            </Badge>
          </div>

          {/* Semesters */}
          {Object.keys(groupedData[session]).map((semester, idx) => (
            <div
              key={semester}
              className={idx > 0 ? "border-t border-slate-200" : ""}
            >
              {/* Semester Header */}
              <div className="bg-white px-4 py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {semester} Semester
                </span>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                    <tr>
                      <th className="px-4 py-2 font-medium w-24">Code</th>
                      <th className="px-4 py-2 font-medium">Course Title</th>
                      <th className="px-4 py-2 font-medium w-16 text-center">
                        CA
                      </th>
                      <th className="px-4 py-2 font-medium w-16 text-center">
                        Exam
                      </th>
                      <th className="px-4 py-2 font-medium w-16 text-center">
                        Total
                      </th>
                      <th className="px-4 py-2 font-medium w-16">Grade</th>
                      <th className="px-4 py-2 font-medium text-right w-24 no-print">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {groupedData[session][semester].map((result) => {
                      const gradeColor = getGradeColor(result.grade);

                      return (
                        <tr
                          key={result._id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium text-slate-900">
                            {result.course.code}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {result.course.title}
                          </td>
                          <td className="px-4 py-3 text-slate-600 text-center">
                            {result.ca}
                          </td>
                          <td className="px-4 py-3 text-slate-600 text-center">
                            {result.exam}
                          </td>
                          <td className="px-4 py-3 font-semibold text-slate-900 text-center">
                            {result.total}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={gradeColor}>{result.grade}</Badge>
                          </td>
                          <td className="px-4 py-3 text-right no-print">
                            <div className="flex justify-end gap-1">
                              <button
                                onClick={() => handleEditResult(result)}
                                className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-md transition-colors"
                                title="Edit"
                                aria-label="Edit result"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              <ConfirmationDialog
                                title="Delete this Result"
                                description="Are you sure you want to delete this result? This action cannot be undone."
                                action={() => handleDeleteResult(result._id)}
                                type="delete"
                                triggerLabel={
                                  <Trash className="w-4 h-4 mt-1 text-red-400" />
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResultsCollapsDetails;
