import React, { useMemo, useState } from "react";
import type { CourseFilterState } from "./type";
import { useGetAllCoursesQuery } from "@/redux/query/admin-courses";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CoursesFilters from "./table-config/courses-filters";
import { Card, CardContent } from "@/components/ui/card";
import Table from "@/components/table/table";
import { coursesListTableHeaders } from "./table-config/courses-table-headers";
import Banner from "@/components/ui-components/Banner";
import { PiBooks } from "react-icons/pi";
import { useAdminCoursesStore } from "@/stores/useAdminCoursesStore";

const CourseListPage: React.FC<{
  onDelete: (id: string) => void;
  isDeleting: boolean;
}> = ({ onDelete, isDeleting }) => {
  const [filters, setFilters] = useState<CourseFilterState>({
    query: "",
    session: "all",
    level: "all",
    department: "all",
  });

  const { handleEdit, onCreateNew, handleViewDetails } = useAdminCoursesStore();

  const { data: allCourses, isLoading: isLoadingCourses } =
    useGetAllCoursesQuery();

  const uniqueSessions = useMemo(
    () => [...new Set(allCourses?.courses.map((c) => c.session))],
    []
  );
  const uniqueLevels = useMemo(
    () => [...new Set(allCourses?.courses.map((c) => c.level))],
    []
  );

  const filteredCourses = useMemo(() => {
    return allCourses?.courses.filter((course) => {
      const queryLower = filters.query.toLowerCase();
      const matchesQuery =
        course.title.toLowerCase().includes(queryLower) ||
        course.code.toLowerCase().includes(queryLower);
      const matchesSession =
        filters.session === "all" || course.session === filters.session;
      const matchesLevel =
        filters.level === "all" || course.level === parseInt(filters.level);

      const matchesDept =
        filters.department === "all" ||
        course.department._id === filters.department;
      return matchesQuery && matchesSession && matchesLevel && matchesDept;
    });
  }, [allCourses, filters]);

  return (
    <div className="space-y-6">
      <Button onClick={onCreateNew}>
        <Plus className="mr-2 h-4 w-4" />
        Create Course
      </Button>
      <Banner
        title="Course Management"
        desc=" View, create, and manage all courses in the university."
        actionButton={<PiBooks className="text-primary" size={40} />}
        containterClass="mb-8"
      />
      <CoursesFilters
        filters={filters}
        setFilters={setFilters}
        sessions={uniqueSessions}
        levels={uniqueLevels}
      />
      <Card>
        <CardContent className="p-0">
          <Table
            header={coursesListTableHeaders(
              handleViewDetails,
              handleEdit,
              onDelete,
              isDeleting
            )}
            isLoading={isLoadingCourses}
            rows={filteredCourses || []}
            id="_id"
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default CourseListPage;
