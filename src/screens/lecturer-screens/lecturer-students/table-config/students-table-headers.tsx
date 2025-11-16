import type { IHeader } from "@/components/table/types";
import { Badge } from "@/components/ui/badge";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";
import type { IFilteredResult } from "../types";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";

// Grade color mapping
const getGradeColor = (grade: string) => {
  const colors: Record<string, string> = {
    A: "bg-green-100 text-green-800 hover:bg-green-100",
    B: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    C: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    D: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    E: "bg-red-100 text-red-800 hover:bg-red-100",
    F: "bg-red-200 text-red-900 hover:bg-red-200",
  };
  return colors[grade] || "bg-gray-100 text-gray-800";
};

export const studentResultsTableHeaders = (
  navigate: (row: string) => void,
  handleDelete: (id: string) => void,
  isDeleting: boolean
): IHeader<IFilteredResult>[] => [
  {
    title: "Student Name",
    key: "studentName",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.studentName}</div>
        <div className="text-xs text-muted-foreground">
          {row.studentIdentifier}
        </div>
      </div>
    ),
  },
  {
    title: "Course",
    key: "courseCode",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.courseCode}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.courseTitle}
        </div>
      </div>
    ),
  },
  {
    title: "Session",
    key: "session",
  },
  {
    title: "Semester",
    key: "semester",
    cell: (row) => (
      <Badge variant="outline" className="text-xs">
        {row.semester}
      </Badge>
    ),
  },
  {
    title: "Level",
    key: "level",
    cell: (row) => <span className="font-medium">{row.level}L</span>,
  },
  {
    title: "CA",
    key: "ca",
    thClass: "text-center",
    cell: (row) => <div className="text-center font-medium">{row.ca}</div>,
  },
  {
    title: "Exam",
    key: "exam",
    thClass: "text-center",
    cell: (row) => <div className="text-center font-medium">{row.exam}</div>,
  },
  {
    title: "Total",
    key: "total",
    thClass: "text-center",
    cell: (row) => (
      <div className="text-center font-bold text-primary">{row.total}</div>
    ),
  },
  {
    title: "Grade",
    key: "grade",
    thClass: "text-center",
    cell: (row) => (
      <div className="flex justify-center">
        <Badge className={getGradeColor(row.grade)}>{row.grade}</Badge>
      </div>
    ),
  },
  {
    title: "Action",
    key: "updatedAt",
    thClass: "text-center",

    cell: (row) => (
      <div className="flex justify-center gap-4">
        <div
          onClick={() => navigate(row._id)}
          className="rounded-full text-primary p-2 bg-primary-3 text-muted hover:bg-muted  cursor-pointer"
        >
          <MdOutlineRemoveRedEye />
        </div>
        <div className="rounded-full p-2 text-green-600 bg-green-100  text-muted hover:bg-muted cursor-pointer">
          <FaEdit />
        </div>
        <div className="rounded-full p-2 text-red-600 bg-red-100  text-muted hover:bg-muted cursor-pointer">
          <ConfirmationDialog
            title="Confirm Delete"
            description="Are you sure you want to delete this student result? "
            action={handleDelete.bind(null, row._id)}
            triggerLabel={<IoTrashBinOutline />}
            type="delete"
            confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
          />
        </div>
      </div>
    ),
  },
];
