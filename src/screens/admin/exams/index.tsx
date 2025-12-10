import { BookOpen, Plus, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExamPreviewDialog from "./components/ExamPreviewDialog";
import ExamsFilters from "./table-config/exams-filters";
import { examsTableHeaders } from "./table-config/exams-table-headers";
import { Card, CardContent } from "@/components/ui/card";
import Table from "@/components/table/table";
import useAdminExams from "@/lib/hooks/exam/useAdminExams";
import EditQuestionsDialog from "./components/EditQuestionDialog";
import { useGetAllAcademicSessionsQuery } from "@/redux/query/admin-sessions";

const AdminExams = () => {
  const {
    filters,
    setFilters,
    filteredExams,
    uniqueSession,
    isLoadingExams,
    handlePreview,
    handleDownloadPDF,
    handleExportList,
    isPreviewOpen,
    setIsPreviewOpen,
    selectedExam,
    handleDeleteExam,
    handleSaveQuestions,
    isEditQuestionsOpen,
    setIsEditQuestionsOpen,
    editingExam,
    handleEditQuestionsTrigger,
    // isStatusDialogOpen,
    // setIsStatusDialogOpen,
    // statusExam,
    // handleSaveStatus,
    // handleStatusToggle,
  } = useAdminExams();

  const { data: sessionsData } = useGetAllAcademicSessionsQuery();
  console.log("sessionsData");
  console.log(sessionsData);

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 lg:p-8 font-sans text-slate-900">
      <div className="mx-auto max-w-380  space-y-8 ">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <BookOpen className="h-7 w-7 text-indigo-600" />
              Exam Management
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Manage examinations, question papers, and archives.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleExportList}>
              <Printer className="mr-2 h-4 w-4" /> Export List
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
              <Plus className="mr-2 h-4 w-4" /> Create Exam
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ExamsFilters
        filters={filters}
        setFilters={setFilters}
        uniqueSession={uniqueSession}
      />

      {/* Table */}

      <Card>
        <CardContent className="p-0">
          <Table
            header={examsTableHeaders(
              handlePreview,
              handleDownloadPDF,
              handleDeleteExam,
              handleEditQuestionsTrigger
            )}
            isLoading={isLoadingExams}
            rows={filteredExams || []}
            id="_id"
          />
        </CardContent>
      </Card>

      {/* Modals */}
      <ExamPreviewDialog
        isOpen={isPreviewOpen}
        setIsOpen={setIsPreviewOpen}
        exam={selectedExam}
        handleDownloadPDF={handleDownloadPDF}
      />

      <EditQuestionsDialog
        isOpen={isEditQuestionsOpen}
        setIsOpen={setIsEditQuestionsOpen}
        questions={editingExam?.questions || []}
        handleSaveQuestions={handleSaveQuestions}
      />

      {/* <ExamStatusDialog
        isOpen={isStatusDialogOpen}
        setIsOpen={setIsStatusDialogOpen}
        exam={statusExam}
        handleSaveStatus={handleSaveStatus}
      /> */}
    </div>
  );
};

export default AdminExams;
