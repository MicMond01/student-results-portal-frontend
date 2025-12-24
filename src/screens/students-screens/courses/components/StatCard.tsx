import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeText,
  colorClass,
  iconBg,
}: any) => (
  <div
    className={cn(
      "bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between group hover:border-[#7c3aed]/50 transition-colors cursor-default"
    )}
  >
    <div className="flex justify-between items-start mb-2">
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={cn("p-2 rounded-lg transition-colors", iconBg)}>
        <Icon className={cn("h-5 w-5", colorClass)} />
      </div>
    </div>
    <div className="flex items-center text-xs">
      <span
        className={cn(
          "font-medium flex items-center",
          change.includes("+") ? "text-green-600" : "text-gray-500"
        )}
      >
        {change.includes("+") && <TrendingUp className="h-3 w-3 mr-1" />}
        {change}
      </span>
      <span className="text-gray-400 ml-2">{changeText}</span>
    </div>
  </div>
);

export default StatCard;
