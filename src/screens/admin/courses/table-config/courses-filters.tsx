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

type CourseFilterState = {
  query: string;
  session: string;
  level: string;
  department: string;
};

const CoursesFilters: React.FC<{
  filters: CourseFilterState;
  setFilters: React.Dispatch<React.SetStateAction<CourseFilterState>>;
  sessions: string[];
  levels: (string | number)[];
}> = ({ filters, setFilters, sessions, levels }) => {
  const { data: departmentList } = useGetAllDepartmentsQuery();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, query: e.target.value }));
  };

  const handleSelectChange =
    (name: keyof CourseFilterState) => (value: string) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    };
  const resetFilters = () => {
    setFilters({ query: "", session: "all", level: "all", department: "all" });
  };

  const [searchParams] = useSearchParams();
  const searchedDept = searchParams.get("departmentId");

  useEffect(() => {
    if (searchedDept) {
      setFilters((prev) => ({ ...prev, department: searchedDept }));
    }
  }, [searchedDept]);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <Input
            placeholder="Search by name or code..."
            value={filters.query}
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
              {sessions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.level}
            onValueChange={handleSelectChange("level")}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {levels.map((l) => (
                <SelectItem key={l} value={String(l)}>
                  {l} Level
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
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default CoursesFilters;
