// src/components/tables/cells/StatusBadge.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";

const map: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Probation: "bg-amber-100 text-amber-800 border-amber-200",
  Alumni: "bg-indigo-100 text-indigo-800 border-indigo-200",
};

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  return (
    <Badge
      className={[
        "border",
        map[status] ?? "bg-gray-100 text-gray-800 border-gray-200",
      ].join(" ")}
    >
      {status}
    </Badge>
  );
};
export default StatusBadge;
