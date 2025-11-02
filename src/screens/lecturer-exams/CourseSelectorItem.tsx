import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { IExamCourse } from "@/types/exams";
import { Check } from "lucide-react";

const CourseSelectorItem = ({
  course,
  isSelected,
  onSelect,
}: {
  course: IExamCourse;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={onSelect}
      className={cn(
        "w-full justify-start h-auto py-3 px-4 text-left",
        isSelected ? "bg-primary/10 text-primary" : "hover:bg-gray-100"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex-1 overflow-hidden">
          <p className="truncate text-sm font-semibold">{course.title}</p>
          <p className="text-xs text-gray-500">
            {course.code} &middot; {course.level} Level
          </p>
        </div>
        {isSelected && <Check className="ml-2 h-4 w-4 shrink-0" />}
      </div>
    </Button>
  );
};

export default CourseSelectorItem;
