import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowLeft,
  Award,
  BookOpen,
  CalendarDays,
  CalendarIcon,
  Clock,
  FileText,
  Layers,
  School,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdminCoursesStore } from "@/stores/useAdminCoursesStore";
import Banner from "@/components/ui-components/Banner";
import { PiBook } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Toggle from "@/components/ui-components/toggle-with-label";
import { useUpdateRegistrationSettingsMutation } from "@/redux/query/admin-course-registration";
import { toast } from "sonner";
import { toDateInputValue } from "@/lib/utils";

const CourseDetailsPage = () => {
  const { handleReturnToList, selectedCourse: course } = useAdminCoursesStore();
  const [updateRegistrationTrigger, { isLoading: isUpdatingRegistration }] =
    useUpdateRegistrationSettingsMutation();

  const [regOpen, setRegOpen] = useState(course?.registrationOpen || false);
  const [isActive, setIsActive] = useState(course?.isActive || false);
  const [openDate, setOpenDate] = useState(
    toDateInputValue(course?.registrationOpenDate)
  );

  const [deadlineDate, setDeadlineDate] = useState(
    toDateInputValue(course?.registrationDeadline)
  );

  const navigate = useNavigate();

  console.log(course);

  const handleSaveChanges = async () => {
    const toastId = toast.loading("Updating Registration Settings...");

    try {
      await updateRegistrationTrigger({
        courseId: course?._id || "",
        settings: {
          registrationOpen: regOpen,
          registrationOpenDate: openDate
            ? new Date(openDate).toISOString()
            : null,
          registrationDeadline: deadlineDate
            ? new Date(deadlineDate).toISOString()
            : null,
          maxStudents: null,
        },
      }).unwrap();
      toast.success("Registration settings updated successfully!", {
        id: toastId,
      });
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update registration settings",
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="link"
          onClick={() => handleReturnToList("list")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Courses
        </Button>

        <Banner
          title={`${course?.title} - ${course?.code}`}
          desc="View and manage all course details in the university."
          actionButton={<PiBook className="text-primary" size={40} />}
          containterClass="mb-8"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              <h3 className="font-bold text-lg">Description</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-gray-600 text-sm leading-relaxed border border-gray-100">
              {course?.description ||
                "No description provided for this course. Add a description to help students understand the course objectives and requirements."}
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6 t">
              <BookOpen className="h-5 w-5" />
              <h3 className="font-bold text-lg">Key Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Lecturer
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    {course?.lecturer.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {course?.lecturer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {course?.lecturer.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Department
                </p>
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {course?.department.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {course?.department.faculty}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Academic Session
                </p>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-gray-400" />{" "}
                  {course?.session}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Semester
                </p>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" /> {course?.semester}{" "}
                  Semester
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Level
                </p>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-gray-400" /> {course?.level}{" "}
                  Level
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Credit Units
                </p>
                <p className="font-medium text-gray-900 flex items-center gap-2">
                  <Award className="h-4 w-4 text-gray-400" />{" "}
                  {course?.creditUnit} Units
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Course Type
                </p>
                <Badge variant="destructive">{course?.courseType}</Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-indigo-600">
                  {course?.students.length}
                </span>
                {course?.maxStudents && (
                  <span className="text-lg text-gray-500">
                    / {course?.maxStudents}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">Enrolled Students</p>
              {course?.maxStudents && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (course?.students.length / course?.maxStudents) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              )}
              <Button
                className="w-full mt-6"
                onClick={() => navigate(`/admin/results/course/${course?._id}`)}
              >
                View Enrolled Students & Results
              </Button>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-md border-indigo-100">
            <div className="flex items-center gap-2 mb-6 text-primary-4">
              <ShieldAlert className="h-5 w-5" />
              <h3 className="font-bold text-lg">Registration & Status</h3>
            </div>

            <div className="space-y-6">
              {/* Toggles */}
              <div className="space-y-4">
                <Toggle
                  label="Registration Open"
                  checked={regOpen}
                  onCheckedChange={() => setRegOpen(!regOpen)}
                />
                <Toggle
                  label="Active Status"
                  checked={isActive}
                  onCheckedChange={() => setIsActive(!isActive)}
                />
              </div>

              <hr className="border-gray-100" />

              {/* Date Pickers */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Open Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      value={openDate}
                      onChange={(e) => setOpenDate(e.target.value)}
                    />
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Deadline
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      value={deadlineDate}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                    />
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Button
                className="w-full text-white  shadow-md"
                onClick={handleSaveChanges}
              >
                {isUpdatingRegistration ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Card>

          {/* Quick Actions / Tips can go here */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-primary-2 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-primary-4">Admin Note</h4>
                <p className="text-xs text-primary-2 mt-1">
                  Closing registration will prevent any new students from
                  enrolling. Existing students remain unaffected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
