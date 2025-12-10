import { Button } from "@/components/ui/button";
import ManageSessionDialog from "./ManageSessionDialog";
import { useState } from "react";
import type { SessionFormData } from "./type";
import {
  ArrowUpDown,
  Calendar,
  ChevronRight,
  Clock,
  Download,
  Edit,
  Plus,
  RefreshCw,
  Search,
  SearchIcon,
  Trash,
} from "lucide-react";
import { formatDate } from "@/lib/admin-results-helper";
import { Input } from "@/components/ui/input";

const AdminSessions = () => {
  const [sessions, setSessions] = useState<Session[]>(
    mockSessionsResponse.sessions
  );
  const [isLoading, setIsLoading] = useState(true);

  // Dialog States
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  // Initial Load
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setIsManageOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSessionToDelete(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    console.log("Deleting session");
  };

  const handleSave = async (data: SessionFormData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));

    if (editingSession) {
      setSessions((prev) =>
        prev.map((s) => (s._id === editingSession._id ? { ...s, ...data } : s))
      );
    } else {
      const newSession = {
        ...data,
        _id: `new_${Date.now()}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __v: 0,
      };
      // If new session is current, unset others
      if (data.isCurrent) {
        setSessions((prev) => [
          newSession,
          ...prev.map((s) => ({ ...s, isCurrent: false })),
        ]);
      } else {
        setSessions((prev) => [newSession, ...prev]);
      }
    }
    setIsManageOpen(false);
    setIsLoading(false);
  };

  return (
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
          className="gap-2 shadow-sm bg-blue-500 hover:bg-blue-600 text-white border-none"
        >
          <Plus className="w-4 h-4" /> Add New Session
        </Button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-2 sm:p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
          <div className="w-full sm:w-64">
            <Input
              placeholder="Search sessions..."
              icon={<Search className="w-4 h-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-slate-200"
            />
          </div>
          <div className="w-full sm:w-40">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "All Statuses", label: "All Statuses" },
                { value: "CURRENT", label: "Current" },
                { value: "UPCOMING", label: "Upcoming" },
                { value: "COMPLETED", label: "Completed" },
              ]}
              className="bg-transparent border-slate-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-900 gap-2"
          >
            <ArrowUpDown className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Sort</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-900 gap-2"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-900 gap-2"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSessions.map((session) => {
          const status = getSessionStatus(session);
          return (
            <div
              key={session._id}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`h-12 w-12 rounded-lg flex items-center justify-center ${getIconStyle(
                    status
                  )}`}
                >
                  {status === "CURRENT" ? (
                    <Calendar className="w-6 h-6" />
                  ) : status === "UPCOMING" ? (
                    <Calendar className="w-6 h-6" />
                  ) : (
                    <Clock className="w-6 h-6" />
                  )}
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusStyle(
                    status
                  )}`}
                >
                  {status === "CURRENT" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block mr-1.5 mb-0.5"></span>
                  )}
                  {status}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">
                  {session.session}
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  Academic Year
                </p>
              </div>

              <div className="space-y-3 mb-8 flex-1">
                <div className="flex items-center justify-between text-sm group">
                  <div className="flex items-center gap-2 text-slate-400">
                    <ChevronRight className="w-3 h-3 text-slate-300" /> Start
                  </div>
                  <span className="font-semibold text-slate-800">
                    {formatDate(session.startDate)}
                  </span>
                </div>
                <div className="w-full border-t border-dashed border-slate-100"></div>
                <div className="flex items-center justify-between text-sm group">
                  <div className="flex items-center gap-2 text-slate-400">
                    <ChevronRight className="w-3 h-3 text-slate-300" /> End
                  </div>
                  <span className="font-semibold text-slate-800">
                    {formatDate(session.endDate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <Button
                  variant="outline"
                  className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50"
                  onClick={() => handleOpenEdit(session)}
                >
                  <Edit className="w-3.5 h-3.5 mr-2" /> Edit
                </Button>
                <Button
                  variant="danger"
                  size="icon"
                  className="bg-red-50 text-red-500 border-red-100 hover:bg-red-100 hover:text-red-600 hover:border-red-200"
                  onClick={() => handleDelete(session._id)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}

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
        isLoading={isLoading} // Reuse loading state for simplicity or add dedicated state
      />
    </div>
  );
};

export default AdminSessions;
