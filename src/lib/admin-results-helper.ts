import type {
  GroupedStudentData,
  IStudentResult,
} from "@/screens/admin/results/types";
import jsPDF from "jspdf";

export function groupResultsByStudent(
  results: IStudentResult[]
): GroupedStudentData[] {
  const map = new Map<string, GroupedStudentData>();

  results.forEach((result) => {
    const studentId = result?.student?._id;
    if (!studentId) return; // Skip if no student ID

    if (!map.has(studentId)) {
      map.set(studentId, {
        student: {
          ...result.student,
          level: result?.student?.level || 100, // Default to 100 if missing
        },
        results: [],
        averageScore: 0,
        totalUnits: 0,
        cgpa: 0,
      });
    }
    const entry = map.get(studentId)!;
    entry.results.push(result);
  });

  return Array.from(map.values()).map((entry) => {
    const totalScore = entry.results.reduce((sum, r) => sum + r.total, 0);
    // Mock Unit sum (assuming 3 units per course if not specified)
    const totalUnits = entry.results.reduce(
      (sum, r) => sum + (r.course?.creditUnit || 3),
      0
    );

    return {
      ...entry,
      totalUnits,
      averageScore:
        entry.results.length > 0 ? totalScore / entry.results.length : 0,
      cgpa: 3.5 + Math.random() * 1.5, // Random mock CGPA between 3.5 and 5.0
    };
  });
}
export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function exportToCSV(data: GroupedStudentData[]) {
  if (data.length === 0) return;

  const flattened = data.flatMap((item) =>
    item.results.map((r) => ({
      "Student Name": item.student.name,
      "Matric No": item.student.matricNo,
      Department: item.student.department || "N/A",
      Level: item.student.level,
      "Course Code": r?.course?.code,
      "Course Title": r?.course?.title,
      Unit: r?.course?.creditUnit || 3,
      Session: r.session,
      Semester: r.semester,
      CA: r.ca,
      Exam: r.exam,
      Total: r.total,
      Grade: r.grade,
    }))
  );

  const headers = Object.keys(flattened[0]);
  const csvContent = [
    headers.join(","),
    ...flattened.map((row) =>
      headers
        .map((header) => {
          const val = (row as any)[header];
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `student_results_export_${new Date().toISOString().slice(0, 10)}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportFilteredPDF(
  data: GroupedStudentData[],
  title: string = "Student Results Report"
) {
  if (typeof jsPDF === "undefined") {
    alert("PDF generation library not loaded.");
    return;
  }

  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text(title, 14, 22);
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

  // Prepare table data
  // We will show a summary table: Student Name, Matric, Dept, CGPA
  const tableColumn = [
    "Name",
    "Matric No",
    "Department",
    "Level",
    "Courses Taken",
    "Avg Score",
    "CGPA",
  ];
  const tableRows: any[] = [];

  data.forEach((item) => {
    const studentData = [
      item.student.name,
      item.student.matricNo,
      item.student.department || "Cybersecurity",
      item.student.level,
      item.results.length,
      item.averageScore.toFixed(2),
      item.cgpa.toFixed(2),
    ];
    tableRows.push(studentData);
  });

  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 40,
    theme: "grid",
    styles: { fontSize: 9 },
    headStyles: { fillColor: [79, 70, 229] }, // Primary color
  });

  doc.save(`student_report_${new Date().toISOString().slice(0, 10)}.pdf`);
}
