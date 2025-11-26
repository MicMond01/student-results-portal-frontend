import type { IHeader } from "@/components/table/types";
import { IoTrashBinOutline } from "react-icons/io5";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";
import { Button } from "@/components/ui/button";
import { Edit2, Eye } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/functions";
import Badge from "@/components/ui-components/Badge";
import type { IAdminStudent } from "../types";

export const studentsListTableHeaders = (
  onViewDetails: (student: IAdminStudent) => void,
  onEdit: (student: IAdminStudent) => void,
  handleDeleteStudent: (id: string) => void,
  isDeleting: boolean
): IHeader<IAdminStudent>[] => [
  {
    title: "Image",
    key: "profilePhoto",
    cell: (row) => (
      <Avatar className="  border-2 border-white shadow-md">
        <AvatarImage src={row.profilePhoto || undefined} alt={row.name} />
        <AvatarFallback className="bg-indigo-50 text-indigo-700 text-lg">
          {getNameInitials(row.name)}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    title: "Name / Matric No.",
    key: "name",
    cell: (row) => (
      <div>
        <div className="font-medium flex gap-2 items-center">{row.name}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.matricNo}
        </div>
      </div>
    ),
  },
  {
    title: "Gender",
    key: "gender",
    thClass: "text-center",
    cell: (row) => (
      <div>
        <div className="text-center font-medium">{row.gender}</div>
        <div className="text-xs text-muted-foreground line-clamp-1"></div>
      </div>
    ),
  },
  {
    title: "Program / Department",
    key: "rank",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.program}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.department.name}
        </div>
      </div>
    ),
  },
  {
    title: "Identifier & Contact",
    key: "identifier",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.identifier}</div>
        <div className="font-medium">{row.email || row.phone}</div>
      </div>
    ),
  },
  {
    title: "Level",
    key: "level",
    cell: (row) => <div className="font-medium">{row.level} </div>,
  },
  {
    title: "Status",
    key: "status",
    thClass: "text-center",
    cell: (row) => (
      <Badge
        variant={row.status === "Active" ? "success" : "secondary"}
        className="capitalize text-center"
      >
        {row.status || "Inactive"}
      </Badge>
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
            description="Are you sure you want to delete this Lecturer? "
            action={() => handleDeleteStudent(row._id)}
            triggerLabel={<IoTrashBinOutline />}
            type="delete"
            confirmLabel={isDeleting ? "Deleting..." : "Yes, Delete"}
          />
        </div>
      </div>
    ),
  },
];
