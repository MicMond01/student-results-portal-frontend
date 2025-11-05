import { create } from "zustand";
import type { IExamCourse, IQuestion } from "@/types/exams";
import type { ILecturerCourse } from "@/types/lecturer";

interface LecturerExamsState {
  // Selection state
  selectedCourseId: string | null;

  // Dialog states
  isCreateExamOpen: boolean;
  isManageQuestionOpen: boolean;

  // Question management
  editingQuestion: IQuestion | null;
  addingToExamId: string | null;

  // Actions
  setSelectedCourseId: (id: string | null) => void;
  setIsCreateExamOpen: (open: boolean) => void;
  setIsManageQuestionOpen: (open: boolean) => void;
  setEditingQuestion: (question: IQuestion | null) => void;
  setAddingToExamId: (examId: string | null) => void;

  // Combined actions
  openCreateExam: () => void;
  closeCreateExam: () => void;
  openAddQuestion: (examId: string) => void;
  openEditQuestion: (examId: string, question: IQuestion) => void;
  closeQuestionDialog: () => void;
  resetState: () => void;
}

export const useLecturerExamsStore = create<LecturerExamsState>((set) => ({
  // Initial state
  selectedCourseId: null,
  isCreateExamOpen: false,
  isManageQuestionOpen: false,
  editingQuestion: null,
  addingToExamId: null,

  // Basic setters
  setSelectedCourseId: (id) => set({ selectedCourseId: id }),
  setIsCreateExamOpen: (open) => set({ isCreateExamOpen: open }),
  setIsManageQuestionOpen: (open) => set({ isManageQuestionOpen: open }),
  setEditingQuestion: (question) => set({ editingQuestion: question }),
  setAddingToExamId: (examId) => set({ addingToExamId: examId }),

  // Combined actions
  openCreateExam: () => set({ isCreateExamOpen: true }),
  closeCreateExam: () => set({ isCreateExamOpen: false }),

  openAddQuestion: (examId) =>
    set({
      addingToExamId: examId,
      editingQuestion: null,
      isManageQuestionOpen: true,
    }),

  openEditQuestion: (examId, question) =>
    set({
      addingToExamId: examId,
      editingQuestion: question,
      isManageQuestionOpen: true,
    }),

  closeQuestionDialog: () =>
    set({
      isManageQuestionOpen: false,
      editingQuestion: null,
      addingToExamId: null,
    }),

  resetState: () =>
    set({
      selectedCourseId: null,
      isCreateExamOpen: false,
      isManageQuestionOpen: false,
      editingQuestion: null,
      addingToExamId: null,
    }),
}));
