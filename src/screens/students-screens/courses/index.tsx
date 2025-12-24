import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetMyCoursesQuery } from "@/redux/query/student";
import {
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Library,
  TrendingUp,
} from "lucide-react";
import CourseTable from "./table/CourseTable";
import Banner from "@/components/ui-components/Banner";
import {
  useGetAvailableCoursesQuery,
  useGetMyRegisteredCoursesQuery,
  useRegisterForCourseMutation,
} from "@/redux/query/student-course-registration";
import StatCard from "./components/StatCard";
import { getDaysRemaining } from "@/lib/functions";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";

const StudentCourses = () => {
  const { data: courseData } = useGetMyCoursesQuery();
  const { data: unregisterdCourses } = useGetAvailableCoursesQuery();
  const { data: registeredCourses } = useGetMyRegisteredCoursesQuery();
  const [registerCourseTrigger, {isLoading: isRegistering}] = useRegisterForCourseMutation()

  const [activeTab, setActiveTab] = useState<"all" | "open" | "registered">(
    "all"
  );

  console.log("Avilable courses with registration open", unregisterdCourses);

  console.log("courseData", courseData);
  console.log("registeredCourses", registeredCourses);

  const { groupedCourses } = courseData || {};

  const defaultSession =
    (groupedCourses?.length || 0) > 0 ? [groupedCourses?.[0].session] : [];

  const totalCourses = courseData?.totalCourses || 0;
  const openCoursesCount = unregisterdCourses?.count || 0;
  const registeredCount = registeredCourses?.count || 0;
  const totalUnits = registeredCourses?.courses.reduce(
    (acc, curr) => acc + curr.creditUnit,
    0
  );

  const handleRegister = async () => {
    const toastId = ""
  }


  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-380 space-y-6">
        <Banner
          title=" Course Management"
          desc="Manage your academic sessions, registrations, and course details."
          actionButton={<BookOpen className="text-primary" size={40} />}
          containterClass="mb-8"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Courses"
            value={totalCourses}
            icon={Library}
            change={`+${totalCourses - registeredCount}`}
            changeText="since last Session"
            colorClass="text-[#7c3aed]"
            iconBg="bg-[#f5f3ff] group-hover:bg-[#7c3aed] group-hover:text-white"
          />
          <StatCard
            title="Open Courses"
            value={openCoursesCount}
            icon={Clock}
            change={
              unregisterdCourses?.courses[0]?.registrationDeadline
                ? `Registration ends in ${getDaysRemaining(
                    unregisterdCourses.courses[0].registrationDeadline
                  )} days`
                : "No registration deadline"
            }
            changeText=""
            colorClass="text-green-600"
            iconBg="bg-green-50 group-hover:bg-green-600 group-hover:text-white"
          />
          <StatCard
            title="Registered"
            value={registeredCount}
            icon={CheckCircle2}
            change="1 Pending"
            changeText="approval"
            colorClass="text-blue-600"
            iconBg="bg-blue-50 group-hover:bg-blue-600 group-hover:text-white"
          />
          <StatCard
            title="Total Units"
            value={totalUnits}
            icon={TrendingUp}
            change="Cumulative units earned"
            changeText=""
            colorClass="text-orange-600"
            iconBg="bg-orange-50 group-hover:bg-orange-600 group-hover:text-white"
          />
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {[
                { id: "all", label: "All Courses", icon: Library },
                {
                  id: "open",
                  label: "Open for Registration",
                  icon: Clock,
                  count: openCoursesCount,
                },
                {
                  id: "registered",
                  label: "Registered Courses",
                  icon: CheckCircle2,
                },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center transition-colors cursor-pointer",
                    activeTab === tab.id
                      ? "border-[#7c3aed] text-[#7c3aed]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  )}
                >
                  <tab.icon className="text-lg mr-2 h-5 w-5" />
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="ml-2 bg-green-100 text-green-600 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* 1. ALL COURSES TAB */}
          {activeTab === "all" && groupedCourses?.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                You are not registered for any courses.
              </CardContent>
            </Card>
          )}
          {activeTab === "all" && (
            <Accordion
              type="single"
              collapsible
              defaultValue={defaultSession[0]}
              className="space-y-4"
            >
              {groupedCourses?.map((group) => (
                <AccordionItem
                  value={group.session}
                  key={group.session}
                  className="rounded-lg bg-white shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium hover:no-underline">
                    <div className="flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:pr-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-indigo-500" />
                        {group.session} Session
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary">
                          {group.totalCourses} Courses
                        </Badge>
                        <Badge variant="secondary">
                          {group.totalCreditUnits} Units
                        </Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-0 border-t">
                    {/* Tabs for First & Second Semester */}
                    <Tabs defaultValue="First" className="w-full">
                      <TabsList className="grid w-full h-12 grid-cols-2 rounded-none border-b border-gray-200 bg-gray-50 p-0">
                        <TabsTrigger
                          value="First"
                          className="rounded-none  data-[state=active]:border-primary-4 data-[state=active]:bg-bg-2 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:"
                        >
                          First Semester
                        </TabsTrigger>
                        <TabsTrigger
                          value="Second"
                          className="rounded-none  data-[state=active]:border-primary-4 data-[state=active]:bg-bg-2 data-[state=active]:text-primary data-[state=active]:shadow-none data-[state=active]:"
                        >
                          Second Semester
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="First" className="mt-0">
                        <CourseTable courses={group.semesters.First || []} />
                      </TabsContent>
                      <TabsContent value="Second" className="mt-0">
                        <CourseTable courses={group.semesters.Second || []} />
                      </TabsContent>
                    </Tabs>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}

          {/* 2. OPEN FOR REGISTRATION TAB */}

          {activeTab === "open" && unregisterdCourses?.courses.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                You are not unregistered course.
              </CardContent>
            </Card>
          )}

          {activeTab === "open" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-900">
                  Available Courses
                </h3>
                <p className="text-sm text-gray-500">
                  Select courses below to add them to your schedule for this
                  semester.
                </p>
              </div>
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-2">Code</div>
                <div className="col-span-4">Course Info</div>
                <div className="col-span-3">Lecturer</div>
                <div className="col-span-1 text-center">Unit</div>
                <div className="col-span-2 text-right">Action</div>
              </div>
              <div className="divide-y divide-gray-100">
                {unregisterdCourses?.courses.map((course) => (
                  <div
                    key={course._id}
                    className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-2">
                      <span className="px-2.5 py-1 rounded-md bg-green-50 border border-green-200 text-xs font-mono font-medium text-green-700">
                        {course.code}
                      </span>
                    </div>
                    <div className="col-span-4">
                      <p className="text-sm font-semibold text-gray-900">
                        {course.title}
                      </p>
                      <span className="inline-block mt-1 text-[10px] text-gray-400 uppercase tracking-wide">
                        Level {course.level}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm text-gray-700">
                        {course.lecturer.name}
                      </p>
                    </div>
                    <div className="col-span-1 text-center font-semibold text-gray-900">
                      {course.creditUnit}
                    </div>
                    <div className="col-span-2 text-right">
                      <ConfirmationDialog
                        title="Register"
                        description="Are you sure you want to register for this course? "
                        action={handleRegister}
                        type="save"
                        triggerLabel="Register"
                        confirmLabel={
                          isRegistering ? "Registering..." : "Yes, Register"
                        }
                      />
                      <button className="px-4 py-2 bg-[#7c3aed] hover:bg-violet-700 text-white text-xs font-medium rounded-md shadow-sm transition-colors">
                        Register
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. REGISTERED COURSES TAB */}
          {activeTab === "registered" && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-2">Code</div>
                <div className="col-span-3">Course</div>
                <div className="col-span-2">Lecturer</div>
                <div className="col-span-2">Period</div>
                <div className="col-span-3 text-right">Status</div>
              </div>
              <div className="divide-y divide-gray-100">
                {registeredCourses?.courses.length === 0 && (
                  <Card>
                    <CardContent className="p-6 text-center text-gray-500">
                      You are not registered for any courses.
                    </CardContent>
                  </Card>
                )}

                {registeredCourses?.courses.map((course) => (
                  <div
                    key={course._id}
                    className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors"
                  >
                    <div className="col-span-2">
                      <span className="px-2.5 py-1 rounded-md bg-white border border-gray-200 text-xs font-mono font-medium text-gray-700">
                        {course.code}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm font-semibold text-gray-900">
                        {course.title}
                      </p>
                      <span className="text-[10px] text-gray-500">
                        {course.creditUnit} Units
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600">
                        {course.lecturer.name}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                        {course.semester} Semester / Lvl {course.level}
                      </span>
                    </div>
                    <div className="col-span-3 text-right flex flex-col items-end gap-1">
                      {course.isRegistered ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>{" "}
                          Registered
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-1.5"></span>{" "}
                          Pending Approval
                        </span>
                      )}
                      <span className="text-[10px] text-gray-400">
                        Reg Open: {course.isRegistrationOpen ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;
