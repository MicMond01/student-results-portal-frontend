// src/components/tables/DataTable.tsx
import React, { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  searchableKeys?: (keyof T)[];
};

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  searchableKeys = [],
}: Props<T>) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      searchableKeys.some((k) =>
        String(row[k] ?? "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [data, query, searchableKeys]);

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageData = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="rounded-2xl border border-white/40 bg-white/60 p-4 backdrop-blur-xl sm:p-6">
      <div className="mb-3 flex flex-col gap-3 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-lg font-semibold text-[#2b2653]">Students</div>
        <div className="flex w-full max-w-md items-center gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search students…"
          />
          <Button variant="outline">Filter</Button>
          <Button className="bg-[#7371fc] hover:bg-[#6b67f0] text-white">
            Create
          </Button>
        </div>
      </div>

      <Separator className="mb-4" />

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-[#2b2653]/70">
              {columns.map((c) => (
                <th
                  key={String(c.key)}
                  className={["px-3 py-2 font-semibold", c.className].join(" ")}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr
                key={idx}
                className="group cursor-pointer border-t border-white/40 hover:bg-[#e5d9f2]/60"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((c) => (
                  <td
                    key={String(c.key)}
                    className={["px-3 py-3 text-[#2b2653]"].join(" ")}
                  >
                    {c.render
                      ? c.render(row)
                      : String(row[c.key as keyof typeof row] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-8 text-center text-[#2b2653]/60"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="text-xs text-[#2b2653]/60">
          {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} of{" "}
          {total}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <div className="text-sm">
            {page} / {pages}
          </div>
          <Button
            variant="outline"
            disabled={page === pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
