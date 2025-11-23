import type { IHeader } from "@/components/table/types";
import { IoTrashBinOutline } from "react-icons/io5";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";
import { Button } from "@/components/ui/button";
import { Crown, Edit2, Eye } from "lucide-react";
import type { IAdminLecturer } from "../type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from "@/lib/functions";
import Badge from "@/components/ui-components/Badge";

export const lecturersListTableHeaders = (
  onViewDetails: (lecturers: IAdminLecturer) => void,
  onEdit: (lecturer: IAdminLecturer) => void,
  onDelete: (id: string) => void,
  isDeleting: boolean
): IHeader<IAdminLecturer>[] => [
  {
    title: "Image",
    key: "profilePhoto",
    cell: (row) => (
      <Avatar className="h-14 w-14 border-2 border-white shadow-md">
        <AvatarImage src={row.profilePhoto || undefined} alt={row.name} />
        <AvatarFallback className="bg-indigo-50 text-indigo-700 text-lg">
          {getNameInitials(row.name)}
        </AvatarFallback>
      </Avatar>
    ),
  },
  {
    title: "Name",
    key: "name",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.name}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.isHod && (
            <Crown className="h-4 w-4 text-amber-500 fill-amber-500" />
          )}
        </div>
      </div>
    ),
  },
  {
    title: "Gender",
    key: "gender",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.gender}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.gender}
        </div>
      </div>
    ),
  },
  {
    title: "Rank ",
    key: "rank",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.rank}</div>
        <div className="text-xs text-muted-foreground line-clamp-1">
          {row.department.name} Semester
        </div>
      </div>
    ),
  },
  {
    title: "Identifier",
    key: "identifier",
    thClass: "text-center",
    cell: (row) => (
      <>
        <div className="text-center font-medium">{row.identifier}</div>
        <div className="text-center font-medium">{row.email || row.phone}</div>
      </>
    ),
  },
  {
    title: "Specialization",
    key: "specialization",
    thClass: "text-center",
    cell: (row) => (
      <div className="text-center font-medium">{row.specialization} </div>
    ),
  },
  {
    title: "Status",
    key: "status",
    thClass: "text-center",
    cell: (row) => (
      <Badge
        variant={row.status === "Active" ? "success" : "secondary"}
        className="capitalize"
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
