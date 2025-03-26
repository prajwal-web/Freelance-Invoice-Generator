import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import invoiceData from "../../Mock_Data/InvoiceData.json"
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

const initialState: Invoice[] =invoiceData ;

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoices: (_state, action: PayloadAction<Invoice[]>) => {
      return action.payload;
    },
  },
});

export const { addInvoices } = invoiceSlice.actions;
export const selectInvoices = (state: RootState) => state.invoices;

export default invoiceSlice.reducer;
