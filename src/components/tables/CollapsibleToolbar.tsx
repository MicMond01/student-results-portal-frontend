import { Download, Search, Trash, Upload } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ToolbarProps {
  checkedItems: string[];
  onDeleteCheck?: (items: string[]) => void;
  total: number;
  pagePerRow: number;
  setNumPage: (num: number) => void;
  onDownloadClick?: () => void;
  onDownloadPdf?: () => void;

  searchQuery?: string;
  onSearchChange?: (val: string) => void;

  departmentFilter?: string;
  onDepartmentFilterChange?: (val: string) => void;
  departments?: string[];

  levelFilter?: string;
  onLevelFilterChange?: (val: string) => void;
  levels?: string[];

  sessionFilter?: string;
  onSessionFilterChange?: (val: string) => void;
  sessions?: string[];
}

const TableToolbar: React.FC<ToolbarProps> = ({
  checkedItems,
  onDeleteCheck,
  total,
  pagePerRow,
  setNumPage,
  onDownloadClick,
  onDownloadPdf,
  searchQuery,
  onSearchChange,
  departmentFilter,
  onDepartmentFilterChange,
  departments = [],
  levelFilter,
  onLevelFilterChange,
  levels = [],
  sessionFilter,
  onSessionFilterChange,
  sessions = [],
}) => {
  const hasSelection = checkedItems.length > 0;

  return (
    <div className="p-4 bg-white border-b border-slate-200 space-y-4">
      {/* Filters Row */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search Name or Matric No..."
            // icon={<Search className="w-4 h-4" />}
            value={searchQuery || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          {onDepartmentFilterChange && (
            <div className="space-y-2 w-full sm:w-48">
              <Label htmlFor="departmentFilter">All Departments</Label>
              <Select
                value={departmentFilter}
                onValueChange={onDepartmentFilterChange}
              >
                <SelectTrigger id="departmentFilter">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {onLevelFilterChange && (
            <div className="space-y-2 w-full sm:w-32">
              <Label htmlFor="levelFilter">All Levels</Label>
              <Select value={levelFilter} onValueChange={onLevelFilterChange}>
                <SelectTrigger id="levelFilter">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {onSessionFilterChange && (
            <div className="space-y-2 w-full sm:w-40">
              <Label htmlFor="sessionFilter">All Sessions</Label>
              <Select
                value={sessionFilter}
                onValueChange={onSessionFilterChange}
              >
                <SelectTrigger id="sessionFilter">
                  <SelectValue placeholder="All Sessions" />
                </SelectTrigger>
                <SelectContent>
                  {sessions.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-100">
        <p className="text-sm text-slate-500 font-medium">
          {total} Records Found
        </p>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 justify-end">
          {hasSelection && onDeleteCheck && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDeleteCheck(checkedItems)}
              className="gap-2 animate-in fade-in zoom-in duration-200"
            >
              <Trash className="w-4 h-4" />
              Delete ({checkedItems.length})
            </Button>
          )}

          <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          {onDownloadClick && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onDownloadClick}
              title="Download CSV"
              className="text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100"
            >
              <Upload className="w-4 h-4 rotate-180 mr-2" /> CSV
            </Button>
          )}
          {onDownloadPdf && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onDownloadPdf}
              title="Download PDF"
              className="text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100"
            >
              <Download className="w-4 h-4 mr-2" /> PDF
            </Button>
          )}

          <div className="space-y-2 w-24 ml-2">
            <Label htmlFor="rowsPerPage">Rows per page</Label>
            <Select
              value={String(pagePerRow)}
              onValueChange={(value) => setNumPage(Number(value))}
            >
              <SelectTrigger id="rowsPerPage">
                <SelectValue placeholder="Select rows" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 / page</SelectItem>
                <SelectItem value="10">10 / page</SelectItem>
                <SelectItem value="20">20 / page</SelectItem>
                <SelectItem value="50">50 / page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableToolbar;
