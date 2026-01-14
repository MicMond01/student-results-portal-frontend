import { useGetCourseDetailsQuery } from "@/redux/query/lecturer-courses";
import {
  ArrowLeft,
  Calendar,
  FileText,
  GraduationCap,
  Layers,
  Plus,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PageSkeleton from "./PageSkeleton";
import Badge from "@/components/ui-components/Badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GradeDistributionChart from "./GradeDistributionChart";
import CardHeader from "./CardHeader";
import CourseStudents from "./CourseStudents";
import type { GradeDistribution, Stats } from "./types";
import PendingResultsCard from "./PendingResultsCard";
import { type ResultFormData } from "@/components/ui-components/CreateResultDialog";
import { toast } from "sonner";
import { useUploadResultForStudentMutation } from "@/redux/query/lecturer-results";
import { CreateResultDialog } from "./CreateResultDialog";
import { useState } from "react";

const LecturerCourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: courseDetails, isLoading: isLoadingDetails } =
    useGetCourseDetailsQuery(id || "", {
      skip: !id,
    });
  const { course, stats, students, results, studentsWithoutResults } =
    courseDetails || {};
  const [uploadResult, { isLoading: isCreatingResult }] =
    useUploadResultForStudentMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  console.log(selectedStudent);

  const EMPTY_GRADE_DISTRIBUTION: GradeDistribution = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  const EMPTY_STATS: Stats = {
    totalStudents: 0,
    totalResults: 0,
    pendingResults: 0,
    averageScore: "0",
    passRate: "0",
    gradeDistribution: EMPTY_GRADE_DISTRIBUTION,
  };

  if (isLoadingDetails) return <PageSkeleton />;

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
    <div className="min-h-screen  p-6 lg:p-8 text-slate-800 animate-in fade-in duration-500">
      {/* Navigation & Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/courses")}
          className="flex items-center gap-2 text-gray-500 mb-4 hover:text-indigo-600 cursor-pointer transition-colors w-fit"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Courses</span>
        </Button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {course?.title}
              </h1>
              <Badge variant="neutral">{course?.code}</Badge>
            </div>
            <p className="text-gray-500 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-indigo-500" />{" "}
                {course?.department.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-indigo-500" /> {course?.level}{" "}
                Level
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-indigo-500" />{" "}
                {course?.session}
              </span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="shadow-sm border-gray-300">
              <FileText className="mr-2 h-4 w-4" /> View Course Outline
            </Button>
            <Button className="shadow-lg shadow-indigo-200">
              <Plus className="mr-2 h-4 w-4" /> Upload Result
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <CardHeader stats={stats ?? EMPTY_STATS} />

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Data Tables */}
        <div
          className={`space-y-6 ${
            studentsWithoutResults && studentsWithoutResults.length > 0
              ? "lg:col-span-2"
              : "lg:col-span-3"
          }`}
        >
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900">Grade Distribution</h3>
            </div>
            <GradeDistributionChart
              data={stats?.gradeDistribution || EMPTY_GRADE_DISTRIBUTION}
            />
            <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Top Grade
                </p>
                <p className="text-xl font-bold text-emerald-600">A (16)</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                  Low Grade
                </p>
                <p className="text-xl font-bold text-red-600">F (4)</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar: Analytics */}
        {studentsWithoutResults && studentsWithoutResults.length > 0 && (
          <div className="lg:col-span-1 space-y-6">
            <PendingResultsCard
              student={studentsWithoutResults || []}
              onEdit={() => setIsDialogOpen(true)}
              onSelectStudent={setSelectedStudent}
            />
          </div>
        )}
      </div>
      <div className="lg:col-span-3 space-y-6 mt-6">
        <CourseStudents
          stats={stats ?? EMPTY_STATS}
          students={students || []}
          results={results || []}
          studentsWithoutResults={studentsWithoutResults || []}
        />
      </div>

      <CreateResultDialog
        courses={course}
        onSubmit={handleCreateResult}
        isLoading={isCreatingResult}
        defaultSession={course?.session || ""}
        defaultCourse={course?._id || ""}
        selectedStudent={selectedStudent}
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default LecturerCourseDetails;
