import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Download, RefreshCw, SearchIcon } from "lucide-react";

type SessionsFiltersProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sessionSatausoptions: { value: string; label: string }[];
};

const SessionsFilters = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  sessionSatausoptions,
}: SessionsFiltersProps) => {
  return (
    <div className="bg-white p-2 sm:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
        <div className="w-full sm:w-64">
          <InputGroup>
            <InputGroupInput
              placeholder="Search sessions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-slate-200"
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
        <div className="space-y-2">
          {/* <Label htmlFor="sessionStatus">Course</Label> */}
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
            }}
          >
            <SelectTrigger id="sessionStatus">
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              {sessionSatausoptions.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-auto">
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-500 hover:text-slate-900 gap-2"
        >
          <ArrowUpDown className="w-4 h-4" />{" "}
          <span className="hidden sm:inline">Sort</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-500 hover:text-slate-900 gap-2"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-500 hover:text-slate-900 gap-2"
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SessionsFilters;
