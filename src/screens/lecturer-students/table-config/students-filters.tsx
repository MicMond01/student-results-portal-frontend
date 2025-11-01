import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Dispatch, type SetStateAction } from "react";
import { MdOutlineLockReset } from "react-icons/md";
import type { IFilterState } from "../types";
import { SearchInput } from "@/components/ui-components/SearchInput";
import {
  useGetCoursesAssignedToLecturerQuery,
  useUploadResultForStudentMutation,
} from "@/redux/query/lecturer";
import { toast } from "sonner";
import {
  CreateResultDialog,
  type ResultFormData,
} from "@/components/ui-components/CreateResultDialog";

interface IStudentsFilters {
  filters: IFilterState;
  setFilters: Dispatch<SetStateAction<IFilterState>>;
  sessions: string[];
  courses: { code: string; title: string }[];
}

const StudentsFilters = (props: IStudentsFilters) => {
  const { filters, setFilters, sessions, courses } = props;
  const { data: coursesData } = useGetCoursesAssignedToLecturerQuery();

  const [uploadResult, { isLoading }] = useUploadResultForStudentMutation();

  const currentCourse =
    coursesData?.courses?.find((course) => course.code === filters.courseCode)
      ?._id || "";

  const handleCreateResult = async (data: ResultFormData) => {
    const toastId = toast.loading("Creating result...");

    try {
      await uploadResult(data).unwrap();
      console.log(data);
      toast.success("Result created successfully!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.msg || "Failed to create result", {
        id: toastId,
      });
      console.log(error.data.msg);
      throw error;
    }
  };

  return (
    <div className="shadow-sm bg-background px-5 py-5 rounded-lg mb-5">
      <div className="text-sm my-2 font-semibold">
        <span>Filter Student Results</span>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-5 gap-5 relative items-center">
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
          <SelectContent className="bg-background border-border cursor-pointer">
            <SelectGroup>
              {/* <SelectItem value="as">All Sessions</SelectItem> */}
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
          <SelectContent className="bg-background border-border">
            <SelectGroup>
              {/* <SelectItem value="">All Courses</SelectItem> */}
              {courses.map((course) => (
                <SelectItem
                  className="cursor-pointer"
                  key={course.code}
                  value={course.code}
                >
                  {course.code} - {course.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button
          onClick={() =>
            setFilters({ studentName: "", session: "", courseCode: "DSD022" })
          }
          className="max-w-[120px]"
          size="sm"
          variant="outline"
          type="button"
        >
          <MdOutlineLockReset className="size-4 mr-2" /> Reset
        </Button>

        <div className="">
          <CreateResultDialog
            courses={coursesData?.courses || []}
            onSubmit={handleCreateResult}
            isLoading={isLoading}
            triggerLabel="Add Result"
            defaultSession={filters.session}
            defaultCourse={currentCourse}
          />
        </div>

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
