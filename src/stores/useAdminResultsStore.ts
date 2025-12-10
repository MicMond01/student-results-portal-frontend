import type {
  GroupedStudentData,
  IStudentResult,
} from "@/screens/admin/results/student-results/types";
import { create } from "zustand";

// ============================================================================
// TYPES
// ============================================================================

interface ResultFormData {
  departmentId: string;
  studentId: string;
  matricNo: string;
  studentName: string;
  courseCode: string;
  courseTitle: string;
  courseId: string;
  unit: number;
  session: string;
  semester: "First" | "Second";
  ca: number;
  exam: number;
}

interface FilterState {
  search: string;
  department: string;
  level: string;
  session: string;
}

interface ModalState {
  isEditOpen: boolean;
  isCreateOpen: boolean;
  selectedResult: IStudentResult | null;
}

interface AdminResultsState {
  // ============================================================================
  // DATA STATE
  // ============================================================================
  data: GroupedStudentData[];
  isLoading: boolean;
  selectedStudentId: string | null;

  // ============================================================================
  // FILTER STATE
  // ============================================================================
  filters: FilterState;

  // ============================================================================
  // MODAL STATE
  // ============================================================================
  modals: ModalState;

  // ============================================================================
  // FORM STATE
  // ============================================================================
  resultForm: ResultFormData;
  isBulkUploadOpen: boolean;

  // ============================================================================
  // DATA ACTIONS
  // ============================================================================
  setData: (data: GroupedStudentData[]) => void;
  setIsLoading: (loading: boolean) => void;
  setSelectedStudentId: (id: string | null) => void;
  setIsBulkUploadOpen: (open: boolean) => void;

  // ============================================================================
  // FILTER ACTIONS (Combined Updates)
  // ============================================================================
  updateFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;

  // ============================================================================
  // MODAL ACTIONS (Combined Updates)
  // ============================================================================
  openCreateModal: (studentId?: string) => void;
  openEditModal: (result: IStudentResult) => void;
  closeModals: () => void;

  // ============================================================================
  // FORM ACTIONS (Combined Updates)
  // ============================================================================
  updateResultForm: (data: Partial<ResultFormData>) => void;
  resetResultForm: () => void;
  prefillEditForm: (result: IStudentResult) => void;
  setStudentForForm: (
    studentId: string,
    matricNo: string,
    name: string
  ) => void;
}

// ============================================================================
// DEFAULT VALUES
// ============================================================================

const DEFAULT_FILTERS: FilterState = {
  search: "",
  department: "",
  level: "",
  session: "",
};

const DEFAULT_MODAL_STATE: ModalState = {
  isEditOpen: false,
  isCreateOpen: false,
  selectedResult: null,
};

const DEFAULT_FORM_DATA: ResultFormData = {
  departmentId: "",
  studentId: "",
  matricNo: "",
  studentName: "",
  courseCode: "",
  courseTitle: "",
  courseId: "",
  unit: 3,
  session: "2024/2025",
  semester: "First",
  ca: 0,
  exam: 0,
};

// ============================================================================
// STORE IMPLEMENTATION
// ============================================================================

export const useAdminResultsStore = create<AdminResultsState>((set, get) => ({
  // ============================================================================
  // INITIAL STATE
  // ============================================================================
  data: [],
  isLoading: true,
  selectedStudentId: null,
  filters: DEFAULT_FILTERS,
  modals: DEFAULT_MODAL_STATE,
  resultForm: DEFAULT_FORM_DATA,
  isBulkUploadOpen: false,

  // ============================================================================
  // DATA ACTIONS
  // ============================================================================
  setData: (data) => set({ data }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setSelectedStudentId: (id) => set({ selectedStudentId: id }),

  // ============================================================================
  // FILTER ACTIONS
  // ============================================================================
  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  // ============================================================================
  // MODAL ACTIONS
  // ============================================================================
  setIsBulkUploadOpen: (open) => set({ isBulkUploadOpen: open }),

  openCreateModal: (studentId) => {
    const state = get();

    // If studentId provided, prefill student info
    if (studentId) {
      const student = state.data.find(
        (s) => s.student._id === studentId
      )?.student;
      if (student) {
        set({
          modals: { ...DEFAULT_MODAL_STATE, isCreateOpen: true },
          selectedStudentId: studentId,
          resultForm: {
            ...DEFAULT_FORM_DATA,
            departmentId: student.department._id,
            studentId: student._id,
            matricNo: student.matricNo,
            studentName: student.name,
          },
        });
        return;
      }
    }

    // Otherwise, open empty form
    set({
      modals: { ...DEFAULT_MODAL_STATE, isCreateOpen: true },
      resultForm: DEFAULT_FORM_DATA,
      selectedStudentId: null,
    });
  },

  openEditModal: (result) =>
    set((state) => ({
      modals: {
        ...state.modals,
        isEditOpen: true,
        selectedResult: result,
      },
      resultForm: {
        departmentId: result?.student?.department?._id,
        studentId: result.student._id,
        matricNo: result.student.matricNo,
        studentName: result.student.name,
        courseCode: result.course.code,
        courseTitle: result.course.title,
        courseId: result.course._id,
        unit: result.course.creditUnit,
        session: result.session,
        semester: result.semester as "First" | "Second",
        ca: result.ca,
        exam: result.exam,
      },
    })),

  closeModals: () =>
    set({
      modals: DEFAULT_MODAL_STATE,
      resultForm: DEFAULT_FORM_DATA,
      selectedStudentId: null,
    }),

  // ============================================================================
  // FORM ACTIONS
  // ============================================================================
  updateResultForm: (data) =>
    set((state) => ({
      resultForm: { ...state.resultForm, ...data },
    })),

  resetResultForm: () => set({ resultForm: DEFAULT_FORM_DATA }),

  prefillEditForm: (result) =>
    set({
      resultForm: {
        departmentId: result.student.department._id,
        studentId: result.student._id,
        matricNo: result.student.matricNo,
        studentName: result.student.name,
        courseCode: result.course.code,
        courseTitle: result.course.title,
        courseId: result.course._id,
        unit: result.course.creditUnit,
        session: result.session,
        semester: result.semester as "First" | "Second",
        ca: result.ca,
        exam: result.exam,
      },
    }),

  setStudentForForm: (studentId, matricNo, name) =>
    set((state) => ({
      resultForm: {
        ...state.resultForm,
        studentId,
        matricNo,
        studentName: name,
      },
    })),
}));

// ============================================================================
// SELECTORS (For better performance)
// ============================================================================

export const useFilteredResults = () => {
  const data = useAdminResultsStore((state) => state.data);
  const filters = useAdminResultsStore((state) => state.filters);

  return data.filter((item) => {
    const matchesSearch =
      item.student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.student.matricNo
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const matchesDept = filters.department
      ? item.student.department.name === filters.department
      : true;

    const matchesLevel = filters.level
      ? item.student?.level === Number(filters.level)
      : true;

    const matchesSession = filters.session
      ? item.results.some((r) => r.session === filters.session)
      : true;

    return matchesSearch && matchesDept && matchesLevel && matchesSession;
  });
};

export const useResultFormData = () =>
  useAdminResultsStore((state) => state.resultForm);

export const useModalState = () =>
  useAdminResultsStore((state) => state.modals);
