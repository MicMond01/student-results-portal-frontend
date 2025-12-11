import React from "react";
import type { GroupedStudentData } from "../types";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import CollapsibleTable from "@/components/tables/CollapsibleTable";
import ResultsCollapsDetails from "./results-collaps-details";
import { resultsTableHeaders } from "./results-table-headers";
import { useNavigate } from "react-router-dom";
import {
  useAdminResultsStore,
  useFilteredResults,
} from "@/stores/useAdminResultsStore";
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import BulkUploadDialog from "../../components/BulkUploadDialog";
import type { ISession } from "@/screens/admin/sessions/type";

interface StudentsTableProps {
  isLoading: boolean;
  levels?: string[];
  sessions?: ISession[];
  onExportCSV?: () => void;
  onExportPDF?: () => void;
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  isLoading,
  levels,
  sessions,
  onExportCSV,
  onExportPDF,
}) => {
  const navigate = useNavigate();

  const { data: departments } = useGetAllDepartmentsQuery();

  const filteredData = useFilteredResults();
  const filters = useAdminResultsStore((state) => state.filters);
  const updateFilters = useAdminResultsStore((state) => state.updateFilters);
  const openCreateModal = useAdminResultsStore(
    (state) => state.openCreateModal
  );

  const { setIsBulkUploadOpen } = useAdminResultsStore();

  const uniqueDepartments = React.useMemo(
    () => departments?.departments?.map((d) => d.name).sort() || [],
    [departments]
  );

  const navigateToProfile = (id: string) => {
    navigate(`/admin/results/${id}`);
  };

  const handleCreateResult = () => {
    openCreateModal();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Students Directory
          </h1>
          <p className="text-slate-500">
            Manage student data, enrollments and results
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsBulkUploadOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Bulk Upload
          </Button>
          <Button
            onClick={handleCreateResult}
            className="gap-2 shadow-sm bg-primary-4 hover:bg-primary-800 text-white"
          >
            <Plus className="w-4 h-4" /> Add New Result
          </Button>
        </div>
      </div>

      {/* Filterable Table */}
      <CollapsibleTable<GroupedStudentData>
        id={(row) => row.student._id}
        rows={filteredData}
        header={resultsTableHeaders(navigateToProfile)}
        isLoading={isLoading}
        withCheckbox={true}
        onDownloadXlsx={onExportCSV}
        onDownloadPdf={onExportPDF}
        searchQuery={filters.search}
        onSearchChange={(value) => updateFilters({ search: value })}
        departmentFilter={filters.department}
        onDepartmentFilterChange={(value) =>
          updateFilters({ department: value })
        }
        departments={uniqueDepartments}
        levelFilter={filters.level}
        onLevelFilterChange={(value) => updateFilters({ level: value })}
        levels={levels}
        sessionFilter={filters.session}
        onSessionFilterChange={(value) => updateFilters({ session: value })}
        sessions={sessions || []}
        renderSubComponent={(row) => (
          <div className="bg-white rounded-lg">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h4 className="text-lg font-semibold text-slate-800">
                  Academic Records
                </h4>
                <p className="text-sm text-primary-4">
                  Breakdown for {row.student.name}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigateToProfile(row.student._id)}
                >
                  View Full Profile
                </Button>
              </div>
            </div>
            <ResultsCollapsDetails results={row.results} />
          </div>
        )}
      />

      <BulkUploadDialog />
    </div>
  );
};

export default StudentsTable;
