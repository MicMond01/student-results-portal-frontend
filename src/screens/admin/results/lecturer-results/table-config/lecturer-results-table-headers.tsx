import type { IHeader } from "@/components/table/types";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/functions";
import Badge from "@/components/ui-components/Badge";
import type { Result } from "../../student-results/types";
import { Separator } from "@/components/ui/separator";

export const lecturersResultsTableHeaders = (
  getGradeColor: (
    grade: string
  ) => "success" | "neutral" | "danger" | "warning" | "default",
  handleEditResult: (data: Result) => void,
  handleNavigate: (route: string) => void
): IHeader<Result>[] => [
  {
    title: "Student",
    key: "student",
    cell: (row) => (
      <div className="flex gap-4">
        <Avatar className="  border-2 border-white shadow-md">
          <AvatarImage
            src={row.student.name || undefined}
            alt={row.student.name}
          />
          <AvatarFallback className="bg-indigo-50 text-indigo-700 text-lg">
            {getNameInitials(row.student.name)}
          </AvatarFallback>
        </Avatar>

        <div>
          <div className="font-medium">{row.student.name}</div>
          <div className="text-xs text-muted-foreground line-clamp-1">
            {row.student.matricNo}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Course",
    key: "course",
    cell: (row) => (
      <div>
        <div className=" font-medium">{row.course.code}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.course.title}
        </div>
      </div>
    ),
  },
  {
    title: "Level",
    key: "student",
    cell: (row) => <div className="font-medium">{row.course.level}</div>,
  },
  {
    title: "Session",
    key: "session",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.session}</div>
        <div className="">{row.semester} Semester</div>
      </div>
    ),
  },
  {
    title: "Scores",
    key: "ca",
    cell: (row) => (
      <div className="gap-2 flex">
        <div className="grid text-muted- text-center">
          <div className="">{row.ca}</div>
          <div className="">CA</div>
        </div>
        <Separator orientation="vertical" className="h-10" />

        <div className="grid text-muted- text-center">
          <div className="">{row.exam}</div>
          <div className="">Exam</div>
        </div>
      </div>
    ),
  },
  {
    title: "Total",
    key: "total",
    cell: (row) => <div className="font-medium">{row.total}</div>,
  },
  {
    title: "Total",
    key: "grade",
    thClass: "text-center",
    cell: (row) => (
      <Badge
        variant={getGradeColor(row.grade)}
        className="capitalize text-center"
      >
        {row.grade.charAt(0)}
      </Badge>
    ),
  },
  {
    title: "Action",
    key: "student",
    thClass: "text-center",

    cell: (row) => (
      <div className="flex justify-center gap-4">
        <Button
          onClick={() => handleEditResult(row)}
          className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-md transition-colors"
          title="Edit"
          size="icon"
        >
          <Edit className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleNavigate(`/admin/results/${row.student._id}`)}
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];
