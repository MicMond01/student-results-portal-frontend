import ManageSessionDialog from "./ManageSessionDialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SessionsFilters from "./sessions-filters";
import useAdminSessions from "@/lib/hooks/sessions/useAdminSessions";
import SessionCard from "./SessionCard";

const AdminSessions = () => {
  const {
    isLoadingSessions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    formData,
    setFormData,
    isManageOpen,
    setIsManageOpen,
    editingSession,
    filteredSessions,
    sessionSatausoptions,
    getSessionStatus,
    getStatusStyle,
    getIconStyle,
    handleEdit,
    handleOpenCreate,
    handleDelete,
    handleSave,
  } = useAdminSessions();

  return (
    <div className="min-h-screen ">
      <main className="p-4 lg:p-8">
        <div className="mx-auto max-w-380">
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Academic Sessions
                </h1>
                <p className="text-slate-500">
                  Manage academic years, terms, and session configurations.
                </p>
              </div>
              <Button
                onClick={handleOpenCreate}
                className="gap-2 shadow-sm text-white border-none"
              >
                <Plus className="w-4 h-4" /> Add New Session
              </Button>
            </div>

            {/* Toolbar */}
            <SessionsFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sessionSatausoptions={sessionSatausoptions}
            />

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions?.map((session) => (
                <SessionCard
                  key={session._id}
                  session={session}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  getSessionStatus={getSessionStatus}
                  getStatusStyle={getStatusStyle}
                  getIconStyle={getIconStyle}
                />
              ))}

              {/* Create New Session Card Placeholder */}
              <button
                onClick={handleOpenCreate}
                className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer transition-all min-h-[300px] group"
              >
                <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Plus className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 group-hover:text-blue-700">
                  Create New Session
                </h3>
                <p className="text-sm text-slate-500 mt-2 max-w-[200px]">
                  Configure a new academic year session.
                </p>
              </button>
            </div>

            {/* Create/Edit Modal */}
            <ManageSessionDialog
              open={isManageOpen}
              onOpenChange={setIsManageOpen}
              session={editingSession}
              onSave={handleSave}
              isLoading={isLoadingSessions}
              setFormData={setFormData}
              formData={formData}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminSessions;
