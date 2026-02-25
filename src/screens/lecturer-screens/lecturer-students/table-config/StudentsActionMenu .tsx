import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IoEllipsisHorizontalCircle, IoTrashOutline } from "react-icons/io5";
import { TiEdit } from "react-icons/ti";
import { MdPublishedWithChanges } from "react-icons/md";

const CategoryActionMenu = ({
  row,
  handleEditMeal,
  handleUpdateCategoryStatus,
  handleDeleteCategory,
}: {
  row: ICategories;
  handleEditMeal: (meal: ICategories) => void;
  handleUpdateCategoryStatus: (category: ICategories) => void;
  handleDeleteCategory: (uuid: string) => void;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button>
        <IoEllipsisHorizontalCircle size={25} />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-36">
      <DropdownMenuItem onClick={() => handleEditMeal(row)}>
        <TiEdit className="mr-2 h-4 w-4" />
        <span>Edit</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => handleUpdateCategoryStatus(row)}>
        <MdPublishedWithChanges className="mr-2 h-4 w-4" />
        <span>{row.published ? "Un-Publish" : "Publish"}</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => handleDeleteCategory(row.uuid)}>
        <IoTrashOutline className="mr-2 h-4 w-4 text-red-500" />
        <span>Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default CategoryActionMenu;
