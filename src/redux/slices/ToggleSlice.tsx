import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type MsgType = "success" | "error" | "info" | "warning";

export interface AppUIState {
  snackToggle: {
    snackBar: boolean;
    snackbarMessage: string;
    msgType: MsgType;
  };
  modal: boolean;
  pdfModal: boolean;
}

const initialState: AppUIState = {
  snackToggle: {
    snackbarMessage: "",
    snackBar: false,
    msgType: "success",
  },
  pdfModal: false,
  modal: false,
};

export const appUISlice = createSlice({
  name: "appUI",
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
    pdfModal: (state, action: PayloadAction<boolean>) => {
      state.pdfModal = action.payload;
    },
  },
});

export const {
  snackbar,
  setSnackbarMessage,
  modalSlice,
  setSnackbarType,
  pdfModal,
} = appUISlice.actions;

export default appUISlice.reducer;
