import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface PaginationProps {
  total: number;
  pagePerRow: number;
  currentPageStart: number;
  onPageChange: (newStart: number, newEnd: number) => void;
}

const TablePagination: React.FC<PaginationProps> = ({
  total,
  pagePerRow,
  currentPageStart,
  onPageChange,
}) => {
  const currentPageIndex = Math.floor(currentPageStart / pagePerRow);
  const totalPages = Math.ceil(total / pagePerRow);

  const handleNext = () => {
    if (currentPageIndex + 1 < totalPages) {
      const newStart = (currentPageIndex + 1) * pagePerRow;
      onPageChange(newStart, Math.min(newStart + pagePerRow, total));
    }
  };

  const handlePrev = () => {
    if (currentPageIndex > 0) {
      const newStart = (currentPageIndex - 1) * pagePerRow;
      onPageChange(newStart, Math.min(newStart + pagePerRow, total));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-sm text-slate-500">
        Showing {total > 0 ? currentPageStart + 1 : 0} to{" "}
        {Math.min(currentPageStart + pagePerRow, total)} of {total} entries
      </span>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handlePrev}
          disabled={currentPageIndex === 0}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm font-medium text-slate-700 px-2">
          Page {currentPageIndex + 1} of {Math.max(1, totalPages)}
        </span>
        <Button
          size="sm"
          variant="outline"
          onClick={handleNext}
          disabled={currentPageIndex >= totalPages - 1}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
