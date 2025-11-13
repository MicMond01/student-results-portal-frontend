import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "lucide-react";
import type { ISemesterCourse } from "../type";

const CourseTable = ({ courses }: { courses: ISemesterCourse[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="h-16">
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
              <TableCell className="font-medium ">{course.title}</TableCell>
              <TableCell className="text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  {course.lecturer.name}
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
