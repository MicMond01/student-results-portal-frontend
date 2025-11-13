import type {
  IResult,
  ISemesters,
} from "@/screens/students-screens/results/type"; // changed: added ISemesters import
import type { StudentProfile } from "@/types/student";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";

interface IGenerateResultsPDFProps {
  results: IResult[];
  profile: StudentProfile;
  statistics: { cgpa: number; totalCreditUnits: number };
  selectedSession: string;
  selectedSemester: string;
  setIsDownloading: (v: boolean) => void;
}

export const generateResultsPDF = async ({
  results,
  profile,
  statistics,
  selectedSession,
  selectedSemester,
  setIsDownloading,
}: IGenerateResultsPDFProps) => {
  try {
    const doc = new jsPDF();
    doc.setFontSize(18).setFont("helvetica", "bold");
    doc.text("Student Academic Transcript", 105, 20, { align: "center" });

    doc.setFontSize(12).setFont("helvetica", "normal");
    doc.text(`Student: ${profile?.name}`, 20, 35);
    doc.text(`Matric No: ${profile?.matricNo}`, 20, 42);
    doc.text(`Program: ${profile?.program}`, 20, 49);
    doc.text(`Department: ${profile?.department}`, 105, 42);
    doc.text(`Faculty: ${profile?.faculty}`, 105, 49);

    autoTable(doc, {
      startY: 60,
      theme: "plain",
      body: [
        [
          `Cumulative GPA (CGPA): ${statistics?.cgpa.toFixed(2)}`,
          `Total Credit Units: ${statistics?.totalCreditUnits}`,
        ],
      ],
      styles: { fontStyle: "bold", fontSize: 12 },
    });

    let currentY = (doc as any).lastAutoTable.finalY + 15;
    const sessionsToPrint =
      selectedSession === "all"
        ? results
        : results?.filter((r) => r.session === selectedSession);

    for (const sessionData of sessionsToPrint || []) {
      doc.setFontSize(14).setFont("helvetica", "bold");
      doc.text(`${sessionData.session} Session`, 20, currentY);
      currentY += 8;

      const semestersToPrint =
        selectedSemester === "all" ? ["First", "Second"] : [selectedSemester];

      for (const semester of semestersToPrint) {
        const semesterResults =
          sessionData?.semesters[semester as keyof ISemesters] || [];
        if (semesterResults.length > 0) {
          doc.setFontSize(12).setFont("helvetica", "bold");
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
              ["Code", "Course Title", "CA", "Exam", "Total", "Units", "Grade"],
            ],
            body: tableBody,
            theme: "striped",
            headStyles: { fillColor: [22, 163, 74] },
          });

          currentY = (doc as any).lastAutoTable.finalY + 10;
        }
      }
    }

    const pageCount = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10).setFont("helvetica", "italic");
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

    const sessionFile =
      selectedSession === "all" ? "all-sessions" : selectedSession;
    const semesterFile =
      selectedSemester === "all" ? "" : `_${selectedSemester}-semester`;
    doc.save(
      `student_results_${sessionFile.replace("/", "-")}${semesterFile}.pdf`
    );
  } catch (error) {
    toast.error("Failed to generate PDF");
  } finally {
    setIsDownloading(false);
  }
};
