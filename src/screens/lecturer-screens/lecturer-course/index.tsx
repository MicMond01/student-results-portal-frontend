import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCoursesAssignedToLecturerQuery } from "@/redux/query/lecturer";
import { Book, Search } from "lucide-react";
import { useMemo, useState } from "react";
import CourseCard from "./CourseCard";
import Banner from "@/components/ui-components/Banner";
import { ImBooks } from "react-icons/im";


const LecturerCourses = () => {
  // In a real app, this data would come from an API call
  const { data } = useGetCoursesAssignedToLecturerQuery();
  const courses = data?.courses || [];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const [selectedSession, setSelectedSession] = useState("all");

  // Get unique sessions for the filter dropdown
  const uniqueSessions = useMemo(() => {
    return ["all", ...new Set(courses.map((course) => course.session))];
  }, [courses]);

  // Filter logic
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      // Search filter (by title or code)
      const searchMatch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase());

      // Semester filter
      const semesterMatch =
        selectedSemester === "all" || course.semester === selectedSemester;

      // Session filter
      const sessionMatch =
        selectedSession === "all" || course.session === selectedSession;

      return searchMatch && semesterMatch && sessionMatch;
    });
  }, [courses, searchTerm, selectedSemester, selectedSession]);


  return (
    <div className="min-h-screen  p-4 lg:p-8">
      <div className="mx-auto max-w-380 space-y-6">
        <Banner
          title="Lecturer Course"
          desc="Review and manage all courses assigned to you. Oversee course information, associated exams, and related academic activities efficiently"
          actionButton={<ImBooks className="text-primary" size={40} />}
          containterClass="mb-8"
        />
        {/* Header and Filter Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-6 w-6" />
              My Courses
            </CardTitle>
            <CardDescription>
              Showing {filteredCourses.length} of {data?.totalCourses} assigned
              courses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filter Controls */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title or code..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Semester Filter */}
              <Select
                value={selectedSemester}
                onValueChange={setSelectedSemester}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  <SelectItem value="First">First Semester</SelectItem>
                  <SelectItem value="Second">Second Semester</SelectItem>
                </SelectContent>
              </Select>

              {/* Session Filter */}
              <Select
                value={selectedSession}
                onValueChange={setSelectedSession}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by session" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueSessions.map((session) => (
                    <SelectItem key={session} value={session}>
                      {session === "all" ? "All Sessions" : session}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              <p>No courses found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LecturerCourses;
