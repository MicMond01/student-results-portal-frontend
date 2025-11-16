import { Icon, type LucideIcon } from "lucide-react";

interface CourseInfoProps {
  icon: LucideIcon;
  label: string | number;
}
const CourseInfoItem = ({ icon: Icon, label }: CourseInfoProps) => {
  return (
    <div className="flex items-center text-sm text-gray-600">
      <Icon className="mr-1.5 h-4 w-4 shrink-0" />
      <span>{label}</span>
    </div>
  );
};

export default CourseInfoItem;
