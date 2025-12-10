import type { TableColumn } from "@/components/tables/types";
import type { GroupedStudentData } from "../types";
import { Eye } from "lucide-react";
import Badge from "@/components/ui-components/Badge";

export const resultsTableHeaders = (
  navigateToProfile: (studentId: string) => void
): TableColumn<GroupedStudentData>[] => [
  {
    key: "name",
    title: "Student Name",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-200">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.student.matricNo}`}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <div className="font-medium text-slate-900 group-hover:text-primary transition-colors">
            {row.student.name}
          </div>
          <div className="text-xs text-slate-500">{row.student.matricNo}</div>
        </div>
      </div>
    ),
  },
  {
    key: "id",
    title: "ID No.",
    cell: (row) => (
      <span className="font-mono text-slate-600">{row.student.matricNo}</span>
    ), // Mock fixed ID
  },
  {
    key: "department",
    title: "Department",
    cell: (row) => (
      <div>
        <div className="font-medium text-slate-700">
          {row.student.department.name || "N/A"}
        </div>
      </div>
    ),
  },
  {
    key: "level",
    title: "Level",
    cell: (row) => <span>{row.student.level}</span>,
  },
  {
    key: "contact",
    title: "Contact",
    cell: (row) => (
      <div>
        <div className="font-medium text-slate-700">{row.student.phone}</div>
        <div className="text-xs text-slate-400 lowercase">
          {row.student.email}
        </div>
      </div>
    ),
  },
  {
    key: "status",
    title: "Status",
    cell: (row) => <Badge variant="success">Active</Badge>,
  },
  {
    key: "actions",
    title: "Actions",
    className: "text-right",
    cell: (row) => (
      <div
        className="flex justify-end items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => navigateToProfile(row.student._id)}
          className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-primary-600 transition-colors"
          title="View Profile"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>
    ),
  },
];
