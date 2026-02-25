// DepartmentDetailsPage.tsx
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Building2,
  Edit2,
  GraduationCap,
  LayoutGrid,
  Mail,
  Phone,
  School,
  User,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetDepartmentQuery,
  useUpdateADepartmentMutation,
} from "@/redux/query/admin-departments";
import { useAdminDepartmentStore } from "@/stores/useAdminDepartmentsStore";
import { useParams, useNavigate } from "react-router-dom";
import ManageDepartmentDialog from "./ManageDepartmentDialog";
import type { DepartmentFormData } from "./index";
import { toast } from "sonner";

const DepartmentDetailsPage = () => {
  const { openManageDialog, closeManageDialog } = useAdminDepartmentStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: departmentData, isLoading } = useGetDepartmentQuery(id || "", {
    skip: !id,
  });

  const [updateDepartmentTrigger, { isLoading: isUpdating }] =
    useUpdateADepartmentMutation();

  const { department: dept, statistics: stats } = departmentData || {};

  const handleSave = async (data: DepartmentFormData) => {
    const toastId = toast.loading("Updating Department...");

    try {
      await updateDepartmentTrigger({ id: dept?._id || "", data }).unwrap();
      toast.success("Department successfully updated!", { id: toastId });
      closeManageDialog();
    } catch (error: any) {
      const message =
        error?.data?.msg || error?.data?.message || "An error occurred";
      toast.error(message, { id: toastId });
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading department details...</div>
      </div>
    );
  }

  // Show error state if no department found
  if (!dept) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="text-gray-500 mb-4">Department not found</div>
        <Button onClick={() => navigate("/admin/departments")}>
          Back to Departments
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 animate-in fade-in duration-500">
        {/* Navigation & Header */}
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/departments")}
            className="mb-4 pl-0 hover:bg-transparent hover:text-indigo-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Departments
          </Button>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <School className="text-primary" size={40} />
                {dept.name}
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                "View and manage department, HOD, and structure."
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => openManageDialog(dept)}
                className="shadow-sm justify-end"
              >
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Department
              </Button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {dept.description}
                </p>
              </CardContent>
            </Card>

            {/* HOD & Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4 text-indigo-600" /> Head of
                    Department
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="font-medium text-lg">{dept.hodName}</div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" /> {dept.hodEmail || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" /> {dept.phone || "N/A"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-indigo-600" /> Office
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="font-medium text-lg">
                    Administrative Office
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <LayoutGrid className="h-4 w-4" />{" "}
                    {dept.officeLocation || "Not assigned"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                    Status: {dept.isActive ? "Active" : "Inactive"}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column: Statistics */}
          <div className="space-y-6">
            {/* Top Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-indigo-50 border-indigo-100">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Users className="h-8 w-8 text-indigo-600 mb-2" />
                  <div className="text-2xl font-bold text-indigo-900">
                    {stats?.totalStudents || 0}
                  </div>
                  <div className="text-xs font-medium text-indigo-600">
                    Students
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-emerald-50 border-emerald-100">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <GraduationCap className="h-8 w-8 text-emerald-600 mb-2" />
                  <div className="text-2xl font-bold text-emerald-900">
                    {stats?.totalLecturers || 0}
                  </div>
                  <div className="text-xs font-medium text-emerald-600">
                    Lecturers
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-amber-50 border-amber-100">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <BookOpen className="h-8 w-8 text-amber-600 mb-2" />
                  <div className="text-2xl font-bold text-amber-900">
                    {stats?.totalCourses || 0}
                  </div>
                  <div className="text-xs font-medium text-amber-600">
                    Courses
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <BarChart3 className="h-8 w-8 text-gray-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {Object.keys(stats?.studentsByLevel || {}).length}
                  </div>
                  <div className="text-xs font-medium text-gray-600">
                    Active Levels
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Breakdown Lists */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Student Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(stats?.studentsByLevel || {}).map(
                  ([level, count]) => (
                    <div
                      key={level}
                      className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-md"
                    >
                      <span className="font-medium text-gray-700">
                        {level} Level
                      </span>
                      <Badge variant="secondary">{count} Students</Badge>
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Course Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(stats?.coursesByLevel || {}).map(
                  ([level, count]) => (
                    <div
                      key={level}
                      className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded-md"
                    >
                      <span className="font-medium text-gray-700">
                        {level} Level
                      </span>
                      <Badge variant="secondary">{count} Courses</Badge>
                    </div>
                  )
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog - Only for this page */}
      <ManageDepartmentDialog onSave={handleSave} isLoading={isUpdating} />
    </>
  );
};

export default DepartmentDetailsPage;
