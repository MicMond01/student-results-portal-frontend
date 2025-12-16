import Table from "@/components/table/table";
import Banner from "@/components/ui-components/Banner";
import { useState, useMemo } from "react";
import { PiStudentDuotone } from "react-icons/pi";
import StudentsFilters from "./table-config/students-filters";
import { DOWNLOADABLE } from "@/components/table/types";
import type { IFilterState } from "./types";
import { studentResultsTableHeaders } from "./table-config/students-table-headers";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAdminResultsStore } from "@/stores/useAdminResultsStore";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import BulkUploadDialog from "./BulkUploadDialog";
import {
  useDeleteResultMutation,
  useGetAllResultsForLecturerCoursesQuery,
  useUploadResultForStudentMutation,
} from "@/redux/query/lecturer-results";
import { useGetCoursesAssignedToLecturerQuery } from "@/redux/query/lecturer-courses";
import {
  CreateResultDialog,
  type ResultFormData,
} from "@/components/ui-components/CreateResultDialog";

const LecturerStudents: React.FC = () => {
  const { data, isLoading } = useGetAllResultsForLecturerCoursesQuery();
  const [deleteResult, { isLoading: isDeleting }] = useDeleteResultMutation();

  const { data: coursesData } = useGetCoursesAssignedToLecturerQuery();

  const [uploadResult, { isLoading: isCreatingResult }] =
    useUploadResultForStudentMutation();

  const navigate = useNavigate();

  const { setIsBulkUploadOpen } = useAdminResultsStore();

  const [filters, setFilters] = useState<IFilterState>({
    studentName: "",
    session: "2024/2025",
    courseCode: "DSD022",
  });

  // Extract unique sessions and courses for filter options
  const { sessions, courses } = useMemo(() => {
    if (!data?.data) return { sessions: [], courses: [] };

    const sessionsSet = new Set<string>();
    const coursesMap = new Map<string, { code: string; title: string }>();

    data.data.forEach((studentData) => {
      studentData.results.forEach((result) => {
        sessionsSet.add(result.session);
        if (!coursesMap.has(result.course.code)) {
          coursesMap.set(result.course.code, {
            code: result.course.code,
            title: result.course.title,
          });
        }
      });
    });

    return {
      sessions: Array.from(sessionsSet).sort().reverse(), // Latest first
      courses: Array.from(coursesMap.values()).sort((a, b) =>
        a.code.localeCompare(b.code)
      ),
    };
  }, [data]);

  // Filter and flatten data for table display
  const filteredRows = useMemo(() => {
    if (!data?.data) return [];

    const rows: any[] = [];

    data.data.forEach((studentData) => {
      // Filter results based on selected filters
      const filteredResults = studentData.results.filter((result) => {
        const matchesSession = filters.session
          ? result.session === filters.session
          : true;
        const matchesCourse = filters.courseCode
          ? result.course.code === filters.courseCode
          : true;
        const matchesName = filters.studentName
          ? studentData.student.name
              .toLowerCase()
              .includes(filters.studentName.toLowerCase()) ||
            studentData.student.identifier.includes(filters.studentName)
          : true;

        return matchesSession && matchesCourse && matchesName;
      });

      // Create a row for each result
      filteredResults.forEach((result) => {
        rows.push({
          _id: result._id,
          studentId: studentData.student._id,
          studentName: studentData.student.name,
          studentIdentifier: studentData.student.identifier,
          courseCode: result.course.code,
          courseTitle: result.course.title,
          creditUnit: result.course.creditUnit,
          level: result.course.level,
          semester: result.semester,
          session: result.session,
          ca: result.ca,
          exam: result.exam,
          total: result.total,
          grade: result.grade,
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        });
      });
    });

    return rows;
  }, [data, filters]);

  const handleDelete = async (id: string) => {
    try {
      await deleteResult(id).unwrap();
      toast.success("Result deleted successfully");
    } catch (error) {
      toast.error("Error deleting result");
    }
  };

  const currentCourse =
    coursesData?.courses?.find((course) => course.code === filters.courseCode)
      ?._id || "";

  const handleCreateResult = async (data: ResultFormData) => {
    const toastId = toast.loading("Creating result...");

    try {
      await uploadResult(data).unwrap();
      toast.success("Result created successfully!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.msg || "Failed to create result", {
        id: toastId,
      });

      throw error;
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <PiStudentDuotone className="h-7 w-7 text-indigo-600" />
            My Students Results
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            View and manage student results for all your courses. Filter by
            session and course to see specific results.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsBulkUploadOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Bulk Upload
          </Button>
          <CreateResultDialog
            courses={coursesData?.courses || []}
            onSubmit={handleCreateResult}
            isLoading={isCreatingResult}
            triggerLabel="Add Result"
            defaultSession={filters.session}
            defaultCourse={currentCourse}
          />
        </div>
      </div>

      {/* Filters */}
      <StudentsFilters
        filters={filters}
        setFilters={setFilters}
        sessions={sessions}
        courses={courses}
      />

      {/* Table */}
      <Table
        header={studentResultsTableHeaders(navigate, handleDelete, isDeleting)}
        isLoading={isLoading}
        rows={filteredRows}
        downloadables={[DOWNLOADABLE.XLSX, DOWNLOADABLE.PDF]}
        id="_id"
      />

      <BulkUploadDialog />
    </main>
  );
};

export default LecturerStudents;
