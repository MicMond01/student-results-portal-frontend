import { useCourseResultsQuery } from "@/redux/query/admin-results";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { CourseResultsFiltersState } from "./types";
import StatsCard from "../components/StatsCard";
import CourseResultPageSkeleton from "../components/CourseResultPageSkeleton";
import { Award, BookOpen, TrendingUp, Users } from "lucide-react";
import CourseResultsFilters from "./table-config/course-results-filters";
import { Card, CardContent } from "@/components/ui/card";
import Table from "@/components/table/table";
import { courseResultsTableHeaders } from "./table-config/course-results-table-headers";
import Banner from "@/components/ui-components/Banner";
import { PiBookOpenFill } from "react-icons/pi";

const CourseResultsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data: resultsData, isLoading: isLoadingResults } =
    useCourseResultsQuery(courseId);

  const [filters, setFilters] = useState<CourseResultsFiltersState>({
    query: "",
    level: null,
    grade: "all",
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

      return matchesSearch && matchesLevel && matchesGrade;
    });
  }, [resultsData, filters]);

  const uniqueGrade = useMemo(() => {
    if (!resultsData?.results) return [];
    return [...new Set(resultsData?.results.map((l) => l.grade).sort())];
  }, [resultsData]);

  const getGradeColor = (
    grade: string
  ): "success" | "neutral" | "danger" | "warning" | "default" => {
    if (grade === "A") return "success";
    if (grade === "B") return "default";
    if (grade === "C") return "neutral";
    if (grade === "F") return "danger";
    return "warning";
  };

  const stats = useMemo(() => {
    const data = filteredResults ?? [];
    const uniqueStudents = new Set(data.map((d) => d.student.matricNo || ""))
      .size;
    const totalScoreSum = data.reduce(
      (acc, curr) => acc + (curr.total ?? 0),
      0
    );
    const avgScore = data.length
      ? (totalScoreSum / data.length).toFixed(1)
      : "0.0";
    const passedCount = data.filter((d) => d.grade !== "F").length;
    const passRate = data.length
      ? ((passedCount / data.length) * 100).toFixed(1)
      : "0.0";

    return {
      totalResults: data.length,
      uniqueStudents,
      avgScore,
      passRate,
    };
  }, [filteredResults]);

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  if (isLoadingResults) {
    return <CourseResultPageSkeleton />;
  }
  return (
    <div className="min-h-screen ">
      <main className="p-4 lg:p-8">
        <div className="mx-auto max-w-380">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Banner
              title="Course Results"
              desc={`Viewing results for ${resultsData?.results[0]?.course?.code} - ${resultsData?.results[0]?.course?.title}`}
              actionButton={
                <PiBookOpenFill className="text-primary" size={40} />
              }
              containterClass="mb-8"
            />
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Students"
                value={stats.totalResults}
                icon={BookOpen}
                color="bg-purple-600"
              />
              <StatsCard
                title="Unique Matric No."
                value={stats.uniqueStudents}
                icon={Users}
                color="bg-blue-500"
              />
              <StatsCard
                title="Average Score"
                value={stats.avgScore}
                icon={TrendingUp}
                color="bg-green-500"
              />
              <StatsCard
                title="Pass Rate (A-E)"
                value={`${stats.passRate}%`}
                icon={Award}
                color="bg-orange-500"
              />
            </div>

            {/* Filters */}
            <CourseResultsFilters
              filters={filters}
              setFilters={setFilters}
              uniqueGrade={uniqueGrade}
            />

            {/* Table */}
            <Card>
              <CardContent className="p-0">
                <Table
                  header={courseResultsTableHeaders(
                    getGradeColor,
                    handleNavigate
                  )}
                  isLoading={isLoadingResults}
                  rows={filteredResults || []}
                  id="_id"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseResultsPage;
