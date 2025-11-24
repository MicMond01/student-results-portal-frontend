import Badge from "@/components/ui-components/Badge";
import InfoItem from "@/components/ui-components/InfoItem";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNameInitials } from "@/lib/functions";
import {
  Activity,
  AlertCircle,
  ArrowLeft,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  Edit2,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  School,
  TrendingUp,
  Users,
} from "lucide-react";
import StatCard from "./stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GradeDistributionChart from "@/components/ui-components/GradeDistributionChart";
import type { IAdminLecturer, LecturerFormData } from "./type";
import {
  useDeleteLecturerMutation,
  useGetLectureDetailsQuery,
  useUpdateLecturerMutation,
} from "@/redux/query/admin-lecturers";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useAdminLecturersStore } from "@/stores/useAdminLecturersStore";
import LecturerProfileSkeleton from "./lecturer-profile-skeleton";
import ManageLecturerDialog from "./manage-lecturer-dialog";

const LecturerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteLecturerTrigger, { isLoading: isDeleting }] =
    useDeleteLecturerMutation();
  const [updateLecturerTrigger, { isLoading: isUpdating }] =
    useUpdateLecturerMutation();

  const { openEditDialog, closeDialog } = useAdminLecturersStore();
  const handleDeleteLecturer = async (id: string) => {
    const toastId = toast.loading("Deleting Lecturer...");

    try {
      await deleteLecturerTrigger(id).unwrap();

      toast.success("Lecturer successfully Deleted!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Delete Lecturer", {
        id: toastId,
      });
    }
  };

  const { data: lecturerDetails, isLoading } = useGetLectureDetailsQuery(id);
  const {
    lecturer: lecturerData,
    stats,
    courses,
    exams,
    recentResults,
  } = lecturerDetails || {};

  // Combine name parts to get initials
  const initials = getNameInitials(lecturerData?.name || "");

  const handleSaveLecturer = async (data: LecturerFormData) => {
    const toastId = toast.loading("Updating Lecturer Profile...");

    try {
      await updateLecturerTrigger({
        id: lecturerData?._id || "",
        data,
      }).unwrap();
      toast.success("Lecturer successfully updated!", { id: toastId });
      closeDialog();
    } catch (error: any) {
      const message =
        error?.data?.msg || error?.data?.message || "An error occurred";
      toast.error(message, { id: toastId });
    }
  };

  if (isLoading) {
    return <LecturerProfileSkeleton />;
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 animate-in fade-in duration-300">
      <div className="mx-auto  max-w-380 space-y-6">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/lecturers")}
            className="pl-0 hover:bg-transparent hover:text-indigo-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Lecturers
          </Button>
        </div>

        {/* Header Profile Card */}
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-32 bg-linear-to-r from-indigo-600 to-purple-600"></div>
          <div className="px-6 pb-6">
            <div className="relative flex flex-col items-center sm:flex-row sm:items-end -mt-12 mb-6 gap-4">
              <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                <AvatarImage src={lecturerData?.profilePhoto || undefined} />
                <AvatarFallback className="text-3xl bg-indigo-100 text-indigo-700">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center pt-8 sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {lecturerData?.name}
                  </h1>
                  <Badge
                    variant={
                      lecturerData?.status === "Active"
                        ? "success"
                        : "secondary"
                    }
                  >
                    {lecturerData?.status}
                  </Badge>
                </div>
                <p className="text-indigo-600 font-medium">
                  {lecturerData?.rank}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Building className="h-3.5 w-3.5" />{" "}
                    {lecturerData?.department.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" />{" "}
                    {lecturerData?.staffId}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />{" "}
                    {lecturerData?.address || "Lagos, NG"}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" /> Contact
                </Button>
                <Button
                  onClick={() => openEditDialog(lecturerData as IAdminLecturer)}
                >
                  <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
                <ConfirmationDialog
                  title="Confirm Delete"
                  triggerLabel="Delete Lecturer"
                  description="Are you sure you want to delete this Lecturer? "
                  action={() => handleDeleteLecturer(lecturerData?._id || "")}
                  type="delete"
                  confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
              <InfoItem
                icon={GraduationCap}
                label="Highest Degree"
                value={lecturerData?.highestDegree}
              />
              <InfoItem
                icon={School}
                label="Institution"
                value={lecturerData?.institution}
              />
              <InfoItem
                icon={Award}
                label="Specialization"
                value={lecturerData?.specialization}
              />
              <InfoItem
                icon={Calendar}
                label="Joined"
                value={new Date(
                  lecturerData?.createdAt || ""
                ).toLocaleDateString()}
              />
              <InfoItem
                icon={Clock}
                label="Experience"
                value={`${lecturerData?.yearsOfExperience} Years`}
              />
              <InfoItem
                icon={Users}
                label="Academic Advisor"
                value={lecturerData?.academicAdvisor || "Not Assigned"}
              />
            </div>
          </div>
        </Card>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Courses"
            value={stats?.totalCourses || 0}
            icon={BookOpen}
            color="bg-blue-500"
          />
          <StatCard
            title="Students Taught"
            value={stats?.totalStudentsAcrossAllCourses || 0}
            icon={Users}
            color="bg-purple-500"
          />
          <StatCard
            title="Pass Rate"
            value={`${stats?.passRate}%`}
            icon={TrendingUp}
            color="bg-green-500"
            trend="+2.4% vs last session"
          />
          <StatCard
            title="Avg. Performance"
            value={`${stats?.averagePerformance}%`}
            icon={Activity}
            color="bg-amber-500"
          />
        </div>

        {/* Main Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Tabs for detailed data */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="courses">
              <TabsList>
                <TabsTrigger value="courses">
                  Courses ({courses?.length})
                </TabsTrigger>
                <TabsTrigger value="exams">
                  Active Exams ({exams?.length})
                </TabsTrigger>
                <TabsTrigger value="recent">Recent Results Log</TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses">
                <div className="space-y-4">
                  {courses?.map((course) => (
                    <Card
                      key={course._id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-bold text-lg text-gray-900">
                                {course.title}
                              </h3>
                              <Badge variant="outline">{course.code}</Badge>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {course.level}L • {course.semester} Semester •{" "}
                              {course.session}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-indigo-600">
                              {course.passRate}%
                            </div>
                            <div className="text-xs text-gray-500 uppercase font-medium">
                              Pass Rate
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t pt-4 bg-gray-50 -mx-5 -mb-5 px-5 pb-4 mt-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-800">
                              {course.totalStudents}
                            </div>
                            <div className="text-xs text-gray-500">
                              Students
                            </div>
                          </div>
                          <div className="text-center border-l border-r border-gray-200">
                            <div className="text-lg font-semibold text-gray-800">
                              {course.averageScore}
                            </div>
                            <div className="text-xs text-gray-500">
                              Avg Score
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-800">
                              {course.totalResults}
                            </div>
                            <div className="text-xs text-gray-500">Results</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Exams Tab */}
              <TabsContent value="exams">
                <div className="space-y-4">
                  {exams?.map((exam) => (
                    <Card key={exam._id}>
                      <CardContent className="p-5 flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {exam.title}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {exam.course.code} • {exam.session}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="secondary" className="capitalize">
                                {exam.examType}
                              </Badge>
                              <Badge
                                variant={
                                  exam.isActive ? "success" : "secondary"
                                }
                              >
                                {exam.isActive ? "Active" : "Closed"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">
                            {exam.totalMarks}
                          </div>
                          <div className="text-xs text-gray-500">Marks</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {exams?.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      No active exams.
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* Recent Results Tab */}
              <TabsContent value="recent">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Recently Uploaded Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                          <tr>
                            <th className="px-4 py-3">Student</th>
                            <th className="px-4 py-3">Course</th>
                            <th className="px-4 py-3 text-center">Score</th>
                            <th className="px-4 py-3 text-center">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {recentResults?.map((result) => (
                            <tr
                              key={result._id}
                              className="hover:bg-gray-50/50"
                            >
                              <td className="px-4 py-3">
                                <div className="font-medium text-gray-900">
                                  {result.student.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {result.student.matricNo}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-gray-600">
                                {result.course.code}
                              </td>
                              <td className="px-4 py-3 text-center font-medium">
                                {result.total}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <Badge
                                  variant={
                                    ["A", "B"].includes(result.grade)
                                      ? "success"
                                      : ["C", "D", "E"].includes(result.grade)
                                      ? "warning"
                                      : "danger"
                                  }
                                >
                                  {result.grade}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column: Analytics */}
          <div className="space-y-6">
            {/* Grade Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-gray-500" />
                  Overall Grade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <GradeDistributionChart
                  distribution={
                    stats?.gradeDistribution || {
                      A: 0,
                      B: 0,
                      C: 0,
                      D: 0,
                      E: 0,
                      F: 0,
                    }
                  }
                />
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Account Status</span>
                  <Badge variant="secondary" className="capitalize">
                    {lecturerData?.accountStatus}
                  </Badge>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Verification</span>
                  {lecturerData?.isVerified ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Verified
                    </span>
                  ) : (
                    <span className="text-amber-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> Pending
                    </span>
                  )}
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">First Login</span>
                  <span className="font-medium">
                    {lecturerData?.isFirstLogin ? "Yes" : "No"}
                  </span>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Reset Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <ManageLecturerDialog
        onSave={handleSaveLecturer}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default LecturerProfilePage;
