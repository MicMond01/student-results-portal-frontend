// import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

// interface InitialState {
//   token: string;
// }
// const initialState: InitialState = {
//   token: "",
// };
// const authUserSlice = createSlice({
//   name: "APP",
//   initialState,
//   reducers: {
//     setAuth: (state, action: PayloadAction<string>) => {
//       state.token = action.payload;
//     },
//     exitUser: (state) => {
//       state.token = "";
//     },
//   },
// });

// export const { setAuth, exitUser } = authUserSlice.actions;
// export default authUserSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  role: "admin" | "student" | "lecturer";
  identifier: string;
}

interface InitialState {
  token: string;
  user: User | null;
  isLoading: boolean;
}

const initialState: InitialState = {
  token: "",
  user: null,
  isLoading: false,
};

const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    exitUser: (state) => {
      state.token = "";
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setAuth, setUser, setLoading, exitUser } = authUserSlice.actions;
export default authUserSlice.reducer;