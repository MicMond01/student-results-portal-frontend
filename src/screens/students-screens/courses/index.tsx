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
import { BookOpen, Calendar } from "lucide-react";
import CourseTable from "./table/CourseTable";
import Banner from "@/components/ui-components/Banner";
import { useGetAvailableCoursesQuery } from "@/redux/query/student-course-registration";

const StudentCourses = () => {
  const { data: courseData } = useGetMyCoursesQuery();
  const { data } = useGetAvailableCoursesQuery();
  console.log(data);

  const { groupedCourses } = courseData || {};

  const defaultSession =
    (groupedCourses?.length || 0) > 0 ? [groupedCourses?.[0].session] : [];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-380 space-y-6">
        <Banner
          title=" My Registered Courses"
          desc=" A complete list of all courses you are registered for, grouped by academic session."
          actionButton={<BookOpen className="text-primary" size={40} />}
          containterClass="mb-8"
        />

        {/* Message if no courses at all */}
        {groupedCourses?.length === 0 && (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              You are not registered for any courses.
            </CardContent>
          </Card>
        )}

        {/* Accordion for each session */}
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
                  <TabsList className="grid w-full grid-cols-2 rounded-none border-b bg-gray-50 p-0">
                    <TabsTrigger
                      value="First"
                      className="rounded-none h-12 data-[state=active]:border-b-2 data-[state=active]:border-primary-4 data-[state=active]:bg-bg-2 data-[state=active]:shadow-none data-[state=active]:"
                    >
                      First Semester
                    </TabsTrigger>
                    <TabsTrigger
                      value="Second"
                      className="rounded-none h-12 data-[state=active]:border-b-2 data-[state=active]:border-primary-4 data-[state=active]:bg-bg-2 data-[state=active]:shadow-none data-[state=active]:"
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
      </div>
    </div>
  );
};

export default StudentCourses;
