import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const StatCard: React.FC<{ title: string, value: string | number, icon: any, trend?: string, color?: string }> = ({ title, value, icon: Icon, trend, color = "bg-indigo-600" }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">{value}</span>
            {trend && <span className="text-xs font-medium text-green-600">{trend}</span>}
          </div>
        </div>
        <div className={cn("rounded-full p-3 text-white shadow-md", color)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
