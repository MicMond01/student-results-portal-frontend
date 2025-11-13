import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";
import { DataTable } from "@/components/tables/DataTable";

interface SingleResult {
  course: string;
  title: string;
  ca: number;
  exam: number;
  total: number;
  creditUnit: number;
  grade: string;
}

interface Column<T> {
  key: keyof T;
  label: string;
  align?: "left" | "center" | "right";
  render?: (value: any, row: T) => React.ReactNode;
}

const ResultsTable: React.FC<{ results: SingleResult[] }> = ({ results }) => {
  const totalUnits = results.reduce((acc, res) => acc + res.creditUnit, 0);

  const gradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "text-green-600 font-bold";
      case "B":
        return "text-blue-600 font-semibold";
      case "C":
        return "text-yellow-600 font-medium";
      case "D":
        return "text-orange-600";
      case "E":
        return "text-red-600";
      case "F":
        return "text-red-700 font-bold";
      default:
        return "text-gray-700";
    }
  };

  const columns: Column<SingleResult>[] = [
    {
      key: "course",
      label: "Code",
      render: (value: string) => <Badge variant="outline">{value}</Badge>,
    },
    { key: "title", label: "Course Title" },
    { key: "ca", label: "CA", align: "center" },
    { key: "exam", label: "Exam", align: "center" },
    {
      key: "total",
      label: "Total",
      align: "center",
      render: (val: number) => <strong>{val}</strong>,
    },
    { key: "creditUnit", label: "Units", align: "center" },
    {
      key: "grade",
      label: "Grade",
      align: "right",
      render: (value: string) => (
        <span className={cn(gradeColor(value))}>{value}</span>
      ),
    },
  ];

  const footer = (
    <TableRow>
      <TableCell colSpan={5} className="text-right font-semibold">
        Semester Total Units:
      </TableCell>
      <TableCell className="text-center font-bold">{totalUnits}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );

  return <DataTable data={results} columns={columns} footer={footer} />;
};

export default ResultsTable;
