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
import { Label } from "@/components/ui/label";
import type { CourseResultsFiltersState } from "../types";
import { ChevronDown, Search } from "lucide-react";



const CourseResultsFilters: React.FC<{
  filters: CourseResultsFiltersState;
  setFilters: React.Dispatch<React.SetStateAction<CourseResultsFiltersState>>;
  uniqueGrade: string[];
}> = ({ filters, setFilters, uniqueGrade }) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, query: e.target.value }));
  };

  const resetFilters = () => {
    setFilters({ query: "", level: null, grade: "all" });
  };

  return (
    <Card className="rounded-lg mb-6 shadow-sm border-gray-200">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row gap-4 items-end">
          {/* Search */}
          <div className="flex-1 w-full space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Name / Matric No.
            </label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by name or Matric No..."
                value={filters.query}
                onChange={handleInput}
                className="pl-9"
              />
            </div>
          </div>

          {/* Level Select */}
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

          {/* Grade Select */}
          <div className="w-full md:w-48 space-y-2">
            <label className="text-sm font-medium leading-none">Grade</label>
            <div className="relative">
              <select
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                value={filters.grade}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, grade: e.target.value }))
                }
              >
                <option value="all">All Grades</option>
                {uniqueGrade.map((g) => (
                  <option key={g} value={g}>
                    Grade - {g}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50" />
            </div>
          </div>

          <Button
            variant="outline"
            onClick={resetFilters}
            className="w-full md:w-auto"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseResultsFilters;
