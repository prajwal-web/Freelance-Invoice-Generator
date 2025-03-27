import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/ToggleSlice";
import clientReducer from "./slices/ClientSlice";
import invoiceReducer from "./slices/InvoiceSlice";

const store = configureStore({
  reducer: {
    snack: snackbarReducer,
    clients: clientReducer,
    invoices: invoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export default store;
