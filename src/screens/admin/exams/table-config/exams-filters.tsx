import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import type { ExamsFilterState } from "../types";
import { useGetCoursesByDepartmentQuery } from "@/redux/query/admin-courses";
import type { ISession } from "../../sessions/type";

const ExamsFilters: React.FC<{
  filters: ExamsFilterState;
  setFilters: React.Dispatch<React.SetStateAction<ExamsFilterState>>;
  uniqueSession: ISession[];
}> = ({ filters, setFilters, uniqueSession }) => {
  const { data: departmentList } = useGetAllDepartmentsQuery();

  const { data: coursesByDepartment } = useGetCoursesByDepartmentQuery(
    filters.department
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, query: e.target.value }));
  };

  const handleSelectChange =
    (name: keyof ExamsFilterState) => (value: string) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    };
  const resetFilters = () => {
    setFilters({
      search: "",
      department: "all",
      course: "all",
      session: "all",
    });
  };

  const [searchParams] = useSearchParams();
  const searchedDept = searchParams.get("departmentId");

  useEffect(() => {
    if (searchedDept) {
      setFilters((prev) => ({ ...prev, department: searchedDept }));
    }
  }, [searchedDept]);

  return (
    <Card className="rounded-none">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <Input
            placeholder="Search by name or code..."
            value={filters.search}
            onChange={handleInput}
            className="md:col-span-2 lg:col-span-1"
          />

          <Select
            value={filters.session}
            onValueChange={handleSelectChange("session")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Sessions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sessions</SelectItem>
              {uniqueSession.map((s) => (
                <SelectItem key={s._id} value={s.session}>
                  {s.session}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.department}
            onValueChange={handleSelectChange("department")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departmentList?.departments.map((d) => (
                <SelectItem key={d._id} value={d._id}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.course}
            disabled={filters.department === "all"}
            onValueChange={handleSelectChange("course")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Course</SelectItem>
              {coursesByDepartment?.courses.map((l) => (
                <SelectItem key={l.code} value={l._id}>
                  {l.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default ExamsFilters;
