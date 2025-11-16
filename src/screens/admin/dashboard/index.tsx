import StatCard from "@/components/ui-components/StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetDashboardStatsQuery } from "@/redux/query/admin-dashboard";
import {
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  PieChartIcon,
  Users,
  Users2,
} from "lucide-react";
import StudentsByLevelChart from "./StudentsByLevelChart";
import StudentsByDepartmentChart from "./StudentsByDepartmentChart";

const AdminDashboard = () => {
  const { data: statsData } = useGetDashboardStatsQuery();

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-380 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-base text-gray-600">
            Welcome back! Here's an overview of the university's stats.
          </p>
        </div>

        {/* Top Stat Cards Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <StatCard
            title="Total Students"
            value={statsData?.stats?.totalStudents || 0}
            icon={Users}
          />
          <StatCard
            title="Total Lecturers"
            value={statsData?.stats?.totalLecturers || 0}
            icon={Briefcase}
          />
          <StatCard
            title="Total Courses"
            value={statsData?.stats?.totalCourses || 0}
            icon={BookOpen}
          />
          <StatCard
            title="Total Departments"
            value={statsData?.stats?.totalDepartments || 0}
            icon={Building}
          />
          <StatCard
            title="Current Session"
            value={statsData?.stats?.currentSession || 0}
            icon={Calendar}
            className="bg-primary-4 text-white"
          />
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Chart: Student Enrollment by Level */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users2 className="mr-2 h-5 w-5 text-gray-500" />
                Student Enrollment by Level
              </CardTitle>
              <CardDescription>
                Total number of students in each level for the current session.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] w-full">
              <StudentsByLevelChart
                data={statsData?.stats?.studentsByLevel || []}
              />
            </CardContent>
          </Card>

          {/* Side Chart: Student Distribution by Department */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChartIcon className="mr-2 h-5 w-5 text-gray-500" />
                Student Distribution
              </CardTitle>
              <CardDescription>
                Breakdown of students by their department.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] w-full">
              <StudentsByDepartmentChart
                data={statsData?.stats?.studentsByDepartment || []}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
