import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";
import { MdOutlineLockReset } from "react-icons/md";
import type { IFilterState } from "../types";
import { SearchInput } from "@/components/ui-components/SearchInput";

interface IStudentsFilters {
  filters: IFilterState;
  setFilters: Dispatch<SetStateAction<IFilterState>>;
  sessions: string[];
  courses: { code: string; title: string }[];
}

const StudentsFilters = (props: IStudentsFilters) => {
  const { filters, setFilters, sessions, courses } = props;

  return (
    <div className="shadow-sm bg-[#dcd2e7] px-5 py-5 rounded-lg mb-5">
      <div className="text-sm my-2 font-semibold">
        <span>Filter Student Results</span>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-5 gap-5 relative items-center">
        {/* Search by Student Name/Matric */}
        <SearchInput
          type="text"
          placeholder="Search student name or matric..."
          value={filters.studentName}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, studentName: e.target.value }))
          }
        />

        {/* Filter by Session (Year) */}
        <Select
          value={filters.session}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, session: value }));
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Sessions" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectItem value="">All Sessions</SelectItem> */}
              {sessions.map((session) => (
                <SelectItem key={session} value={session}>
                  {session}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Filter by Course */}
        <Select
          value={filters.courseCode}
          onValueChange={(value) => {
            setFilters((prev) => ({ ...prev, courseCode: value }));
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Courses" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectItem value="">All Courses</SelectItem> */}
              {courses.map((course) => (
                <SelectItem key={course.code} value={course.code}>
                  {course.code} - {course.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button
          onClick={() =>
            setFilters({ studentName: "", session: "", courseCode: "" })
          }
          className="max-w-[120px]"
          size="sm"
          variant="outline"
          type="button"
        >
          <MdOutlineLockReset className="size-4 mr-2" /> Reset
        </Button>

        {/* Active Filters Display */}
        {(filters.session || filters.courseCode || filters.studentName) && (
          <div className="col-span-full flex gap-2 flex-wrap">
            {filters.session && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                Session: {filters.session}
              </span>
            )}
            {filters.courseCode && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                Course: {filters.courseCode}
              </span>
            )}
            {filters.studentName && (
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs">
                Search: {filters.studentName}
              </span>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentsFilters;
