import { CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Star, Database } from "lucide-react";
import StatCard from "@/components/ui-components/StatCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  statistics?: { cgpa: number; totalCreditUnits: number };
  sessions: string[];
  semesters: string[];
  selectedSession: string;
  selectedSemester: string;
  setSelectedSession: (v: string) => void;
  setSelectedSemester: (v: string) => void;
  isDownloading: boolean;
  handleExportPDF: () => void;
}

const ResultsStats = ({
  statistics,
  sessions,
  semesters,
  selectedSession,
  selectedSemester,
  setSelectedSession,
  setSelectedSemester,
  isDownloading,
  handleExportPDF,
}: Props) => (
  <>
    <CardHeader>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <Button
          onClick={handleExportPDF}
          disabled={isDownloading}
          className="w-full shrink-0 md:w-auto flex md:ml-auto"
        >
          {isDownloading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download PDF
        </Button>
      </div>
    </CardHeader>

    <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <StatCard
        icon={Star}
        title="Cumulative GPA (CGPA)"
        value={statistics?.cgpa?.toFixed(2) ?? "0.00"}
      />
      <StatCard
        icon={Database}
        title="Total Credit Units Passed"
        value={statistics?.totalCreditUnits ?? 0}
      />
    </CardContent>

    <CardContent>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select value={selectedSession} onValueChange={setSelectedSession}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by session" />
          </SelectTrigger>
          <SelectContent>
            {sessions.map((session) => (
              <SelectItem key={session} value={session}>
                {session === "all" ? "All Sessions" : session}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedSemester} onValueChange={setSelectedSemester}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by semester" />
          </SelectTrigger>
          <SelectContent>
            {semesters.map((semester) => (
              <SelectItem key={semester} value={semester}>
                {semester === "all" ? "All Semesters" : semester}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </CardContent>
  </>
);

export default ResultsStats;
