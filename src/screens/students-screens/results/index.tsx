import {
  useGetMyResultsQuery,
  useGetOwnProfileQuery,
} from "@/redux/query/student";
import { useMemo, useState } from "react";
import type { ISemesters } from "./type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart2,
  Calendar,
  Database,
  Download,
  Loader2,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/ui-components/StatCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const StudentResults = () => {
  const { data: resultData } = useGetMyResultsQuery();
  // In a real app, this data would come from an API call
  const { results, statistics } = resultData || {};
  const { data: profileData } = useGetOwnProfileQuery();
  const profile = profileData?.profile;

  const [selectedSession, setSelectedSession] = useState(
    results?.[0]?.session || "all"
  );
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [isDownloading, setIsDownloading] = useState(false);

  // --- Get unique sessions and semesters for filters ---
  const sessions = useMemo(() => {
    return ["all", ...(results?.map((group) => group.session) || [])];
  }, [results]);

  const semesters = ["all", "First", "Second"];

  // --- PDF Export Logic ---
  const handleExportPDF = async () => {
    setIsDownloading(true);
    try {
      // Create new PDF document
      const doc = new jsPDF();

      // --- Title ---
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("Student Academic Transcript", 105, 20, { align: "center" });

      // --- Student Info ---
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Student: ${profile?.name}`, 20, 35);
      doc.text(`Matric No: ${profile?.matricNo}`, 20, 42);
      doc.text(`Program: ${profile?.program}`, 20, 49);

      doc.text(`Department: ${profile?.department}`, 105, 42, {
        align: "left",
      });
      doc.text(`Faculty: ${profile?.faculty}`, 105, 49, { align: "left" });

      // --- Statistics Summary ---
      autoTable(doc, {
        startY: 60,
        theme: "plain",
        body: [
          [
            `Cumulative GPA (CGPA): ${statistics?.cgpa.toFixed(2)}`,
            `Total Credit Units: ${statistics?.totalCreditUnits}`,
          ],
        ],
        styles: {
          fontStyle: "bold",
          fontSize: 12,
        },
      });

      let currentY = (doc as any).lastAutoTable.finalY + 15;

      // --- Filter Data for PDF ---
      const sessionsToPrint =
        selectedSession === "all"
          ? results
          : results?.filter((r) => r.session === selectedSession);

      // --- Loop through each session and semester ---
      for (const sessionData of sessionsToPrint || []) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`${sessionData.session} Session`, 20, currentY);
        currentY += 8;

        const semestersToPrint =
          selectedSemester === "all"
            ? (["First", "Second"] as const)
            : ([selectedSemester] as const);

        for (const semester of semestersToPrint) {
          const semesterResults =
            sessionData?.semesters[semester as keyof ISemesters] || [];
          if (semesterResults.length > 0) {
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(`${semester} Semester`, 20, currentY);

            const tableBody = semesterResults.map((res) => [
              res.course,
              res.title,
              res.ca,
              res.exam,
              res.total,
              res.creditUnit,
              res.grade,
            ]);

            autoTable(doc, {
              startY: currentY + 3,
              head: [
                [
                  "Code",
                  "Course Title",
                  "CA",
                  "Exam",
                  "Total",
                  "Units",
                  "Grade",
                ],
              ],
              body: tableBody,
              theme: "striped",
              headStyles: { fillColor: [22, 163, 74] }, // Green color
            });

            currentY = (doc as any).lastAutoTable.finalY + 10;
          }
        }
      }

      // --- Document Footer ---
      const pageCount = (doc as any).internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setFont("helvetica", "italic");
        doc.text(
          `Page ${i} of ${pageCount}`,
          105,
          doc.internal.pageSize.height - 10,
          { align: "center" }
        );
        doc.text(
          `Generated on: ${new Date().toLocaleDateString()}`,
          20,
          doc.internal.pageSize.height - 10
        );
      }

      // --- Save ---
      const sessionFile =
        selectedSession === "all" ? "all-sessions" : selectedSession;
      const semesterFile =
        selectedSemester === "all" ? "" : `_${selectedSemester}-semester`;
      doc.save(
        `student_results_${sessionFile.replace("/", "-")}${semesterFile}.pdf`
      );
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      // You could show an error toast here
    }
    setIsDownloading(false);
  };

  // --- Filter Logic for Display ---
  const filteredData = useMemo(() => {
    let filteredResults = results;

    if (selectedSession !== "all") {
      filteredResults = filteredResults?.filter(
        (group) => group.session === selectedSession
      );
    }

    if (selectedSemester !== "all") {
      filteredResults = filteredResults?.map((sessionGroup) => ({
        ...sessionGroup,
        semesters: {
          First:
            selectedSemester === "First"
              ? sessionGroup?.semesters.First || []
              : [],
          Second:
            selectedSemester === "Second"
              ? sessionGroup?.semesters.Second || []
              : [],
        },
      }));
    }

    return filteredResults;
  }, [results, selectedSession, selectedSemester]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header with Stats and Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <CardTitle className="flex items-center text-2xl">
                  <BarChart2 className="mr-2 h-6 w-6" />
                  My Academic Results
                </CardTitle>
                <CardDescription>
                  View your academic performance and download your results.
                </CardDescription>
              </div>
              <Button
                onClick={handleExportPDF}
                disabled={isDownloading}
                className="w-full shrink-0 md:w-auto"
              >
                {isDownloading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <StatCard
              icon={Star}
              title="Cumulative GPA (CGPA)"
              value={statistics?.cgpa?.toFixed(2) ?? "0.00"}
            />
            <StatCard
              icon={Database}
              title="Total Credit Units Passed"
              value={statistics?.totalCreditUnits ?? 0}
            />
          </CardContent>
          <CardContent>
            {/* Filter Controls */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Select
                value={selectedSession}
                onValueChange={setSelectedSession}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by session" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((session) => (
                    <SelectItem key={session} value={session}>
                      {session === "all" ? "All Sessions" : session}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={selectedSemester}
                onValueChange={setSelectedSemester}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester === "all" ? "All Semesters" : semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Accordion */}
        <Accordion
          type="multiple"
          defaultValue={filteredData?.map((g) => g.session)}
          className="space-y-4"
        >
          {filteredData?.map((group) => (
            <AccordionItem
              value={group.session}
              key={group.session}
              className="rounded-lg border bg-white shadow-sm"
            >
              <AccordionTrigger className="px-6 py-4 text-lg font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {group.session} Session
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <Tabs
                  defaultValue={
                    selectedSemester === "all" ? "First" : selectedSemester
                  }
                  className="w-full p-4"
                >
                  <TabsList
                    className={cn(
                      "grid w-full",
                      selectedSemester === "all"
                        ? "grid-cols-2 md:w-[300px]"
                        : "grid-cols-1 md:w-[150px]"
                    )}
                  >
                    {selectedSemester === "all" ||
                    selectedSemester === "First" ? (
                      <TabsTrigger value="First">First Semester</TabsTrigger>
                    ) : null}
                    {selectedSemester === "all" ||
                    selectedSemester === "Second" ? (
                      <TabsTrigger value="Second">Second Semester</TabsTrigger>
                    ) : null}
                  </TabsList>
                  <TabsContent value="First" className="mt-4">
                    <ResultsTable results={group.semesters.First || []} />
                  </TabsContent>
                  <TabsContent value="Second" className="mt-4">
                    <ResultsTable results={group.semesters.Second || []} />
                  </TabsContent>
                </Tabs>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default StudentResults;
