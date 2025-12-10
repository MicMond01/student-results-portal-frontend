import type { Result } from "@/screens/admin/results/student-results/types";
import { useMemo } from "react";

export const useLecturerResultsStats = (results: Result[]) => {
  return useMemo(() => {
    const uniqueStudents = new Set(results.map((d) => d.student.matricNo || "")).size;
    const totalScoreSum = results.reduce((acc, curr) => acc + (curr.total ?? 0), 0);
    const avgScore = results.length ? (totalScoreSum / results.length).toFixed(1) : "0.0";
    const passedCount = results.filter((d) => d.grade !== "F").length;
    const passRate = results.length
      ? ((passedCount / results.length) * 100).toFixed(1)
      : "0.0";

    return {
      totalResults: results.length,
      uniqueStudents,
      avgScore,
      passRate,
    };
  }, [results]);
};