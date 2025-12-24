import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ISemesterCourse } from "../type";

const CourseTable = ({ courses }: { courses: ISemesterCourse[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className=" gap-4 px-6 py-3 bg-gray-50/50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <TableHead className="pl-12">Code</TableHead>
          <TableHead>Course Title</TableHead>
          <TableHead>Lecturer</TableHead>
          <TableHead className="text-right pr-12">Credit Unit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-500 py-8 ">
              No courses registered for this semester.
            </TableCell>
          </TableRow>
        ) : (
          courses.map((course) => (
            <TableRow key={course.id} className="h-16 ">
              <TableCell className="pl-12">
                <Badge variant="outline">{course.code}</Badge>
              </TableCell>
              <TableCell className="font-medium ">
                <p className="text-sm font-semibold text-gray-900">
                  {course.title}
                </p>
                <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700">
                  Level {course.level}
                </span>
              </TableCell>
              <TableCell className="text-gray-600 flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 font-bold">
                  {course.lecturer.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-700">
                    {course.lecturer.name}
                  </span>
                  <p className="text-sm text-gray-700">
                    {course.lecturer.email}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium pr-12">
                {course.creditUnit}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default CourseTable;
