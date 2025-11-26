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
import type { StudentFilterState } from "../types";
import { Search } from "lucide-react";

const StudentsFilters: React.FC<{
  filters: StudentFilterState;
  setFilters: React.Dispatch<React.SetStateAction<StudentFilterState>>;
  uniqueLevels: number[];
}> = ({ filters, setFilters, uniqueLevels }) => {
  const { data: departmentList } = useGetAllDepartmentsQuery();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, query: e.target.value }));
  };

  
  const handleSelectChange =
    (name: keyof StudentFilterState) => (value: string) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    };
  const resetFilters = () => {
    setFilters({ query: "", department: "all", level: "all", status: "all" });
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search name, matric no..."
                value={filters.query}
                onChange={handleInput}
                className="pl-10"
              />
            </div>

            <Select
              value={filters.department}
              onValueChange={handleSelectChange("department")}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departmentList?.departments?.map((s) => (
                  <SelectItem key={s._id} value={s._id}>
                    {s.name}
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
                {uniqueLevels.map((s) => (
                  <SelectItem key={s} value={s.toString()}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default StudentsFilters;
