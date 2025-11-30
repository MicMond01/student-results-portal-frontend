import React from "react";
import type { GroupedStudentData, IStudentResult } from "../types";
import type { TableColumn } from "@/components/tables/types";
import Badge from "@/components/ui-components/Badge";
import { MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CollapsibleTable from "@/components/tables/CollapsibleTable";
import ResultsTable from "./results-table";

interface StudentsTableProps {
  data: GroupedStudentData[];
  isLoading: boolean;
  onEditResult: (result: IStudentResult) => void;
  onDeleteResult: (resultId: string) => void;
  onViewStudentProfile: (studentId: string) => void;

  // Header Actions
  onCreate?: () => void;

  // Search & Filters
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  departmentFilter?: string;
  onDepartmentFilterChange?: (val: string) => void;
  departments?: string[];
  levelFilter?: string;
  onLevelFilterChange?: (val: string) => void;
  levels?: string[];
  sessionFilter?: string;
  onSessionFilterChange?: (val: string) => void;
  sessions?: string[];

  // Export
  onExportCSV?: () => void;
  onExportPDF?: () => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  data,
  isLoading,
  onEditResult,
  onDeleteResult,
  onViewStudentProfile,
  onCreate,
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
  onExportCSV,
  onExportPDF,
}) => {
  const columns: TableColumn<GroupedStudentData>[] = [
    {
      key: "name",
      title: "Student Name",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-slate-200">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row.student.matricNo}`}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-slate-900 group-hover:text-primary-700 transition-colors">
              {row.student.name}
            </div>
            <div className="text-xs text-slate-500">{row.student.matricNo}</div>
          </div>
        </div>
      ),
    },
    {
      key: "id",
      title: "ID No.",
      cell: (row) => (
        <span className="font-mono text-slate-600">{row.student.matricNo}</span>
      ), // Mock fixed ID
    },
    {
      key: "department",
      title: "Department",
      cell: (row) => (
        <div>
          <div className="font-medium text-slate-700">
            {row.student.department.name || "N/A"}
          </div>
        </div>
      ),
    },
    {
      key: "level",
      title: "Level",
      cell: (row) => <span>{row.student.level}</span>,
    },
    {
      key: "contact",
      title: "Contact",
      cell: (row) => (
        <div>
          <div className="font-medium text-slate-700">{row.student.phone}</div>
          <div className="text-xs text-slate-400 lowercase">
            {row.student.email}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      title: "Status",
      cell: (row) => <Badge variant="success">Active</Badge>,
    },
    {
      key: "actions",
      title: "Actions",
      className: "text-right",
      cell: (row) => (
        <div
          className="flex justify-end items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onViewStudentProfile(row.student._id)}
            className="p-2 hover:bg-slate-200 rounded-full text-slate-400 hover:text-primary-600 transition-colors"
            title="View Profile"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header - Separated from Table/Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Students Directory
          </h1>
          <p className="text-slate-500">
            Manage student data, enrollments and results
          </p>
        </div>
        <div>
          <Button
            onClick={onCreate}
            className="gap-2 shadow-sm bg-primary-700 hover:bg-primary-800 text-white"
          >
            <Plus className="w-4 h-4" /> Add New Student
          </Button>
        </div>
      </div>

      {/* Filterable Table */}
      <CollapsibleTable<GroupedStudentData>
        id={(row) => row.student._id}
        rows={data}
        header={columns}
        isLoading={isLoading}
        withCheckbox={true}
        onDownloadXlsx={onExportCSV}
        onDownloadPdf={onExportPDF}
        // Search & Filters
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
        renderSubComponent={(row) => (
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h4 className="text-lg font-semibold text-slate-800">
                  Academic Records
                </h4>
                <p className="text-sm text-slate-500">
                  Breakdown for {row.student.name}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewStudentProfile(row.student._id)}
                >
                  View Full Profile
                </Button>
              </div>
            </div>
            <ResultsTable
              results={row.results}
              onEditResult={onEditResult}
              onDeleteResult={onDeleteResult}
            />
          </div>
        )}
      />
    </div>
  );
};

export default StudentsTable;
