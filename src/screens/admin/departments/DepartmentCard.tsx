// DepartmentCard.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpen,
  BookUp2,
  Building2,
  Edit2,
  Mail,
  School,
  Trash2,
  User,
} from "lucide-react";
import type { IDepartment } from "../type";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";
import { useDeleteDepartmentMutation } from "@/redux/query/admin-departments";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAdminDepartmentStore } from "@/stores/useAdminDepartmentsStore";

const DepartmentCard: React.FC<{
  dept: IDepartment;
}> = ({ dept }) => {
  const navigate = useNavigate();
  const [deleteDepartmentTrigger] = useDeleteDepartmentMutation();
  const { openManageDialog } = useAdminDepartmentStore();

  const confirmDelete = async () => {
    const toastId = toast.loading("Deleting Department...");

    try {
      await deleteDepartmentTrigger(dept._id).unwrap();
      toast.success("Department successfully deleted!", { id: toastId });
    } catch (error: any) {
      const message =
        error?.data?.msg || error?.data?.message || "Failed to delete";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <Badge className="mb-2" variant="default">
              {dept.code}
            </Badge>
            <CardTitle className="text-xl">{dept.name}</CardTitle>
            <CardDescription className="mt-1 flex items-center gap-1">
              <School className="h-3 w-3" /> {dept.faculty}
            </CardDescription>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openManageDialog(dept)}
            >
              <Edit2 className="h-4 w-4 text-gray-500" />
            </Button>
            <ConfirmationDialog
              title="Delete Department"
              description="Are you sure you want to delete this department? This action cannot be undone and may affect associated courses and students."
              action={confirmDelete}
              type="delete"
              triggerLabel={<Trash2 className="h-4 w-4 mt-2 text-red-500" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-gray-600 line-clamp-3">{dept.description}</p>

        {(dept.hodName || dept.officeLocation) && (
          <div className="bg-gray-50 p-3 rounded-lg space-y-2 text-sm border border-gray-100">
            {dept.hodName && (
              <div className="flex items-center gap-2 text-gray-700">
                <User className="h-3.5 w-3.5 text-indigo-500" />
                <span className="font-medium">{dept.hodName}</span>
              </div>
            )}
            {dept.hodEmail && (
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-3.5 w-3.5 text-indigo-500" />
                <span>{dept.hodEmail}</span>
              </div>
            )}
            {dept.officeLocation && (
              <div className="flex items-center gap-2 text-gray-600">
                <Building2 className="h-3.5 w-3.5 text-indigo-500" />
                <span>{dept.officeLocation}</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 mt-auto gap-4">
        <Button
          className="w-full bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-indigo-200 border shadow-none"
          onClick={() => navigate(`/admin/courses?departmentId=${dept._id}`)}
        >
          <BookUp2 className="mr-2 h-4 w-4" />
          View Courses
        </Button>
        <Button
          className="w-full bg-indigo-700 text-indigo-50 hover:bg-indigo-900 border-indigo-200 border shadow-none"
          onClick={() => navigate(`/admin/departments/${dept._id}`)}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          View Department
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DepartmentCard;
