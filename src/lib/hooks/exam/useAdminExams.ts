// useAdminExams.ts (updated hook file)
import { useMemo, useState } from "react";
import jsPDF from "jspdf";
import { formatDuration } from "@/lib/functions";
import type {
  ExamsFilterState,
  IExam,
  IExamQuestion,
} from "@/screens/admin/exams/types";
import autoTable from "jspdf-autotable";
import {
  useDelateExamMutation,
  useGetAllExamsQuery,
  useUpdateAnExamMutation,
} from "@/redux/query/admin-exams";
import { toast } from "sonner";
import { useGetAllAcademicSessionsQuery } from "@/redux/query/admin-sessions";

export default function useAdminExams() {
  const [deleteExamTrigger, { isLoading: isDeletingExam }] =
    useDelateExamMutation();
  const [updateExamTrigger, { isLoading: isUpdatingExam }] =
    useUpdateAnExamMutation();
  const { data, isLoading: isLoadingExams } = useGetAllExamsQuery();
  const exams = data?.exams;

  const { data: academicSessions } = useGetAllAcademicSessionsQuery();
  const uniqueSession = academicSessions?.sessions || [];

  const [filters, setFilters] = useState<ExamsFilterState>({
    search: "",
    department: "all",
    course: "all",
    session: "all",
  });

  const [selectedExam, setSelectedExam] = useState<IExam | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Edit Dialog States
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [statusExam, setStatusExam] = useState<IExam | null>(null);
  const [isEditQuestionsOpen, setIsEditQuestionsOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<IExam | null>(null);

  const handleStatusToggle = (exam: IExam) => {
    setStatusExam(exam);
    setIsStatusDialogOpen(true);
  };

  const handleEditQuestionsTrigger = (exam: IExam) => {
    setEditingExam(exam);
    setIsEditQuestionsOpen(true);
  };

  const handleDeleteExam = async (id: string) => {
    const toastId = toast.loading("Deleting Exam...");

    try {
      await deleteExamTrigger(id).unwrap();

      toast.success("Exam successfully Deleted!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Update Exam", {
        id: toastId,
      });
    }
  };

  const handleSaveStatus = async (newStatus: boolean) => {
    if (!statusExam) return;

    const toastId = toast.loading("Updating Exam Status...");

    try {
      // ONLY send the field being updated
      await updateExamTrigger({
        examId: statusExam._id,
        data: { isActive: newStatus }, // ← Send ONLY isActive
      }).unwrap();

      toast.success("Exam status updated!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Update Exam Status", {
        id: toastId,
      });
    }

    setIsStatusDialogOpen(false);
  };

  const handleSaveQuestions = async (updatedQuestions: IExamQuestion[]) => {
    if (!editingExam) return;

    const toastId = toast.loading("Updating Exam...");

    try {
      // ONLY send the questions array
      await updateExamTrigger({
        examId: editingExam._id,
        data: { questions: updatedQuestions },
      }).unwrap();

      toast.success("Exam successfully updated!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Update Exam", {
        id: toastId,
      });
    }

    setIsEditQuestionsOpen(false);
  };

  const filteredExams = useMemo(() => {
    return exams?.filter((exam) => {
      const matchesSearch = exam.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCourse =
        filters.course === "all" || exam.course?.title === filters.course;
      const matchesDepartment =
        filters.department === "all" ||
        exam.course?.department === filters.department;
      const matchesSession =
        filters.session === "all" || exam.session === filters.session;
      return (
        matchesSearch && matchesDepartment && matchesSession && matchesCourse
      );
    });
  }, [exams, filters]);

  const handlePreview = (exam: IExam) => {
    setSelectedExam(exam);
    setIsPreviewOpen(true);
  };

  const handleDownloadPDF = async (exam: IExam) => {
    // @ts-ignore
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("LAGOS STATE UNIVERSITY", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Course: ${exam.course?.code} - ${exam.course?.title}`, 105, 30, {
      align: "center",
    });
    doc.text(`Examination: ${exam.title}`, 105, 36, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Duration: ${formatDuration(exam.duration)}`, 20, 45);
    doc.text(`Total Marks: ${exam.totalMarks}`, 180, 45, { align: "right" });

    // Instructions
    doc.setLineWidth(0.5);
    doc.line(20, 48, 190, 48);
    doc.setFont("helvetica", "italic");
    doc.text(`Instructions: ${exam.instructions}`, 20, 55);
    doc.line(20, 58, 190, 58);
    doc.setFont("helvetica", "normal");

    let y = 70;

    // Separate questions
    const objectiveQuestions = exam.questions.filter(
      (q) => q.questionType === "objective"
    );
    const theoryQuestions = exam.questions.filter(
      (q) => q.questionType !== "objective"
    );

    // Objective Section
    if (objectiveQuestions.length > 0) {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(14);
      const totalObjectiveMarks = objectiveQuestions.reduce(
        (sum, q) => sum + q.marks,
        0
      );
      doc.text(
        `Section A: Objective Questions (Total: ${totalObjectiveMarks} Marks)`,
        20,
        y
      );
      y += 10;

      objectiveQuestions.forEach((q, i) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        const questionTitle = `${i + 1}. ${q.question}`;
        const splitTitle = doc.splitTextToSize(questionTitle, 170);
        doc.text(splitTitle, 20, y);
        y += splitTitle.length * 5 + 2;

        if (q.options) {
          q.options.forEach((opt, optIndex) => {
            doc.text(`   ${String.fromCharCode(65 + optIndex)}. ${opt}`, 25, y);
            y += 5;
          });
        }
        y += 5;
      });
    }

    // Theory Section
    if (theoryQuestions.length > 0) {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(14);
      doc.text("Section B: Theory Questions", 20, y);
      y += 10;

      theoryQuestions.forEach((q, i) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }

        const questionTitle = `${i + 1}. ${q.question} (${q.marks} Marks)`;
        const splitTitle = doc.splitTextToSize(questionTitle, 170);
        doc.text(splitTitle, 20, y);
        y += splitTitle.length * 5 + 2;

        y += 15; // Space for theory answer
        y += 5;
      });
    }

    doc.save(`${exam.course?.code || "exam"}_Exam_Paper.pdf`);
  };

  const handleExportList = async () => {
    // @ts-ignore
    const doc = new jsPDF();
    doc.text("Exam List Report", 14, 20);

    const rows =
      filteredExams?.map((e) => [
        e.title,
        e.course?.code ?? "",
        e.examType,
        formatDuration(e.duration),
        e.session,
      ]) ?? [];

    // @ts-ignore
    autoTable(doc, {
      startY: 30,
      head: [["Title", "Course", "Type", "Duration", "Session"]],
      body: rows,
    });

    doc.save("Exam_List_Report.pdf");
  };

  return {
    filters,
    setFilters,
    filteredExams,
    uniqueSession,
    selectedExam,
    isPreviewOpen,
    isLoadingExams,
    handlePreview,
    setIsPreviewOpen,
    handleDownloadPDF,
    handleExportList,
    handleStatusToggle,
    handleSaveQuestions,
    handleEditQuestionsTrigger,
    isEditQuestionsOpen,
    setIsEditQuestionsOpen,
    editingExam,
    handleDeleteExam,
    isStatusDialogOpen,
    setIsStatusDialogOpen,
    statusExam,
    handleSaveStatus,
  };
}
