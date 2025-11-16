import StatCard from "@/components/ui-components/StatCard";
import { BookOpen, CheckCheck, User, Users } from "lucide-react";
import type { ILecturerStats } from "../type";

const StatisticsGrid: React.FC<{ stats: ILecturerStats }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={BookOpen}
        title="Total Courses"
        value={stats.totalCourses}
        description="Courses assigned this session"
      />
      <StatCard
        icon={Users}
        title="Total Students"
        value={stats.totalStudents}
        description="All students across all courses"
      />
      <StatCard
        icon={User}
        title="Unique Students"
        value={stats.uniqueStudents}
        description="Unique student count"
      />
      <StatCard
        icon={CheckCheck}
        title="Results Uploaded"
        value={`${stats.resultsUploaded}%`}
        description="Completion for last semester"
      />
    </div>
  );
};

export default StatisticsGrid;
