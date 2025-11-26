import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IAdminLecturer } from "../type";

interface SystemStatusCardProps {
  lecturer: IAdminLecturer;
}

const SystemStatusCard = ({ lecturer }: SystemStatusCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">System Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Account Status</p>
            <Badge>{lecturer.status}</Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Verification</p>
            <Badge variant="outline">
              {lecturer.isVerified ? "Verified" : "Not Verified"}
            </Badge>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">First Login</p>
            <p className="font-medium">{lecturer.isFirstLogin}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemStatusCard;
