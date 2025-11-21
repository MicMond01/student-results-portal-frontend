import type { AdminCourse } from "@/screens/admin/courses/type";
import { create } from "zustand";

interface AdminCoursesState {
  selectedCourse: AdminCourse | null;
  editingCourse: AdminCourse | null;
  isDialogOpen: boolean;
  view: "list" | "details";

  //Actions
  setSelectedCourse: (course: AdminCourse | null) => void;
  setEditingCourse: (course: AdminCourse | null) => void;
  setIsDialogOpen: (open: boolean) => void;
  setView: (view: "list" | "details") => void;
  handleViewDetails: (course: AdminCourse) => void;
  handleReturnToList: (view: "list") => void;
  onCreateNew: () => void;
  handleEdit: (course: AdminCourse) => void;
}

export const useAdminCoursesStore = create<AdminCoursesState>((set) => ({
  //Initial State
  selectedCourse: null,
  editingCourse: null,
  isDialogOpen: false,
  view: "list",

  //Basic setters
  setSelectedCourse: (course) => set({ selectedCourse: course }),
  setEditingCourse: (course) => set({ editingCourse: course }),
  setIsDialogOpen: (open) => set({ isDialogOpen: open }),
  setView: (viewType) => set({ view: viewType }),

  //   Combine Actions

  handleViewDetails: (course: AdminCourse) =>
    set({ selectedCourse: course, view: "details" }),

  handleReturnToList: (view: "list") =>
    set({
      selectedCourse: null,
      view: view,
    }),

  onCreateNew: () =>
    set({
      editingCourse: null,
      isDialogOpen: true,
    }),

  handleEdit: (course: AdminCourse) =>
    set({
      editingCourse: course,
      isDialogOpen: true,
    }),
}));
