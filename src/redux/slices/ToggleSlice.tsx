/* eslint-disable react-refresh/only-export-components */
// src/redux/slices/SnackbarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type MsgType = "success" | "error" | "info" | "warning";

export interface AppUIState {
  snackToggle: {
    snackBar: boolean;
    snackbarMessage: string;
    msgType: MsgType;
  };
  modal: boolean;
  pdfModal: boolean;
  themeMode: "light" | "dark";
}

const initialState: AppUIState = {
  snackToggle: {
    snackbarMessage: "",
    snackBar: false,
    msgType: "success",
  },
  pdfModal: false,
  modal: false,
  themeMode: "dark",
};

export const ToggleSlice = createSlice({
  name: "snack",
  initialState,
  reducers: {
    snackbar: (state, action: PayloadAction<boolean>) => {
      state.snackToggle.snackBar = action.payload;
    },
    setSnackbarMessage: (state, action: PayloadAction<string>) => {
      state.snackToggle.snackbarMessage = action.payload;
    },
    setSnackbarType: (state, action: PayloadAction<MsgType>) => {
      state.snackToggle.msgType = action.payload;
    },
    modalSlice: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    toggleMode: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
    pdfModal: (state, action: PayloadAction<boolean>) => {
      state.pdfModal = action.payload;
    },
  },
});
export const {
  snackbar,
  setSnackbarMessage,
  modalSlice,
  toggleMode,
  setSnackbarType,
  pdfModal,
} = ToggleSlice.actions;

export const selectThemeMode = (state: RootState) => state.snack.themeMode;

export default ToggleSlice.reducer;
