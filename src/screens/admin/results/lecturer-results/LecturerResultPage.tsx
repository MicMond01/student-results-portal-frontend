import Table from "@/components/table/table";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import LecturerResultsFilters from "./table-config/lecturer-results-filters";
import type { IStudentResult } from "../student-results/types";
import { lecturersResultsTableHeaders } from "./table-config/lecturer-results-table-headers";
import StatsCard from "../components/StatsCard";
import { Award, BookOpen, TrendingUp, Users } from "lucide-react";
import ResultsDialogs from "../student-results/ResultsDialogs";
import { useAdminResultsStore } from "@/stores/useAdminResultsStore";
import { useLecturerResultsPage } from "@/lib/hooks/useLecturerResultsPage";
import { useLecturerResultsStats } from "@/lib/hooks/useLecturerResultsStats";
import { useResultsCRUD } from "@/lib/hooks/useResultsCRUD";

const getGradeColor = (
  grade: string
): "success" | "neutral" | "danger" | "warning" => {
  if (grade === "A") return "success";
  if (grade === "B" || grade === "C") return "neutral";
  if (grade === "F") return "danger";

  return "warning";
};

const LecturerResultPage = () => {
  const { lecturerId } = useParams();
  const navigate = useNavigate();

  const pageData = useLecturerResultsPage(lecturerId || "");
  const stats = useLecturerResultsStats(pageData.filteredResults || []);
  const crud = useResultsCRUD();
  const { openEditModal } = useAdminResultsStore();

  const handleNavigate = (route: string) => {
    navigate(route);
  };

  const handleEditResult = (result: IStudentResult) => {
    openEditModal(result);
  };

  return (
    <div>
      <main className="p-4 lg:p-8">
        <div className="mx-auto max-w-380">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard
                title="Total Results Uploaded"
                value={stats.totalResults}
                icon={BookOpen}
                color="bg-purple-600"
              />
              <StatsCard
                title="Unique Students"
                value={stats.uniqueStudents}
                icon={Users}
                color="bg-blue-500"
              />
              <StatsCard
                title="Average Total Score"
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
            <LecturerResultsFilters
              filters={pageData.filters}
              setFilters={pageData.setFilters}
              uniqueGrade={pageData.uniqueGrades}
              uniqueCourse={pageData.uniqueCourses}
            />

            <Card>
              <CardContent className="p-0">
                <Table
                  header={lecturersResultsTableHeaders(
                    getGradeColor,
                    (data: any) => handleEditResult(data as IStudentResult),
                    handleNavigate
                  )}
                  isLoading={pageData.isLoading}
                  rows={pageData.filteredResults || []}
                  id="_id"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ResultsDialogs
        uniqueSessions={pageData.uniqueSessions}
        calculatedTotal={crud.calculatedTotal}
        calculatedGrade={crud.calculatedGrade}
        onSave={crud.handleSave}
      />
    </div>
  );
};

export default LecturerResultPage;
