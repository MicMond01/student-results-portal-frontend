import Badge from "@/components/ui-components/Badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {  Search } from "lucide-react";
import { useMemo, useState } from "react";
import type {
  ILecturerCourseResult,
  ILecturerCourseStudent,
  Stats,
  StudentsWithoutResult,
} from "./types";
import { useNavigate } from "react-router-dom";

interface CourseStudentsProps {
  stats: Stats;
  students: ILecturerCourseStudent[];
  results: ILecturerCourseResult[];
  studentsWithoutResults: StudentsWithoutResult[];
}

const CourseStudents = ({
  stats,
  students,
  results,
  studentsWithoutResults,
}: CourseStudentsProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<
    "enrolled" | "results" | "pending"
  >("enrolled");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = useMemo(() => {
    return students?.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.matricNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  const filteredPending = useMemo(() => {
    return studentsWithoutResults?.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.matricNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [studentsWithoutResults, searchQuery]);

  return (
    <Card className="overflow-hidden border-gray-200 min-h-[500px]">
      {/* Tabs & Search Header */}
      <div className="p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="flex bg-gray-100/80 p-1 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("enrolled")}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                activeTab === "enrolled"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              Enrolled Students
            </button>

            <button
              onClick={() => setActiveTab("pending")}
              className={cn(
                "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                activeTab === "pending"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              Pending ({stats?.pendingResults})
            </button>
          </div>

          <div className=" flex gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search student..."
                className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              className="h-8 px-3 text-sm rounded-md"
              onClick={() => navigate(`/myStudents`)}
            >
              View Course Results
            </Button>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {/* ENROLLED STUDENTS TABLE */}
        {activeTab === "enrolled" && (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 w-10">#</th>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Matric No.</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3 text-center">Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                filteredStudents?.map((student, idx) => (
                  <tr
                    key={student._id}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    <td className="px-6 py-3.5 text-gray-400 text-xs">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src="AA"
                            alt={student.name}
                            className="h-8 w-8 rounded-full object-cover border border-gray-100"
                          />
                        </div>
                        <div className="font-medium text-gray-900">
                          {student.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-gray-600 text-xs">
                      {student.matricNo}
                    </td>
                    <td className="px-6 py-3.5 text-gray-600 text-xs">
                      {student.email}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <Badge
                        variant="default"
                        className="bg-gray-100 border-gray-200"
                      >
                        {student.level}L
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* PENDING RESULTS TABLE */}
        {activeTab === "pending" && (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 w-10">#</th>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Matric No.</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPending?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-500">
                    No pending results found.
                  </td>
                </tr>
              ) : (
                filteredPending?.map((student, idx) => (
                  <tr
                    key={student._id}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    <td className="px-6 py-3.5 text-gray-400 text-xs">
                      {idx + 1}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="font-medium text-gray-900">
                          {student.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-gray-600 text-xs">
                      {student.matricNo}
                    </td>
                    <td className="px-6 py-3.5 text-gray-600 text-xs">
                      {student.department.name}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Badge
                        variant="warning"
                        className="bg-amber-50 text-amber-700 border-amber-100"
                      >
                        Pending Upload
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center text-xs text-gray-500">
        <span>
          Showing data for{" "}
          {activeTab === "enrolled"
            ? students?.length
            : activeTab === "results"
            ? results?.length
            : studentsWithoutResults?.length}{" "}
          students
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-7 px-2 text-xs bg-white"
            disabled
          >
            Prev
          </Button>
          <Button variant="outline" className="h-7 px-2 text-xs bg-white">
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CourseStudents;
