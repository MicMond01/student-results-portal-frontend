import Table from "@/components/table/table";
import Banner from "@/components/ui-components/Banner";
import { useState, useMemo } from "react";
import { PiStudentBold } from "react-icons/pi";
import StudentsFilters from "./table-config/students-filters";
import {
  useDeleteResultMutation,
  useGetAllResultsForLecturerCoursesQuery,
} from "@/redux/query/lecturer";
import { DOWNLOADABLE } from "@/components/table/types";
import type { IFilterState } from "./types";
import { studentResultsTableHeaders } from "./table-config/students-table-headers";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LecturerStudents: React.FC = () => {
  const { data, isLoading } = useGetAllResultsForLecturerCoursesQuery();
  const [deleteResult, { isLoading: isDeleting }] = useDeleteResultMutation();

  const navigate = useNavigate();

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

  const handleDownloadXlsx = (rows: any[]) => {
    // console.log("Download data:", rows);
    // Implement XLSX download logic
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteResult(id).unwrap();
      toast.success("Result deleted successfully");
    } catch (error) {
      toast.error("Error deleting result");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <Banner
        title="My Students Results"
        desc="View and manage student results for all your courses. Filter by session and course to see specific results."
        actionButton={<PiStudentBold className="text-primary" size={40} />}
        containterClass="mb-8"
      />

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
        onDownloadXlsx={handleDownloadXlsx}
        id="_id"
      />
    </main>
  );
};

export default LecturerStudents;
