import * as React from "react";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppSelector } from "../../redux/hooks";
import { snackbar } from "../../redux/slices/ToggleSlice";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const msgType = useAppSelector((state) => state.appUI.snackToggle.msgType);
  const { snackBar, snackbarMessage } = useAppSelector(
    (state: RootState) => state.appUI.snackToggle
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
          variant="filled"
          color={msgType}
          sx={{ width: "100%", color: "text.primary" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
