import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Service = {
  description: string;
  rate: number;
  time: string;
  currency: "$" | "₹";
};

type Payment = {
  isPaid: boolean;
  amountPaid: number;
  totalAmount: number;
  remaining: number;
};
type Invoice = {
  id?: string;
  clientId?: string;
  date?: string;
  services?: Service[];
  payment?: Payment;
};

const initialState: Invoice[] = [];

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoices: (state, action: PayloadAction<Invoice[]>) =>
      (state = action.payload),
  },
});

export const { addInvoices } = invoiceSlice.actions;

export const selectInvoices = (state: RootState) => state.invoices;

export default invoiceSlice.reducer;
