import { useEffect, useState } from "react";
import DashboardSkeleton from "./DashboardSkeleton";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Award,
  Book,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  GraduationCap,
} from "lucide-react";
import StatCard from "./StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/functions";
import {
  useGetMyCoursesQuery,
  useGetMyResultsQuery,
  useGetOwnProfileQuery,
} from "@/redux/query/student";
import { getGradeColor } from "@/utils/getGradeColor";

const StudentDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { data: profileData } = useGetOwnProfileQuery();
  const { data: results } = useGetMyResultsQuery();
  const { data: courses } = useGetMyCoursesQuery();

  const profile = profileData?.profile;

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 md:p-8 min-h-screen bg-gray-50">
        <DashboardSkeleton />
      </div>
    );
  }

  // --- Data Processing for Dashboard ---
  const currentSessionCourses =
    courses?.groupedCourses.length || 0 > 0 ? courses?.groupedCourses[0] : null;

  const currentSessionResults =
    results?.results.length || 0 > 0 ? results?.results[0] : null;

  const recentSemesterResults = currentSessionResults?.semesters?.First || [];
  const recentSemesterCourses = currentSessionCourses?.semesters?.First || [];

  const gradeCounts =
    results?.results
      ?.flatMap((session) => Object.values(session.semesters).flat())
      .map((course) => course.grade)
      .reduce((acc, grade) => {
        acc[grade] = (acc[grade] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

  return (
    <div className="p-4 md:p-8 min-h-screen ">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {profile?.name.split(" ")[0]}!
          </h1>
          <p className="text-md text-gray-500 mt-1">
            Here's your academic summary for {profile?.session}.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Badge
            className={`text-sm px-4 py-2 rounded-full ${
              profile?.status === "Active"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {profile?.status === "Active" ? (
              <CheckCircle2 className="h-4 w-4 mr-2" />
            ) : (
              <AlertCircle className="h-4 w-4 mr-2" />
            )}
            Status: {profile?.status}
          </Badge>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Current CGPA"
          value={results?.statistics.cgpa.toFixed(2) || 0}
          description="Cumulative Grade Point Average"
          icon={<Award />}
          color="#3b82f6"
        />
        <StatCard
          title="Total Credits"
          value={results?.statistics.totalCreditUnits || 0}
          description="Total credits earned so far"
          icon={<CreditCard />}
          color="#10b981"
        />
        <StatCard
          title="Current Level"
          value={profile?.level || 0}
          description={`${profile?.program}`}
          icon={<GraduationCap />}
          color="#f59e0b"
        />
        <StatCard
          title="Courses This Session"
          value={currentSessionCourses?.totalCourses || 0}
          description={`Across ${
            Object.keys(currentSessionCourses?.semesters || {}).length
          } semesters`}
          icon={<Book />}
          color="#ef4444"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Larger) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Courses Card */}
          <Card className="rounded-xl shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Book className="w-5 h-5 mr-2 text-blue-600" />
                Current Courses ({currentSessionCourses?.session} First
                Semester)
              </CardTitle>
              <CardDescription>
                Courses you are registered for this semester.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Title</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Lecturer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSemesterCourses.length > 0 ? (
                    recentSemesterCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">
                          {course.code}
                        </TableCell>
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.creditUnit}</TableCell>
                        <TableCell>{course.lecturer.name}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        No courses found for this semester.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Results Card */}
          <Card className="rounded-xl shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <ClipboardCheck className="w-5 h-5 mr-2 text-green-600" />
                Result Snapshot ({currentSessionResults?.session} First
                Semester)
              </CardTitle>
              <CardDescription>
                Your most recent semester results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course</TableHead>
                    <TableHead>Total Score</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentSemesterResults.length > 0 ? (
                    recentSemesterResults.map((result) => (
                      <TableRow key={result.course}>
                        <TableCell className="font-medium">
                          {result.title}
                        </TableCell>
                        <TableCell>{result.total}</TableCell>
                        <TableCell>
                          <Badge
                            className={`border ${getGradeColor(
                              result.grade
                            )} font-semibold text-sm px-3 py-1`}
                          >
                            {result.grade}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No results found for this semester.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (Smaller) */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card className="rounded-xl shadow-md">
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4 border-4 border-gray-200 shadow-lg">
                <AvatarImage
                  src={profile?.profilePhoto}
                  alt={profile?.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-3xl">
                  {getNameInitials(profile?.name || "")}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{profile?.name}</CardTitle>
              <CardDescription className="text-md text-blue-600 font-medium">
                {profile?.matricNo}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-3">
              <div className="flex justify-between">
                <strong className="text-gray-700">Department:</strong>
                <span>{profile?.department}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-700">Faculty:</strong>
                <span>{profile?.faculty}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-700">Advisor:</strong>
                <span>{profile?.academicAdvisor}</span>
              </div>
              <div className="flex justify-between">
                <strong className="text-gray-700">Email:</strong>
                <span>{profile?.email}</span>
              </div>
            </CardContent>
          </Card>

          {/* Grade Distribution Card */}
          <Card className="rounded-xl shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Grade Distribution</CardTitle>
              <CardDescription>
                Summary of all grades earned so far.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(gradeCounts)
                .sort()
                .map(([grade, count]) => (
                  <div key={grade} className="flex items-center">
                    <Badge
                      className={`w-12 border ${getGradeColor(
                        grade
                      )} font-semibold text-sm px-3 py-1 justify-center`}
                    >
                      {grade}
                    </Badge>
                    <div className="flex-1 text-right text-sm font-medium text-gray-700">
                      {count as number}
                      {(count as number) > 1 ? "Courses" : "Course"}
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
