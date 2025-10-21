import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface InitialState {
  token: string;
  time?: number;
  lockModal: boolean;
}
const initialState: InitialState = {
  token: "",
  lockModal: false,
};
const authUserSlice = createSlice({
  name: "APP",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.time = Date.now();
    },
    exitUser: (state) => {
      state.token = "";
      state.lockModal = false;
      state.time = undefined;
    },
    toggleLockModal: (state, action: PayloadAction<boolean>) => {
      state.lockModal = action.payload;
    },
  },
});

export const { setAuth, exitUser, toggleLockModal } = authUserSlice.actions;
export default authUserSlice.reducer;
