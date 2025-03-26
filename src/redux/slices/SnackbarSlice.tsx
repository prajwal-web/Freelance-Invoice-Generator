/* eslint-disable react-refresh/only-export-components */
// src/redux/slices/SnackbarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface AppUIState {
  snackBar: boolean;
  snackbarMessage: string;
  modal: boolean;
  themeMode: "light" | "dark";
}

const initialState: AppUIState = {
  snackBar: false,
  snackbarMessage: "",
  modal: false,
  themeMode: "dark",
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
    toggleMode: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
  },
});

export const { snackbar, setSnackbarMessage, modalSlice, toggleMode } =
  SnackbarSlice.actions;

export const selectThemeMode = (state: RootState) => state.snack.themeMode;

export default SnackbarSlice.reducer;
