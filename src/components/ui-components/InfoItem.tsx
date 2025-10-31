import type { LucideIcon } from "lucide-react";

const InfoItem: React.FC<{
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}> = ({ icon: Icon, label, value }) => {
  return (
    <div className="flex items-start space-x-3">
      <Icon className="h-5 w-5 shrink-0 text-gray-500" />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-400">{label}</span>
        <span className="text-sm font-medium text-gray-900">{value}</span>
      </div>
    </div>
  );
};

export default InfoItem;
