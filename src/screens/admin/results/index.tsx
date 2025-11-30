import { useGetAllResultsQuery } from "@/redux/query/admin-results";
import { useEffect, useMemo, useState } from "react";
import StudentsTable from "./table-config/StudentsTable";
import type { GroupedStudentData, IStudentResult } from "./types";
import {
  exportFilteredPDF,
  exportToCSV,
  groupResultsByStudent,
} from "@/lib/admin-results-helper";
import StudentResultProfile from "./StudentResultProfile";
import ResultsDialogs from "./ResultsDialogs";

const calculateGrade = (total: number) => {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 45) return "D";
  if (total >= 40) return "E";
  return "F";
};

const AdminResults = () => {
  const { data: studentResultData, isLoading: queryLoading } =
    useGetAllResultsQuery();

  const [data, setData] = useState<GroupedStudentData[]>([]);

  // View State
  const [currentView, setCurrentView] = useState<"dashboard" | "profile">(
    "dashboard"
  );
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Selection States
  const [selectedResult, setSelectedResult] = useState<IStudentResult | null>(
    null
  );

  // Form State for Add Result
  const [newResultForm, setNewResultForm] = useState({
    matricNo: "",
    studentName: "",
    courseCode: "",
    courseTitle: "",
    unit: 3,
    session: "2024/2025",
    semester: "First",
    ca: 0,
    exam: 0,
  });

  // --- Data Fetching & Transformation ---
  useEffect(() => {
    if (studentResultData?.results) {
      
      const grouped = groupResultsByStudent(studentResultData.results);
      setData(grouped);
    }
  }, [studentResultData]);


  // --- Filter Options Extraction ---
  const uniqueDepartments = useMemo(
    () =>
      Array.from(new Set(data.map((d) => d.student.department.name || "N/A"))),
    [data]
  );

  const uniqueLevels = useMemo(
    () =>
      Array.from(new Set(data.map((d) => d.student.level)))
        .sort((a, b) => a - b)
        .map(String),
    [data]
  );

  const uniqueSessions = useMemo(() => {
    const sessions = new Set<string>();
    data.forEach((student) => {
      student.results.forEach((r) => sessions.add(r.session));
    });
    return Array.from(sessions).sort().reverse();
  }, [data]);

  // --- Filtering Logic ---
  const filteredData = useMemo(() => {
    if (!data.length) return [];

    return data.filter((item) => {
      const matchesSearch =
        item.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.student.matricNo.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = departmentFilter
        ? item.student.department.name === departmentFilter
        : true;

      const matchesLevel = levelFilter
        ? item.student?.level === Number(levelFilter)
        : true;

      const matchesSession = sessionFilter
        ? item.results.some((r) => r.session === sessionFilter)
        : true;

      return matchesSearch && matchesDept && matchesLevel && matchesSession;
    });
  }, [data, searchQuery, departmentFilter, levelFilter, sessionFilter]);


  // --- Handlers ---
  const handleEditResult = (result: IStudentResult) => {
    setSelectedResult(result);
    setIsEditModalOpen(true);
  };

  const handleDeleteResult = (resultId: string) => {
    if (confirm("Are you sure you want to delete this result?")) {
      setData((prev) =>
        prev.map((group) => ({
          ...group,
          results: group.results.filter((r) => r._id !== resultId),
        }))
      );
    }
  };

  const handleViewProfile = (studentId: string) => {
    setSelectedStudentId(studentId);
    setCurrentView("profile");
    window.scrollTo(0, 0);
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedStudentId(null);
  };

  const handleCreateResult = () => {
    if (selectedStudentId) {
      const student = data.find(
        (s) => s.student._id === selectedStudentId
      )?.student;
      setNewResultForm({
        matricNo: student?.matricNo || "",
        studentName: student?.name || "",
        courseCode: "",
        courseTitle: "",
        unit: 3,
        session: "2024/2025",
        semester: "First",
        ca: 0,
        exam: 0,
      });
    } else {
      setNewResultForm({
        matricNo: "",
        studentName: "",
        courseCode: "",
        courseTitle: "",
        unit: 3,
        session: "2024/2025",
        semester: "First",
        ca: 0,
        exam: 0,
      });
    }
    setIsCreateModalOpen(true);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredData);
  };

  const handleExportPDF = () => {
    exportFilteredPDF(filteredData);
  };

  const calculatedTotal =
    (Number(newResultForm.ca) || 0) + (Number(newResultForm.exam) || 0);
  const calculatedGrade = calculateGrade(calculatedTotal);

  const currentStudentData = data.find(
    (s) => s.student._id === selectedStudentId
  );

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-900">
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentView === "dashboard" ? (
            <div className="space-y-6">
              <StudentsTable
                data={filteredData}
                isLoading={queryLoading}
                onEditResult={handleEditResult}
                onDeleteResult={handleDeleteResult}
                onViewStudentProfile={handleViewProfile}
                onExportCSV={handleExportCSV}
                onExportPDF={handleExportPDF}
                onCreate={handleCreateResult}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                departmentFilter={departmentFilter}
                onDepartmentFilterChange={setDepartmentFilter}
                departments={uniqueDepartments}
                levelFilter={levelFilter}
                onLevelFilterChange={setLevelFilter}
                levels={uniqueLevels}
                sessionFilter={sessionFilter}
                onSessionFilterChange={setSessionFilter}
                sessions={uniqueSessions}
              />
            </div>
          ) : currentStudentData ? (
            <StudentResultProfile
              data={currentStudentData}
              onBack={handleBackToDashboard}
              onEditResult={handleEditResult}
              onDeleteResult={handleDeleteResult}
              onAddResult={handleCreateResult}
            />
          ) : (
            <div className="text-center py-12">Student not found</div>
          )}
        </main>
      </div>

      <ResultsDialogs
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedResult={selectedResult}
        uniqueSessions={uniqueSessions}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
        newResultForm={newResultForm}
        setNewResultForm={setNewResultForm}
        calculatedTotal={calculatedTotal}
        calculatedGrade={calculatedGrade}
        selectedStudentId={selectedStudentId}
      />
    </div>
  );
};

export default AdminResults;
