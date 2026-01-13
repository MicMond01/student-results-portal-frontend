import {
  useGetMyResultsQuery,
  useGetOwnProfileQuery,
} from "@/redux/query/student";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import Banner from "@/components/ui-components/Banner";
import ResultsStats from "./ResultsStats";
import ResultsAccordion from "./ResultsAccordion";
import { generateResultsPDF } from "@/lib/generateResultsPDF";
import { useGetAllAcademicSessionsQuery } from "@/redux/query/student-sessions";

const StudentResults = () => {
  const { data: resultData } = useGetMyResultsQuery();
  const { results, statistics } = resultData || {};
  const { data: profileData } = useGetOwnProfileQuery();
  const profile = profileData?.profile;

  const { data: academicSessions } = useGetAllAcademicSessionsQuery();
  const sessions = academicSessions?.sessions || [];

  const [selectedSession, setSelectedSession] = useState(
    results?.[0]?.session || "all"
  );
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [isDownloading, setIsDownloading] = useState(false);

  const semesters = ["all", "First", "Second"];

  const filteredData = useMemo(() => {
    let filteredResults = results;
    if (selectedSession !== "all") {
      filteredResults = filteredResults?.filter(
        (g) => g.session === selectedSession
      );
    }
    if (selectedSemester !== "all") {
      filteredResults = filteredResults?.map((sessionGroup) => ({
        ...sessionGroup,
        semesters: {
          First:
            selectedSemester === "First"
              ? sessionGroup.semesters.First || []
              : [],
          Second:
            selectedSemester === "Second"
              ? sessionGroup.semesters.Second || []
              : [],
        },
      }));
    }
    return filteredResults;
  }, [results, selectedSession, selectedSemester]);

  const handleExportPDF = async () => {
    if (!profile) {
      setIsDownloading(false);
      return;
    }

    setIsDownloading(true);
    await generateResultsPDF({
      results: results || [],
      profile: profile,
      statistics: statistics || { cgpa: 0, totalCreditUnits: 0 },
      selectedSession,
      selectedSemester,
      setIsDownloading,
    });
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-380 space-y-6">
        <Banner
          title="My Academic Results"
          desc="View your academic performance and download your results."
          actionButton={<BarChart2 className="text-primary" size={40} />}
        />

        <Card className="mt-8">
          <ResultsStats
            statistics={statistics}
            sessions={sessions}
            semesters={semesters}
            selectedSession={selectedSession}
            selectedSemester={selectedSemester}
            setSelectedSession={setSelectedSession}
            setSelectedSemester={setSelectedSemester}
            isDownloading={isDownloading}
            handleExportPDF={handleExportPDF}
          />
        </Card>

        <ResultsAccordion
          filteredData={filteredData || []}
          selectedSemester={selectedSemester}
        />
      </div>
    </div>
  );
};

export default StudentResults;
