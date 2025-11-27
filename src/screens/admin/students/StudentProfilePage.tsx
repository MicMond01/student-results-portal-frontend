import { Button } from "@/components/ui/button";
import { useAdminStudentsStore } from "@/stores/useAdminStudentsStore";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  Edit2,
  GraduationCap,
  Hash,
  Mail,
  MapPin,
  Phone,
  School,
  Shield,
  TrendingUp,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { IAdminStudent, StudentFormData } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/functions";
import Badge from "@/components/ui-components/Badge";
import InfoRow from "@/components/ui-components/InfoRow";
import ExpandListDialog from "./components/expand-list-dialog";
import {
  useDeleteStudentMutation,
  useGetStudentQuery,
  useUpdateStudentMutation,
} from "@/redux/query/admin-students";
import StudentDetailsSkeleton from "./components/student-details-skeleton";
import { toast } from "sonner";
import ManageStudentDialog from "./components/manage-student-dialog";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";

const StudentProfilePage = () => {
  const { id } = useParams();
  const { data: studentData, isLoading } = useGetStudentQuery(id);
  const { student, courses, results } = studentData || {};
  const [updateStudentTrigger, { isLoading: isUpdatingStudent }] =
    useUpdateStudentMutation();
  const [deleteStudentTrigger, { isLoading: isDeleting }] =
    useDeleteStudentMutation();

  const { handleEdit, setActiveListDialog, closeDialog } =
    useAdminStudentsStore();
  const navigate = useNavigate();

  const handleSaveStudent = async (data: StudentFormData) => {
    try {
      await updateStudentTrigger({ id: student?._id || "", data }).unwrap();
      toast.success("Student updated successfully");
      closeDialog();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update student");
    }
  };

  const handleDeleteStudent = async (id: string) => {
    const toastId = toast.loading("Deleting Student...");

    try {
      await deleteStudentTrigger(id).unwrap();

      toast.success("Student successfully Deleted!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to Delete Student", {
        id: toastId,
      });
    }
  };

  if (isLoading) return <StudentDetailsSkeleton />;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/students")}
          className="pl-0 hover:bg-transparent hover:text-indigo-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Student
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleEdit(student as IAdminStudent)}
          >
            <Edit2 className="mr-2 h-4 w-4" /> Edit Details
          </Button>
          <ConfirmationDialog
            title="Confirm Delete"
            triggerLabel="Delete Student"
            description="Are you sure you want to delete this Student? "
            action={() => handleDeleteStudent(student?._id || "")}
            type="delete"
            confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Profile Card & Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-none shadow-md">
            <div className="h-24 bg-indigo-600"></div>
            <div className="px-6 pb-6 -mt-12 text-center">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg mx-auto bg-white">
                <AvatarImage
                  src={student?.profilePhoto}
                  className="object-cover"
                />
                <AvatarFallback className="text-2xl">
                  {getNameInitials(student?.name || "")}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-3 text-xl font-bold text-gray-900">
                {student?.name}
              </h2>
              <p className="text-sm text-gray-500">{student?.matricNo}</p>

              <div className="mt-4 flex justify-center gap-2">
                <Badge variant="secondary">{student?.level} Level</Badge>
                <Badge
                  variant={
                    student?.status === "Active" ? "success" : "secondary"
                  }
                >
                  {student?.status}
                </Badge>
              </div>

              <div className="mt-6 pt-6 border-t text-left space-y-1">
                <InfoRow
                  label="Program"
                  value={student?.program}
                  icon={GraduationCap}
                />
                <InfoRow
                  label="Department"
                  value={student?.department?.name ?? "N/A"}
                  icon={School}
                />
                <InfoRow
                  label="Faculty"
                  value={student?.faculty}
                  icon={BookOpen}
                />
                <InfoRow
                  label="Session"
                  value={student?.session}
                  icon={Calendar}
                />
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-2">
              <InfoRow label="Email" value={student?.email} icon={Mail} />
              <InfoRow label="Phone" value={student?.phone} icon={Phone} />
              <InfoRow label="Address" value={student?.address} icon={MapPin} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">System Info</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-2">
              <InfoRow
                label="Account Status"
                value={
                  <Badge variant="outline" className="capitalize">
                    {student?.accountStatus}
                  </Badge>
                }
                icon={Shield}
              />
              <InfoRow
                label="Verified"
                value={
                  student?.isVerified ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Yes
                    </span>
                  ) : (
                    "No"
                  )
                }
                icon={BadgeCheck}
              />
              <InfoRow
                label="Portal ID"
                value={student?.identifier}
                icon={Hash}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Dashboard Widgets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-indigo-50 border-indigo-100">
              <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                <div className="mb-2 p-3 bg-white rounded-full shadow-sm">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.50</div>
                <div className="text-xs text-indigo-600 font-medium uppercase">
                  Current CGPA
                </div>
              </CardContent>
            </Card>
            <Card className="bg-emerald-50 border-emerald-100">
              <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
                <div className="mb-2 p-3 bg-white rounded-full shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">96%</div>
                <div className="text-xs text-emerald-600 font-medium uppercase">
                  Attendance
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registered Courses Widget */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Registered Courses</CardTitle>
              <Button
                variant="link"
                size="sm"
                onClick={() => setActiveListDialog("courses")}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {courses?.[100]?.First?.slice(0, 3).map((course, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {course.code.slice(0, 3)}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">
                          {course.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {course.code} • {course.creditUnit} Units
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  </div>
                )) ?? []}
                {courses?.[200]?.First?.slice(0, 3).map((course, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                        {course.code.slice(0, 3)}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">
                          {course.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {course.code} • {course.creditUnit} Units
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  </div>
                )) ?? []}
              </div>
            </CardContent>
          </Card>

          {/* Recent Results Widget */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Recent Results</CardTitle>
              <Button
                variant="link"
                size="sm"
                onClick={() => setActiveListDialog("results")}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {results?.First?.slice(0, 3).map((result, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-xs">
                        {result.grade}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">
                          {result?.course?.creditUnit ?? "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {result.session}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-gray-700">
                      {result.total}%
                    </div>
                  </div>
                )) ?? []}
              </div>
            </CardContent>
          </Card>

          {/* Academic Advisor Card */}
          <Card className="bg-linear-to-br from-gray-900 to-gray-800 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-300" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                    Academic Advisor
                  </p>
                  <p className="font-bold text-lg">
                    {student?.academicAdvisor}
                  </p>
                  <p className="text-xs text-gray-400">
                    Department of {student?.department?.name ?? "N/A"}
                  </p>
                </div>
                <Button variant="secondary" size="sm" className="ml-auto">
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* EXPANDED LIST DIALOGS */}
      {studentData && <ExpandListDialog studentData={studentData} />}

      <ManageStudentDialog
        onSave={handleSaveStudent}
        isLoading={isUpdatingStudent}
      />
    </div>
  );
};

export default StudentProfilePage;
