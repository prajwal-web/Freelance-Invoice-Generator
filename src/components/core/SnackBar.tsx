// src/components/CustomizedSnackbars.tsx
import * as React from "react";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppSelector } from "../../redux/hooks";
import { snackbar } from "../../redux/slices/SnackbarSlice";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const { snackBar, snackbarMessage } = useAppSelector(
    (state: RootState) => state.snack
  );

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(snackbar(false));
  };

  return (
    <div>
      <Snackbar open={snackBar} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
