import { FaRegFilePdf } from "react-icons/fa6";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Dispatch, SetStateAction } from "react";
import { RiFileExcel2Line } from "react-icons/ri";
import { DOWNLOADABLE } from "./types";

type IToolbar = {
  checkedItems: string[];
  onDeleteCheck?: (ids: string[]) => void;
  setNumPage: Dispatch<SetStateAction<number>>;
  setPag: Dispatch<SetStateAction<{ start: number; end: number }>>;
  pagePerRow: number;
  total: number;
  downloadables: string[];
  onDownloadClick: () => void;
};
const Toolbar = (props: IToolbar) => {
  const {
    checkedItems,
    onDeleteCheck,
    setNumPage,
    pagePerRow,
    setPag,
    total,
    onDownloadClick,
    downloadables,
  } = props;
  return (
    <div className="w-full flex justify-between items-center p-2 bg-white">
      <div className="w-full">
        <div className=" flex justify-between items-center w-full px-4">
          <div className="">
            Total: Item <span className="font-bold">{total}</span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Label>Showing:</Label>
            <Select
              value={pagePerRow.toString()}
              onValueChange={(val) => {
                setNumPage(Number(val));
                setPag({ start: 0, end: Number(val) });
              }}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <Label>of {total} items</Label>
          </div>
        </div>

        {checkedItems.length > 0 && onDeleteCheck && (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDeleteCheck(checkedItems)}
          >
            Delete {`(${checkedItems.length})`}
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {downloadables.includes(DOWNLOADABLE.XLSX) && (
          <Button
            className="bg-primary/20 hover:bg-primary/10  p-2 rounded-lg text-primary"
            onClick={onDownloadClick}
          >
            <RiFileExcel2Line size={22} />
          </Button>
        )}
        {downloadables.includes(DOWNLOADABLE.PDF) && (
          <Button className="bg-primary/20 p-2 hover:bg-primary/10 rounded-lg text-primary">
            <FaRegFilePdf size={22} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
