import { useReducer } from "react";

export type LecturerExamsState = {
  selectedCourseId: string | null;
  isCreateExamOpen: boolean;
};

export type LecturerExamsAction =
  | { type: "SET_SELECTED_COURSE"; payload: string | null }
  | { type: "TOGGLE_CREATE_EXAM"; payload?: boolean }
  | { type: "RESET_STATE" };

const initialState: LecturerExamsState = {
  selectedCourseId: null,
  isCreateExamOpen: false,
};

function lecturerExamsReducer(
  state: LecturerExamsState,
  action: LecturerExamsAction
): LecturerExamsState {
  switch (action.type) {
    case "SET_SELECTED_COURSE":
      return { ...state, selectedCourseId: action.payload };

    case "TOGGLE_CREATE_EXAM":
      return {
        ...state,
        isCreateExamOpen:
          action.payload !== undefined
            ? action.payload
            : !state.isCreateExamOpen,
      };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
}

export function useLecturerExamsState() {
  const [state, dispatch] = useReducer(lecturerExamsReducer, initialState);

  // Action creators for better DX
  const actions = {
    setSelectedCourse: (courseId: string | null) => {
      dispatch({ type: "SET_SELECTED_COURSE", payload: courseId });
    },

    toggleCreateExam: (open?: boolean) => {
      dispatch({ type: "TOGGLE_CREATE_EXAM", payload: open });
    },

    resetState: () => {
      dispatch({ type: "RESET_STATE" });
    },
  };

  return { state, actions };
}
