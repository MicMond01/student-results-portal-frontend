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

type LecturerFilterState = {
  query: string;
  department: string;
};

const LecturersFilters: React.FC<{
  filters: LecturerFilterState;
  setFilters: React.Dispatch<React.SetStateAction<LecturerFilterState>>;
}> = ({ filters, setFilters }) => {
  const { data: departmentList } = useGetAllDepartmentsQuery();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, query: e.target.value }));
  };

  const handleSelectChange =
    (name: keyof LecturerFilterState) => (value: string) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    };
  const resetFilters = () => {
    setFilters({ query: "", department: "all" });
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
            value={filters.query}
            onChange={handleInput}
            className="md:col-span-2 lg:col-span-1"
          />

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
export default LecturersFilters;
