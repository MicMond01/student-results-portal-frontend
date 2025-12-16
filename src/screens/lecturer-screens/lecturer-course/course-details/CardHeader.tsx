import { Card } from "@/components/ui/card";
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  FileText,
  Users,
} from "lucide-react";
import type { Stats } from "./types";

interface CardHeaderProps {
  stats: Stats;
}

const CardHeader = ({ stats }: CardHeaderProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
      <Card className="p-5 hover:shadow-md transition-shadow cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users className="h-6 w-6" />
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Total Students</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">
          {stats?.totalStudents}
        </h3>
      </Card>
      <Card className="p-5 hover:shadow-md transition-shadow cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <FileText className="h-6 w-6" />
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Results Uploaded</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">
          {stats?.totalResults}
        </h3>
      </Card>
      <Card className="p-5 hover:shadow-md transition-shadow cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <AlertCircle className="h-6 w-6" />
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Pending Results</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">
          {stats?.pendingResults}
        </h3>
      </Card>
      <Card className="p-5 hover:shadow-md transition-shadow cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Pass Rate</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">
          {stats?.passRate}%
        </h3>
      </Card>
      <Card className="p-5 hover:shadow-md transition-shadow cursor-default">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Activity className="h-6 w-6" />
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Average Score</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">
          {stats?.averageScore}
        </h3>
      </Card>
    </div>
  );
};

export default CardHeader;
