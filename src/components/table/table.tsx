import { cn } from "@/lib/utils";
import { FaSortAlphaUp } from "react-icons/fa";
import { Checkbox } from "../ui/checkbox";
import { useState, type Dispatch, type SetStateAction } from "react";
import Toolbar from "./toolbar";
import empty from "@/assets/empty.svg";
import { Skeleton } from "../ui/skeleton";
import ReactPaginate from "react-paginate";
import { Separator } from "../ui/separator";
import type { ITable } from "./types";

const Table = <T extends Record<string, any>>(props: ITable<T>) => {
  const {
    header,
    headerRowClass,
    sortColumn,
    rows,
    id,
    onDeleteCheck,
    withCheckbox,
    onRowClick,
    isLoading,
    totalPerPage,
    onDownloadXlsx,
    downloadables = [],
  } = props;
  const [checked, setChecked] = useState<string[]>([]);
  const [numPerPage, setNumPerPage] = useState(totalPerPage ?? 10);
  const [pag, setPag] = useState({ start: 0, end: numPerPage });

  const handleCheckAll = (isChecked: boolean) => {
    if (!id) return;
    if (isChecked) {
      setChecked(rows.map((item) => item[id]));
    } else setChecked([]);
  };

  const handleSingleCheck = (checkState: boolean | string, uuid: typeof id) => {
    if (!uuid) return;
    if (!checkState) {
      setChecked((prev) => prev.filter((x) => x !== uuid));
    } else setChecked((prev) => [...prev, uuid]);
  };

  return (
    <div>
      <Toolbar
        checkedItems={checked}
        onDeleteCheck={onDeleteCheck}
        total={rows.length}
        pagePerRow={numPerPage}
        downloadables={downloadables}
        setNumPage={setNumPerPage}
        setPag={setPag}
        onDownloadClick={() => {
          if (onDownloadXlsx) onDownloadXlsx(rows.slice(pag.start, pag.end));
        }}
      />
      <div className="overflow-scroll">
        <table className="bg-background w-full overflow-hidden rounded-lg mt-2">
          <thead className="border-b bg-gray-200 text-gray-800">
            <tr>
              {withCheckbox && (
                <th className="p-3 text-start w-3">
                  <Checkbox
                    className="border border-white"
                    checked={checked.length === rows.length}
                    onCheckedChange={handleCheckAll}
                  />
                </th>
              )}
              {header.map((head) => (
                <th
                  key={head.title}
                  className={cn(
                    "p-3 text-start text-forground text-sm font-semibold",
                    headerRowClass
                  )}
                >
                  <div className="flex items-center gap-1">
                    <span>{head.title}</span>{" "}
                    {head.sortKey && sortColumn && (
                      <button onClick={() => sortColumn(head.sortKey!)}>
                        <FaSortAlphaUp />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(pag.start, pag.end).map((row, rowIndex) => (
              <tr
                className={cn(
                  "hover:bg-gray-100 bg-white cursor-pointer border-b"
                )}
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {withCheckbox && (
                  <td
                    onClick={(e) => e.stopPropagation()}
                    className={cn("p-3 text-sm")}
                  >
                    <Checkbox
                      checked={checked.includes(row[id!])}
                      onCheckedChange={(checkState) =>
                        handleSingleCheck(checkState, row[id!])
                      }
                    />
                  </td>
                )}
                {header.map((head, colIndex) => (
                  <td
                    key={colIndex}
                    className={cn("p-3 text-sm", head.thClass)}
                    onClick={(e) => head.stopPropagation && e.stopPropagation()}
                  >
                    {head.cell ? (
                      head.cell(row)
                    ) : (
                      <div className="flex items-center gap-1">
                        {row[head.key as keyof T]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isLoading && (
        <div className="flex flex-col gap-3 py-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full " />
          <Skeleton className="h-6 w-full " />
          <Skeleton className="h-6 w-full " />
        </div>
      )}
      {!isLoading && rows.length === 0 && (
        <div className="bg-background flex items-center justify-center py-10 mt-2 rounded-b-lg">
          <div className="flex items-center justify-center flex-col">
            <img alt="empty" src={empty} className="size-20" />
            <span className="text-gray-500 text-sm font-semibold">Empty</span>
          </div>
        </div>
      )}
      <Separator orientation="horizontal" />
      {Math.ceil(rows.length / numPerPage) > 1 && (
        <Pagination
          total={rows.length}
          pagePerRow={numPerPage}
          setPag={setPag}
        />
      )}
    </div>
  );
};

export default Table;

interface IPagination {
  total: number;
  pagePerRow: number;
  setPag: Dispatch<SetStateAction<{ start: number; end: number }>>;
}

const Pagination = (props: IPagination) => {
  const { total, pagePerRow, setPag } = props;

  const handlePageChange = ({ selected }: { selected: number }) => {
    const start = selected * pagePerRow;
    const end = Math.min(start + pagePerRow, total);

    setPag({ start, end });
    // console.log(`Page ${selected + 1}: Showing items ${start + 1} to ${end}`);
  };

  return (
    <div className="py-3 flex items-center justify-between gap-5 mt-5">
      <ReactPaginate
        className="flex items-center gap-2"
        breakLabel="..."
        nextLabel=">"
        pageClassName="rounded-md"
        activeClassName="bg-primary text-white"
        pageLinkClassName="size-8 flex items-center justify-center text-sm font-semibold border border-primary/20 rounded-md"
        previousLinkClassName="size-8 flex items-center justify-center text-sm font-semibold border border-primary/20 rounded-md"
        nextLinkClassName="size-8 flex items-center justify-center text-sm font-semibold border border-primary/20 rounded-md"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(total / pagePerRow)}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
