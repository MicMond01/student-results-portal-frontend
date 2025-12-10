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

import type { LecturerResultsFiltersState } from "../../student-results/types";
import { Label } from "@/components/ui/label";

const LecturerResultsFilters: React.FC<{
  filters: LecturerResultsFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<LecturerResultsFiltersState>>;
  uniqueGrade: string[];
  uniqueCourse: string[];
}> = ({ filters, setFilters, uniqueGrade, uniqueCourse }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, query: e.target.value }));
  };

  const handleSelectChange =
    (name: keyof LecturerResultsFiltersState) => (value: string) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    };
  const resetFilters = () => {
    setFilters({ query: "", level: null, grade: "all", course: "all" });
  };

  return (
    <Card className="rounded-none">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <div className="">
            <Label htmlFor="level">Name / Matric No.</Label>
            <Input
              placeholder="Search by name or Matric No..."
              value={filters.query}
              onChange={handleInput}
              className="md:col-span-2 lg:col-span-1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select
              value={filters.course}
              onValueChange={handleSelectChange("course")}
            >
              <SelectTrigger id="course">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Course</SelectItem>
                {uniqueCourse.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select
              value={String(filters.level)}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  level: Number(value) as 100 | 200 | 300 | 400 | 500 | 600,
                }))
              }
            >
              <SelectTrigger id="level">
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100">100 Level</SelectItem>
                <SelectItem value="200">200 Level</SelectItem>
                <SelectItem value="300">300 Level</SelectItem>
                <SelectItem value="400">400 Level</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <Label htmlFor="grade">Grades</Label>
            <Select
              value={filters?.grade}
              onValueChange={handleSelectChange("grade")}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Grades" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {uniqueGrade.map((d) => (
                  <SelectItem key={d} value={d}>
                    Grade - {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="mt-6" variant="outline" onClick={resetFilters}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default LecturerResultsFilters;
