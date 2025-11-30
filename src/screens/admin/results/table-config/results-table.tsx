import { Edit, Trash } from "lucide-react";
import React, { useMemo } from "react";
import type { IStudentResult } from "../types";
import Badge from "@/components/ui-components/Badge";

interface ResultsTableProps {
  results: IStudentResult[];
  onEditResult: (result: IStudentResult) => void;
  onDeleteResult: (resultId: string) => void;
  isLoading?: boolean;
}

// Group results by Session and Semester
const groupResults = (results: IStudentResult[]) => {
  const grouped: Record<string, Record<string, IStudentResult[]>> = {};

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

const ResultsTable: React.FC<ResultsTableProps> = ({
  results,
  onEditResult,
  onDeleteResult,
}) => {
  const groupedData = useMemo(() => groupResults(results), [results]);
  const sessions = Object.keys(groupedData).sort().reverse(); // Show latest session first

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
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
            <h3 className="font-semibold text-slate-700">{session} Session</h3>
            <Badge>
              {Object.values(groupedData[session]).flat().length} Courses
            </Badge>
          </div>

          {Object.keys(groupedData[session]).map((semester, idx) => (
            <div
              key={semester}
              className={idx > 0 ? "border-t border-slate-200" : ""}
            >
              <div className="bg-white px-4 py-2 border-b border-slate-100">
                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
                  {semester} Semester
                </span>
              </div>
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
                      const gradeColor =
                        result.grade === "A"
                          ? "success"
                          : result.grade === "B" || result.grade === "C"
                          ? "neutral"
                          : result.grade === "F"
                          ? "danger"
                          : "warning";

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
                                onClick={() => onEditResult(result)}
                                className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-md transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteResult(result._id)}
                                className="p-1.5 hover:bg-red-50 text-red-400 rounded-md transition-colors"
                                title="Delete"
                              >
                                <Trash className="w-4 h-4" />
                              </button>
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

export default ResultsTable;
