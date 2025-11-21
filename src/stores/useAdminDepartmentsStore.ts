// useAdminDepartmentsStore.ts
import type { IDepartment } from "@/screens/admin/type";
import { create } from "zustand";

interface AdminDepartmentState {
  searchQuery: string;
  view: "list" | "details";
  isManageOpen: boolean;

  selectedDeptId: string | null;
  editingDept: IDepartment | null;

  setSearchQuery: (query: string) => void;
  setView: (view: "list" | "details") => void;
  setSelectedDeptId: (id: string | null) => void;

  // Simple open/close without save function
  openManageDialog: (dept?: IDepartment | null) => void;
  closeManageDialog: () => void;

  viewDetails: (dept: IDepartment) => void;
  resetViewToList: () => void;
}

export const useAdminDepartmentStore = create<AdminDepartmentState>((set) => ({
  searchQuery: "",
  view: "list",
  isManageOpen: false,

  selectedDeptId: null,
  editingDept: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  setView: (view) => set({ view }),
  setSelectedDeptId: (id) => set({ selectedDeptId: id }),

  openManageDialog: (dept = null) =>
    set({
      editingDept: dept,
      isManageOpen: true,
    }),

  closeManageDialog: () =>
    set({
      isManageOpen: false,
      // Don't reset editingDept immediately to allow form to read it
    }),

  viewDetails: (dept) =>
    set({
      selectedDeptId: dept._id,
      view: "details",
    }),

  resetViewToList: () =>
    set({
      view: "list",
      selectedDeptId: null,
    }),
}));