import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui-components/Badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface SystemStatusCardProps {
  lecturerData: any; // Adjust type
  onResetClick: () => void;
}

const SystemStatusCard: React.FC<SystemStatusCardProps> = ({
  lecturerData,
  onResetClick,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Account Status</span>
          <Badge variant="secondary" className="capitalize">
            {lecturerData?.accountStatus}
          </Badge>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">Verification</span>
          {lecturerData?.isVerified ? (
            <span className="text-green-600 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Verified
            </span>
          ) : (
            <span className="text-amber-600 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> Pending
            </span>
          )}
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-500">First Login</span>
          <span className="font-medium">
            {lecturerData?.isFirstLogin ? "Yes" : "No"}
          </span>
        </div>
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={onResetClick}
          >
            Reset Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatusCard;
