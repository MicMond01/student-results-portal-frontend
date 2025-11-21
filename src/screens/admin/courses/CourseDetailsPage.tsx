import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BarChart,
  Building,
  Calendar,
  Clock,
  Database,
  List,
  UserIcon,
  Users2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoItem from "@/components/ui-components/InfoItem";
import { Badge } from "@/components/ui/badge";
import { useAdminCoursesStore } from "@/stores/useAdminCoursesStore";
import Banner from "@/components/ui-components/Banner";
import { PiBook } from "react-icons/pi";

const CourseDetailsPage = () => {
  const { handleReturnToList, selectedCourse: course } = useAdminCoursesStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="outline"
          onClick={() => handleReturnToList("list")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Courses
        </Button>

        <Banner
          title="Course Details"
          desc=" View all course details in the university."
          actionButton={<PiBook className="text-primary" size={40} />}
          containterClass="mb-8"
        />

        <h1 className="text-3xl font-bold text-gray-900">{course?.title}</h1>
        <p className="text-lg text-indigo-600 font-medium">{course?.code}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {course?.description ||
                  "No description provided for this course."}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Key Details</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoItem
                icon={Building}
                label="Department"
                value={
                  <a href="#" className="text-indigo-600 hover:underline">
                    {course?.department.name}
                  </a>
                }
              />
              <InfoItem
                icon={UserIcon}
                label="Lecturer"
                value={
                  <a href="#" className="text-indigo-600 hover:underline">
                    {course?.lecturer.name}
                  </a>
                }
              />
              <InfoItem
                icon={Calendar}
                label="Session"
                value={course?.session}
              />
              <InfoItem
                icon={Clock}
                label="Semester"
                value={course?.semester}
              />
              <InfoItem
                icon={BarChart}
                label="Level"
                value={`${course?.level} Level`}
              />
              <InfoItem
                icon={Database}
                label="Credit Units"
                value={course?.creditUnit}
              />
              <InfoItem
                icon={List}
                label="Course Type"
                value={course?.courseType}
              />
              <InfoItem
                icon={Users2}
                label="Status"
                value={
                  <Badge
                    className={
                      course?.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {course?.isActive ? "Active" : "Inactive"}
                  </Badge>
                }
              />
            </CardContent>
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
              <Button className="w-full mt-6">View Enrolled Students</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
