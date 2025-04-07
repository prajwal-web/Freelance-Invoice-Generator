import reducer, {
  snackbar,
  setSnackbarMessage,
  setSnackbarType,
  modalSlice,
  pdfModal,
  AppUIState,
} from "./redux/slices/ToggleSlice";

describe("ToggleSlice Reducers", () => {
  const initialState: AppUIState = {
    snackToggle: {
      snackbarMessage: "",
      snackBar: false,
      msgType: "success",
    },
    pdfModal: false,
    modal: false,
  };

  test("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknowns" })).toEqual(initialState);
  });
  test("should handle modalSlice action to set modal to true", () => {
    const action = modalSlice(true);
    const newState = reducer(initialState, action);
    expect(newState.modal).toBe(true);
  });
  test("should handle modalSlice action to set modal to false", () => {
    const action = modalSlice(false);
    const newState = reducer(initialState, action);
    expect(newState.modal).toBe(false);
  });
  test("should handle snackbar action to toggle snackBar", () => {
    const action = snackbar(true);
    const newState = reducer(initialState, action);
    expect(newState.snackToggle.snackBar).toBe(true);
  });
  test("should handle snackbar action to toggle snackBar to false", () => {
    const action = snackbar(false);
    const newState = reducer(initialState, action);
    expect(newState.snackToggle.snackBar).toBe(false);
  });
  test("should handle setSnackbarMessage action to update snackbarMessage", () => {
    const action = setSnackbarMessage("Test Message");
    const newState = reducer(initialState, action);
    expect(newState.snackToggle.snackbarMessage).toBe("Test Message");
  });
  test("should handle setSnackbarType action to update msgType to error", () => {
    const action = setSnackbarType("error");
    const newState = reducer(initialState, action);
    expect(newState.snackToggle.msgType).toBe("error");
  });
  test("should handle pdfModal action to set pdfModal to true", () => {
    const action = pdfModal(true);
    const newState = reducer(initialState, action);
    expect(newState.pdfModal).toBe(true);
  });
  test("should handle pdfModal action to set pdfModal to false", () => {
    const action = pdfModal(false);
    const newState = reducer(initialState, action);

    expect(newState.pdfModal).toBe(false);
  });
});
