import type { IHeader } from "@/components/table/types";
import { IoTrashBinOutline } from "react-icons/io5";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";
import type { AdminCourse } from "../type";
import { Button } from "@/components/ui/button";
import { Edit2, Eye } from "lucide-react";

export const coursesListTableHeaders = (
  onViewDetails: (courses: AdminCourse) => void,
  onEdit: (course: AdminCourse) => void,
  onDelete: (id: string) => void,
  isDeleting: boolean
): IHeader<AdminCourse>[] => [
  {
    title: "Course",
    key: "title",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.title}</div>
        <div className="text-xs text-muted-foreground">{row.code}</div>
      </div>
    ),
  },
  {
    title: "Department",
    key: "department",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.department.name}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.department.faculty}
        </div>
      </div>
    ),
  },
  {
    title: "Lecturer",
    key: "lecturer",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.lecturer.name}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.lecturer.email}
        </div>
      </div>
    ),
  },
  {
    title: "Level",
    key: "level",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.level} Level</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.semester} Semester
        </div>
      </div>
    ),
  },
  {
    title: "Unit",
    key: "creditUnit",
    thClass: "text-center",
    cell: (row) => (
      <div className="text-center font-medium">{row.creditUnit}</div>
    ),
  },
  {
    title: "Students",
    key: "students",
    thClass: "text-center",
    cell: (row) => (
      <div className="text-center font-medium">
        {row.students.length}/{" "}
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.maxStudents}
        </div>
      </div>
    ),
  },
  {
    title: "Status",
    key: "isActive",
    thClass: "text-center",
    cell: (row) => (
      <div className="text-center font-bold text-primary">
        {row.isActive ? "Active" : "In-active"}
      </div>
    ),
  },
  {
    title: "Action",
    key: "updatedAt",
    thClass: "text-center",

    cell: (row) => (
      <div className="flex justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onViewDetails(row)}
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(row)}
          title="Edit Course"
        >
          <Edit2 className="h-4 w-4 text-blue-600" />
        </Button>
        <div className=" text-red-500 cursor-pointer mt-2">
          <ConfirmationDialog
            title="Confirm Delete"
            description="Are you sure you want to delete this course? "
            action={() => onDelete(row._id)}
            triggerLabel={<IoTrashBinOutline />}
            type="delete"
            confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
          />
        </div>
      </div>
    ),
  },
];
