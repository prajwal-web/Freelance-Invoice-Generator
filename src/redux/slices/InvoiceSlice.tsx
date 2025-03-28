import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import invoiceData from "../../Mock_Data/InvoiceData.json";

type Service = {
  description: string;
  rate: number;
  time: string;
  currency: string;
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

export interface InvoiceState {
  invoice: Invoice[];
}

const initialState: InvoiceState = {
  invoice: invoiceData,
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoice = [...state.invoice, action.payload];
    },
  },
});

export const { addInvoice } = invoiceSlice.actions;

export const selectInvoices = (state: RootState) => state.invoices;
export const selectInvoiceList = (state: RootState) => state.invoices.invoice;

export default invoiceSlice.reducer;
