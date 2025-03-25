import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/SnackbarSlice";
import clientReducer from "./slices/ClientSlice";

const store = configureStore({
  reducer: {
    snack: snackbarReducer,
    clients: clientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
