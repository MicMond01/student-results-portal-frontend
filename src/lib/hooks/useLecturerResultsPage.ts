import { useLecturerResultsQuery } from "@/redux/query/admin-results";
import { useGetAllAcademicSessionsQuery } from "@/redux/query/admin-sessions";
import type { LecturerResultsFiltersState } from "@/screens/admin/results/student-results/types";
import { useMemo, useState } from "react";

// hooks/useLecturerResultsPage.ts
export const useLecturerResultsPage = (lecturerId: string) => {
  const { data: resultsData, isLoading } = useLecturerResultsQuery(lecturerId, {
    skip: !lecturerId,
  });

  const { data: academicSessions } = useGetAllAcademicSessionsQuery();
  const uniqueSessions = academicSessions?.sessions || [];

  const [filters, setFilters] = useState<LecturerResultsFiltersState>({
    query: "",
    level: null,
    grade: "all",
    course: "all",
  });

  const filteredResults = useMemo(() => {
    return resultsData?.results.filter((l) => {
      const matchesSearch =
        l.student.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        (l.student.matricNo || "")
          .toLowerCase()
          .includes(filters.query.toLowerCase());
      const matchesLevel =
        filters.level === null || l.student.level === filters.level;
      const matchesGrade = filters.grade === "all" || l.grade === filters.grade;
      const matchesCourse =
        filters.course === "all" || l.course.title === filters.course;
      return matchesSearch && matchesGrade && matchesLevel && matchesCourse;
    });
  }, [resultsData, filters]);

  const uniqueGrades = useMemo(() => {
    if (!resultsData?.results) return [];
    return [...new Set(resultsData.results.map((l) => l.grade).sort())];
  }, [resultsData]);

  const uniqueCourses = useMemo(() => {
    if (!resultsData?.results) return [];
    return [...new Set(resultsData.results.map((l) => l.course.title).sort())];
  }, [resultsData]);

  return {
    resultsData,
    isLoading,
    filters,
    setFilters,
    filteredResults,
    uniqueGrades,
    uniqueCourses,
    uniqueSessions,
  };
};
