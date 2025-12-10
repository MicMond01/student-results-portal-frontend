// useAdminSessions.ts (new hook file)
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useCreateAcademicSessionMutation,
  useDeleteAcademicSessionMutation,
  useGetAllAcademicSessionsQuery,
  useUpdateAcademicSessionMutation,
} from "@/redux/query/admin-sessions";
import type { ISession, SessionFormData } from "@/screens/admin/sessions/type";

export default function useAdminSessions() {
  const { data: sessionsData, isLoading: isLoadingSessions } =
    useGetAllAcademicSessionsQuery();

  const [createSessionTrigger, { isLoading: isCreating }] =
    useCreateAcademicSessionMutation();
  const [updateSessionTrigger, { isLoading: isUpdating }] =
    useUpdateAcademicSessionMutation();
  const [deleteSessionTrigger, { isLoading: isDeleting }] =
    useDeleteAcademicSessionMutation();

  const sessions: ISession[] = sessionsData?.sessions || [];

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Form State
  const [formData, setFormData] = useState<SessionFormData>({
    session: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    isActive: false,
  });

  // Dialog States
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<ISession | null>(null);

  const getSessionStatus = (session: ISession) => {
    if (session.isCurrent) return "CURRENT";
    const now = new Date();
    const start = new Date(session.startDate);
    const end = new Date(session.endDate);
    if (now >= start && now <= end) return "CURRENT"; // Auto-detect ongoing as CURRENT if between dates
    if (start > now) return "UPCOMING";
    return "COMPLETED";
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "CURRENT":
        return "bg-green-100 text-green-700 border-green-200";
      case "UPCOMING":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  const getIconStyle = (status: string) => {
    switch (status) {
      case "CURRENT":
        return "bg-blue-50 text-blue-600";
      case "UPCOMING":
        return "bg-indigo-50 text-indigo-600";
      default:
        return "bg-slate-50 text-slate-500";
    }
  };

  const handleEdit = (session: ISession) => {
    setEditingSession(session);
    setFormData({
      session: session.session,
      startDate: session.startDate.split("T")[0], // Format for input
      endDate: session.endDate.split("T")[0],
      isCurrent: session.isCurrent,
      isActive: session.isActive,
    });
    setIsManageOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingSession(null);
    setFormData({
      session: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      isActive: false,
    });
    setIsManageOpen(true);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting Session...");
    try {
      await deleteSessionTrigger(id).unwrap();
      toast.success("Session deleted successfully!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete session", {
        id: toastId,
      });
    }
  };

  const filteredSessions = useMemo(() => {
    return sessions?.filter((session) => {
      const matchesSearch = session.session.includes(searchQuery);
      const status = getSessionStatus(session);
      const matchesStatus = statusFilter
        ? statusFilter === "All Statuses"
          ? true
          : status === statusFilter.toUpperCase()
        : true;
      return matchesSearch && matchesStatus;
    });
  }, [sessions, searchQuery, statusFilter]);

  const handleSave = async (data: SessionFormData) => {
    const toastId = toast.loading(
      editingSession ? "Updating Session..." : "Creating Session..."
    );
    try {
      if (editingSession) {
        // Editing an existing session
        await updateSessionTrigger({
          id: editingSession._id,
          data,
        }).unwrap();
        toast.success("Session successfully updated!", { id: toastId });
      } else {
        // Creating a new session

        // 1. If this new session should be current, unset all other current sessions
        if (data.isCurrent && sessions) {
          const currentSessions = sessions.filter((s) => s.isCurrent);

          for (const s of currentSessions) {
            await updateSessionTrigger({
              id: s._id,
              data: { isCurrent: false },
            }).unwrap();
          }
          toast.success("Previous current sessions updated!", { id: toastId });
        }

        // 2. Create ONE session
        await createSessionTrigger(data).unwrap();
        toast.success("Session successfully created!", { id: toastId });
      }

      setIsManageOpen(false);
    } catch (error: any) {
      const message = error?.data?.msg || error?.data?.message;
      toast.error(message || "Failed to save session");
    }
  };

  const sessionSatausoptions = [
    { value: "All Statuses", label: "All Statuses" },
    { value: "CURRENT", label: "Current" },
    { value: "UPCOMING", label: "Upcoming" },
    { value: "COMPLETED", label: "Completed" },
  ];

  return {
    sessionsData,
    isLoadingSessions,
    createSessionTrigger,
    isCreating,
    updateSessionTrigger,
    isUpdating,
    deleteSessionTrigger,
    isDeleting,
    sessions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    formData,
    setFormData,
    isManageOpen,
    setIsManageOpen,
    editingSession,
    setEditingSession,
    filteredSessions,
    sessionSatausoptions,
    handleEdit,
    handleOpenCreate,
    handleDelete,
    handleSave,
  };
}

//   const handleDelete = async (id: string) => {
//     const toastId = toast.loading("Deleting Session...");

//     try {
//       await deleteSessionTrigger(id).unwrap();

//       toast.success("Session successfully Deleted!", { id: toastId });
//     } catch (error: any) {
//       toast.error(error?.data?.message || "Failed to Delete Session", {
//         id: toastId,
//       });
//     }
//   };
