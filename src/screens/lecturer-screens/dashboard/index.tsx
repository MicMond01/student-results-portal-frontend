import Badge from "@/components/ui-components/Badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  MoreHorizontal,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import MiniTrendBar from "./components/MiniTrendBar";
import GradeDistributionChart from "./components/GradeDistributionChart";
import type { IGradeDistribution } from "@/types/lecturer";
import DashboardSkeleton from "./components/LecturerSkeleton";
import { useGetLecturerCoursesAnalyticsQuery } from "@/redux/query/lecturer-courses";

const LecturerDashboard = () => {
  const { data: analyticsData, isLoading: isLoadingAnalytics } =
    useGetLecturerCoursesAnalyticsQuery();
  const { overall, byCourse, bySession } = analyticsData?.analytics || {};
  console.log(analyticsData);

  const EMPTY_GRADE_DISTRIBUTION: IGradeDistribution = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  const gradeData = overall?.gradeDistribution ?? EMPTY_GRADE_DISTRIBUTION;

  if (isLoadingAnalytics) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen  p-6 lg:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Lecturer Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Academic Overview • {new Date().getFullYear()} Session
          </p>
        </div>
        <div className="flex items-center bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">
            2023-2025 Sessions
          </span>
          <ChevronDown className="h-4 w-4 text-gray-400 ml-2" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Total Students */}
        <Card className="p-5 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <Badge
              variant="success"
              className="bg-emerald-50 text-emerald-700 flex items-center gap-1"
            >
              +5.2% <TrendingUp className="h-3 w-3" />
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">
              Total Students
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {overall?.totalStudents.toLocaleString()}
            </h3>
          </div>
        </Card>

        {/* Average GPA */}
        <Card className="p-5 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <GraduationCap className="h-6 w-6" />
            </div>
            <Badge
              variant="success"
              className="bg-emerald-50 text-emerald-700 flex items-center gap-1"
            >
              +0.2 <TrendingUp className="h-3 w-3" />
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">
              Average GPA
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {overall?.overallAverageGPA}
            </h3>
          </div>
        </Card>

        {/* Pass Rate */}
        <Card className="p-5 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <Badge
              variant="success"
              className="bg-emerald-50 text-emerald-700 flex items-center gap-1"
            >
              +2.1% <TrendingUp className="h-3 w-3" />
            </Badge>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Pass Rate</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {overall?.passRate}
            </h3>
          </div>
        </Card>

        {/* Total Courses */}
        <Card className="p-5 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <BookOpen className="h-6 w-6" />
            </div>
            <Badge className="bg-gray-50 text-gray-600">0%</Badge>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">
              Total Courses
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {overall?.totalCourses}
            </h3>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Grade Distribution
              </h3>
              <p className="text-sm text-gray-500">
                Across all {overall?.totalCourses} courses this session
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5 text-gray-400" />
            </Button>
          </div>
          <GradeDistributionChart data={gradeData} />
        </Card>

        {/* Side Panel: Session Trends */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Session Trends</h3>
            <span className="text-sm text-indigo-600 font-semibold cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="space-y-6">
            {bySession?.map((session, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center pb-6 border-b border-gray-50 last:border-0 last:pb-0"
              >
                <div>
                  <h4 className="font-bold text-gray-800">{session.session}</h4>
                  <p className="text-xs text-gray-500">
                    {session.students} Students
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900 text-lg">
                    {session.averageGPA} GPA
                  </div>
                  <div className="flex justify-end mt-1">
                    <MiniTrendBar value={(session.averageGPA / 5) * 100} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Breakdown Table */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            Detailed Breakdown
          </h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-semibold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Course Title</th>
                  <th className="px-6 py-4">Total Students</th>
                  <th className="px-6 py-4 w-1/5">Pass Rate</th>
                  <th className="px-6 py-4 w-1/5">Grade Dist.</th>
                  <th className="px-6 py-4 text-right">Avg Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {byCourse?.map((course, idx) => {
                  const passRateVal = parseFloat(course.passRate);
                  return (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">
                          {course.code}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">
                          {course.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          3 Credits • Core
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {course.totalStudents}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                passRateVal > 90
                                  ? "bg-emerald-500"
                                  : passRateVal > 70
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: course.passRate }}
                            ></div>
                          </div>
                          <span className="text-xs font-bold text-gray-700 w-12">
                            {course.passRate}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex h-1.5 w-full rounded-full overflow-hidden">
                          <div
                            style={{
                              width: `${
                                (course.gradeDistribution.A /
                                  course.totalStudents) *
                                100
                              }%`,
                            }}
                            className="bg-emerald-500"
                            title={`A: ${course.gradeDistribution.A}`}
                          />
                          <div
                            style={{
                              width: `${
                                (course.gradeDistribution.B /
                                  course.totalStudents) *
                                100
                              }%`,
                            }}
                            className="bg-emerald-300"
                            title={`B: ${course.gradeDistribution.B}`}
                          />
                          <div
                            style={{
                              width: `${
                                (course.gradeDistribution.C /
                                  course.totalStudents) *
                                100
                              }%`,
                            }}
                            className="bg-amber-400"
                            title={`C: ${course.gradeDistribution.C}`}
                          />
                          <div
                            style={{
                              width: `${
                                (course.gradeDistribution.F /
                                  course.totalStudents) *
                                100
                              }%`,
                            }}
                            className="bg-red-500"
                            title={`F: ${course.gradeDistribution.F}`}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-gray-900">
                        {course.averageScore}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LecturerDashboard;
