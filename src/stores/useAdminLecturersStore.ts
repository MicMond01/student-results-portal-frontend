import type {
  IAdminLecturer,
  LecturerFilterState,
} from "@/screens/admin/lecturers/type";
import { create } from "zustand";

interface AdminLecturersState {
  // UI View
  view: "list" | "details";
  setView: (view: "list" | "details") => void;

  // Filters
  filters: LecturerFilterState;
  setFilters: (filters: Partial<LecturerFilterState>) => void;

  // Selected lecturer for details page
  selectedLecturer: IAdminLecturer | null;
  setSelectedLecturer: (lecturer: IAdminLecturer | null) => void;

  // Dialog states
  isManageOpen: boolean;
  setIsManageOpen: (open: boolean) => void;

  editingLecturer: IAdminLecturer | null;
  setEditingLecturer: (lecturer: IAdminLecturer | null) => void;

  // Actions (triggers for create/edit)
  openCreateDialog: () => void;
  openEditDialog: (lecturer: IAdminLecturer) => void;
  closeDialog: () => void;

  // For navigating into details
  viewDetails: (lecturer: IAdminLecturer) => void;

  // Reset back to list view
  resetToList: () => void;
}

export const useAdminLecturersStore = create<AdminLecturersState>((set) => ({
  // -------- STATES --------
  view: "list",

  filters: {
    query: "",
    department: "all",
  },

  selectedLecturer: null,

  isManageOpen: false,
  editingLecturer: null,

  // -------- ACTIONS --------

  setView: (view) => set({ view }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  setSelectedLecturer: (lecturer) => set({ selectedLecturer: lecturer }),

  setIsManageOpen: (open) => set({ isManageOpen: open }),

  setEditingLecturer: (lecturer) => set({ editingLecturer: lecturer }),

  // -------- DIALOG CONTROL --------

  openCreateDialog: () =>
    set({
      editingLecturer: null,
      isManageOpen: true,
    }),

  openEditDialog: (lecturer) =>
    set({
      editingLecturer: lecturer,
      isManageOpen: true,
    }),

  closeDialog: () =>
    set({
      isManageOpen: false,
    }),

  // -------- DETAILS PAGE --------

  viewDetails: (lecturer) =>
    set({
      selectedLecturer: lecturer,
      view: "details",
    }),

  resetToList: () =>
    set({
      view: "list",
      selectedLecturer: null,
    }),
}));
