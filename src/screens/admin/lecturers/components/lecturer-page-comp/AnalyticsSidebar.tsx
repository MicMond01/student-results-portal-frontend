import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import GradeDistributionChart from "@/components/ui-components/GradeDistributionChart";
import SystemStatusCard from "./SystemStatusCard";
import ResetPassword from "../ResetPassword";
import type { IAdminLecturer, IAdminStatStats } from "../../type";

interface AnalyticsSidebarProps {
  stats: IAdminStatStats | undefined;
  lecturerData: IAdminLecturer | undefined;
  showReset: boolean;
  setShowReset: (show: boolean) => void;
  onResetSubmit: (data: string) => void;
  isUpdatingPassword: boolean;
}

const AnalyticsSidebar = ({
  stats,
  lecturerData,
  showReset,
  setShowReset,
  onResetSubmit,
  isUpdatingPassword,
}: AnalyticsSidebarProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-gray-500" />
            Overall Grade Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <GradeDistributionChart
            distribution={
              stats?.gradeDistribution || {
                A: 0,
                B: 0,
                C: 0,
                D: 0,
                E: 0,
                F: 0,
              }
            }
          />
        </CardContent>
      </Card>

      {!showReset && (
        <SystemStatusCard
          lecturerData={lecturerData}
          onResetClick={() => setShowReset(true)}
        />
      )}

      {showReset && (
        <ResetPassword
          onClose={() => setShowReset(false)}
          onSubmit={onResetSubmit}
          isLoading={isUpdatingPassword}
        />
      )}
    </div>
  );
};

export default AnalyticsSidebar;
