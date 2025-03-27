/* eslint-disable react-refresh/only-export-components */
// src/redux/slices/SnackbarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface AppUIState {
  snackToggle: {
    snackBar: boolean;
    snackbarMessage: string;
    msgType: string;
  };
  modal: boolean;
  themeMode: "light" | "dark";
  invoiceDetails: {
    invoicePaymentModal: boolean;
    invoiceServiceModal: boolean;
  };
}

const initialState: AppUIState = {
  snackToggle: {
    snackbarMessage: "",
    snackBar: false,
    msgType: "",
  },
  modal: false,
  themeMode: "dark",
  invoiceDetails: {
    invoicePaymentModal: false,
    invoiceServiceModal: false,
  },
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
    setSnackbarType: (state, action: PayloadAction<string>) => {
      state.snackToggle.msgType = action.payload;
    },
    modalSlice: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload;
    },
    toggleMode: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
    invoicePayModal: (state, action: PayloadAction<boolean>) => {
      state.invoiceDetails.invoicePaymentModal = action.payload;
    },
    invoiceServiceModal: (state, action: PayloadAction<boolean>) => {
      state.invoiceDetails.invoiceServiceModal = action.payload;
    },
  },
});
export const {
  snackbar,
  setSnackbarMessage,
  modalSlice,
  toggleMode,
  setSnackbarType,
  invoicePayModal,
  invoiceServiceModal,
} = ToggleSlice.actions;

export const selectThemeMode = (state: RootState) => state.snack.themeMode;

export default ToggleSlice.reducer;
