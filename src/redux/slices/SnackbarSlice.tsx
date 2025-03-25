/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CounterState {
  snackBar: boolean;
  snackbarMessage: string;
  modal: boolean;
}

const initialState: CounterState = {
  snackBar: false,
  snackbarMessage: "",
  modal: false,
};

export const SnackbarSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    snackbar: (state, action: PayloadAction<boolean>) => {
      state.snackBar = action.payload;
    },
    setSnackbarMessage: (state, action: PayloadAction<string>) => {
      state.snackbarMessage = action.payload;
    },
    modalSlice: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
  },
});

export const { snackbar, setSnackbarMessage, modalSlice } =
  SnackbarSlice.actions;
export const selectSnackBar = (state: RootState) => state.snack.snackBar;
export const selectSnackbarMessage = (state: RootState) =>
  state.snack.snackbarMessage;
export default SnackbarSlice.reducer;
