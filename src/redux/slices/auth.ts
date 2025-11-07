import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../query/auth";

export interface InitialState {
  user: AuthUser | null;
  token: string;
  nextStep: string | null;
}

const initialState: InitialState = {
  token: "",
  user: {
    id: "",
    identifier: "",
    accountStatus: "",
    name: "",
    role: "",
  },
  nextStep: null,
};

const authUserSlice = createSlice({
  name: "APP",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        token: string;
        user?: AuthUser | null;
        nextStep?: string;
      }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user ?? null;
      state.nextStep = action.payload.nextStep ?? null;
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    exitUser: (state) => {
      state.token = "";
      state.user = null;
      state.nextStep = null;
    },
  },
});

export const { setAuth, setUser, exitUser } = authUserSlice.actions;
export default authUserSlice.reducer;
