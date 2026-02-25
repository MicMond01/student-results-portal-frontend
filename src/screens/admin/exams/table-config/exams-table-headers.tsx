import type { IHeader } from "@/components/table/types";
import { Button } from "@/components/ui/button";
import {
  Download,
  Eye,
  FileText,
  Pencil,
  Trash,
  MoreHorizontal,
} from "lucide-react";
import type { IExam } from "../types";
import { formatDuration } from "@/lib/functions";
import Badge from "@/components/ui-components/Badge";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const examsTableHeaders = (
  handlePreview: (exam: IExam) => void,
  handleDownloadPDF: (exam: IExam) => void,
  handleDeleteExam: (id: string) => void,
  handleEditQuestionsTrigger: (exam: IExam) => void,
): IHeader<IExam>[] => [
  {
    title: "Exam Title",
    key: "title",
    cell: (row) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
          <FileText className="h-5 w-5" />
        </div>
        <div>
          <div className="font-medium text-gray-900">{row.title}</div>
          <div className="text-xs text-gray-500">
            Created by {row.createdBy?.name || "Admin"}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Course Info",
    key: "course",
    cell: (row) => (
      <div>
        <div className="font-medium text-gray-900">{row.course?.code}</div>
        <div className="text-xs text-gray-500">{row.course?.title}</div>
      </div>
    ),
  },
  {
    title: "Duration",
    key: "duration",
    cell: (row) => (
      <div>
        <div className="font-medium"> {formatDuration(row.duration)}</div>
      </div>
    ),
  },
  {
    title: "Type",
    key: "examType",
    cell: (row) => (
      <div>
        <Badge
          variant="default"
          className="capitalize bg-gray-100 text-gray-700 border-gray-200"
        >
          {row.examType}
        </Badge>
      </div>
    ),
  },
  {
    title: "Status",
    key: "isActive",
    cell: (row) => (
      <Badge variant={row.isActive ? "success" : "default"} className="px-2">
        {row.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
  {
    title: "Action",
    key: "updatedAt",
    thClass: "text-center",
    cell: (row) => (
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-300 data-[state=open]:bg-primary-2 data-[state=open]:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-white border-0 shadow-2xl"
          >
            <DropdownMenuLabel>Action Center</DropdownMenuLabel>
            <DropdownMenuSeparator className=" bg-gray-300" />
            <DropdownMenuItem
              onClick={() => handleEditQuestionsTrigger(row)}
              className="cursor-pointer hover:bg-gray-300"
            >
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handlePreview(row)}
              className="cursor-pointer hover:bg-gray-300"
            >
              <Eye className="mr-2 h-4 w-4" />
              <span>Preview</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDownloadPDF(row)}
              className="cursor-pointer hover:bg-gray-300"
            >
              <Download className="mr-2 h-4 w-4" />
              <span>Download PDF</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className=" bg-gray-200" />
            {/* <DropdownMenuItem className="cursor-pointer hover:bg-red-300/20 text-red-600 focus:text-red-600 focus:bg-red-50"></DropdownMenuItem> */}
            <div className="flex items-center gap-5 my-2 p-1 rounded-md cursor-pointer hover:bg-red-300/20 text-red-600 focus:text-red-600 focus:bg-red-50">
              <ConfirmationDialog
                title="Delete this Exam"
                description="Are you sure you want to delete this exam? This action cannot be undone."
                action={() => handleDeleteExam(row._id)}
                type="delete"
                triggerLabel={<Trash className="w-4 h-4 pl-1 text-red-600" />}
              />
              <span>Delete</span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
