import { useState, Fragment, useEffect } from "react";

import TablePagination from "./TablePagination";
import type { CollapsibleTableProps } from "./types";
import TableToolbar from "./CollapsibleToolbar";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";
import { ArrowUpDown, ChevronRight } from "lucide-react";

const CollapsibleTable = <T extends Record<string, any>>(
  props: CollapsibleTableProps<T>
) => {
  const {
    header,
    rows,
    id,
    onDeleteCheck,
    withCheckbox,
    onRowClick,
    renderSubComponent,
    isLoading,
    totalPerPage,
    onDownloadXlsx,
    onDownloadPdf,
    searchQuery,
    onSearchChange,
    departmentFilter,
    onDepartmentFilterChange,
    departments,
    levelFilter,
    onLevelFilterChange,
    levels,
    sessionFilter,
    onSessionFilterChange,
    sessions,
  } = props;

  const [checked, setChecked] = useState<string[]>([]);
  const [numPerPage, setNumPerPage] = useState(totalPerPage ?? 10);
  const [pag, setPag] = useState({ start: 0, end: totalPerPage ?? 10 });
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  // Reset pagination if rows change significantly (like filter)
  useEffect(() => {
    setPag({ start: 0, end: numPerPage });
  }, [rows.length, numPerPage]);

  const getRowId = (row: T): string => {
    if (typeof id === "function") {
      return id(row);
    }
    return String(row[id]);
  };

  const handleCheckAll = (isChecked: boolean) => {
    if (isChecked) {
      setChecked(rows.map((item) => getRowId(item)));
    } else setChecked([]);
  };

  const handleSingleCheck = (checkState: boolean, uuid: string) => {
    if (!checkState) {
      setChecked((prev) => prev.filter((x) => x !== uuid));
    } else setChecked((prev) => [...prev, uuid]);
  };

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  const displayedRows = rows.slice(pag.start, pag.end);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full animate-in fade-in duration-500">
      <TableToolbar
        checkedItems={checked}
        onDeleteCheck={onDeleteCheck}
        total={rows.length}
        pagePerRow={numPerPage}
        setNumPage={(num) => {
          setNumPerPage(num);
          setPag({ start: 0, end: num });
        }}
        onDownloadClick={() => onDownloadXlsx && onDownloadXlsx(rows)}
        onDownloadPdf={() => onDownloadPdf && onDownloadPdf(rows)}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        departmentFilter={departmentFilter}
        onDepartmentFilterChange={onDepartmentFilterChange}
        departments={departments}
        levelFilter={levelFilter}
        onLevelFilterChange={onLevelFilterChange}
        levels={levels}
        sessionFilter={sessionFilter}
        onSessionFilterChange={onSessionFilterChange}
        sessions={sessions}
      />

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 w-12"></th>
              {withCheckbox && (
                <th className="px-6 py-3 w-12">
                  <Checkbox
                    checked={rows.length > 0 && checked.length === rows.length}
                    onCheckedChange={handleCheckAll}
                  />
                </th>
              )}
              {header.map((head) => (
                <th
                  key={head.key}
                  className={`px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap ${
                    head.className || ""
                  }`}
                >
                  <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors">
                    {head.title}
                    {head.sortKey && (
                      <ArrowUpDown className="w-3 h-3 text-slate-400" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td
                    colSpan={header.length + (withCheckbox ? 2 : 1)}
                    className="px-6 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-1/4" />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : displayedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={header.length + (withCheckbox ? 2 : 1)}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  No records found.
                </td>
              </tr>
            ) : (
              displayedRows.map((row) => {
                const rowId = getRowId(row);
                const isExpanded = !!expandedRows[rowId];
                const isChecked = checked.includes(rowId);

                return (
                  <Fragment key={rowId}>
                    <tr
                      onClick={() => {
                        if (renderSubComponent) toggleRowExpansion(rowId);
                        if (onRowClick) onRowClick(row);
                      }}
                      className={`group transition-colors duration-200 cursor-pointer border-l-4 ${
                        isExpanded
                          ? "bg-indigo-50/40 border-l-primary-500"
                          : "hover:bg-slate-50 border-l-transparent"
                      }`}
                    >
                      <td className="px-6 py-4 w-12 text-slate-400">
                        {renderSubComponent && (
                          <div
                            className={`p-1 rounded-full hover:bg-slate-200/50 transition-all duration-300 ease-in-out ${
                              isExpanded
                                ? "rotate-90 text-primary-600 bg-primary-100/50"
                                : ""
                            }`}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </div>
                        )}
                      </td>

                      {withCheckbox && (
                        <td
                          className="px-6 py-4 w-12"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={(c) =>
                              handleSingleCheck(c as boolean, rowId)
                            }
                          />
                        </td>
                      )}

                      {header.map((col, idx) => (
                        <td
                          key={`${rowId}-${idx}`}
                          className={`px-6 py-4 text-sm whitespace-nowrap ${
                            col.className || "text-slate-600"
                          }`}
                        >
                          {col.cell ? col.cell(row) : row[col.key as keyof T]}
                        </td>
                      ))}
                    </tr>

                    {/* Expanded Row Content with smooth grid animation */}
                    <tr className="border-0">
                      <td
                        colSpan={header.length + (withCheckbox ? 2 : 1)}
                        className="p-0 border-0"
                      >
                        <div
                          className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
                            isExpanded ? "max-h-[1000px]" : "max-h-0"
                          }`}
                        >
                          <div
                            className={`bg-slate-50/50 shadow-inner p-6 border-b border-slate-200`}
                          >
                            {renderSubComponent && renderSubComponent(row)}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white border-t border-slate-200 p-4">
        <TablePagination
          total={rows.length}
          pagePerRow={numPerPage}
          currentPageStart={pag.start}
          onPageChange={(start, end) => setPag({ start, end })}
        />
      </div>
    </div>
  );
};

export default CollapsibleTable;
