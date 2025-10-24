import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "../query/auth";

export interface InitialState {
  user: AuthUser | null;
  token: string;
}

const initialState: InitialState = {
  token: "",
  user: {
    name: "",
    role: "",
  },
};

const authUserSlice = createSlice({
  name: "APP",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{ token: string; user?: AuthUser | null }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user ?? null;
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    exitUser: (state) => {
      state.token = "";
      state.user = null;
    },
  },
});

export const { setAuth, setUser, exitUser } = authUserSlice.actions;
export default authUserSlice.reducer;
