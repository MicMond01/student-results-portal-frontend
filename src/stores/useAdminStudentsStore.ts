import type {
  IAdminStudent,
  IAdminStudentData,
} from "@/screens/admin/students/types";
import { create } from "zustand";

interface AdminStudentsState {
  selectedStudent: IAdminStudentData | null;
  editingStudent: IAdminStudent | null;
  isDialogOpen: boolean;
  view: "list" | "details";
  activeListDialog: "courses" | "results" | null;
  isBulkUploadOpen: boolean;

  //Actions
  setSelectedStudent: (student: IAdminStudentData | null) => void;
  setEditingStudent: (student: IAdminStudent | null) => void;
  setIsDialogOpen: (open: boolean) => void;
  setView: (view: "list" | "details") => void;
  setActiveListDialog: (activeListDialog: "courses" | "results" | null) => void;
  handleViewDetails: (student: IAdminStudentData) => void;
  handleReturnToList: (view: "list") => void;
  onCreateNew: () => void;
  handleEdit: (student: IAdminStudent) => void;
  closeDialog: () => void;
  setIsBulkUploadOpen: (open: boolean) => void;
  closeBulkDialog: () => void;
}

export const useAdminStudentsStore = create<AdminStudentsState>((set) => ({
  //Initial State
  selectedStudent: null,
  editingStudent: null,
  isDialogOpen: false,
  view: "list",
  activeListDialog: null,
  isBulkUploadOpen: false,

  //Basic setters
  setSelectedStudent: (student) => set({ selectedStudent: student }),
  setEditingStudent: (student) => set({ editingStudent: student }),
  setIsDialogOpen: (open) => set({ isDialogOpen: open }),
  setView: (viewType) => set({ view: viewType }),
  setActiveListDialog: (dialogType) => set({ activeListDialog: dialogType }),
  setIsBulkUploadOpen: (open) => set({ isBulkUploadOpen: open }),

  //   Combine Actions

  handleViewDetails: (student: IAdminStudentData) =>
    set({ selectedStudent: student, view: "details" }),

  handleReturnToList: (view: "list") =>
    set({
      selectedStudent: null,
      view: view,
    }),

  onCreateNew: () =>
    set({
      editingStudent: null,
      isDialogOpen: true,
    }),

  closeDialog: () =>
    set({
      isDialogOpen: false,
    }),

  handleEdit: (student: IAdminStudent) =>
    set({
      editingStudent: student,
      isDialogOpen: true,
    }),

  closeBulkDialog: () =>
    set({
      isBulkUploadOpen: false,
    }),
}));
