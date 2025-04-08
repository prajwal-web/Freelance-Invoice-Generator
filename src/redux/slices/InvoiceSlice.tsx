import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import invoiceData from "../../Mock_Data/InvoiceData.json";

export type Service = {
  description: string;
  rate: number;
  time: string;
  currency: string;
};

type Payment = {
  amountPaid: number;
  totalAmount: number;
  remaining: number;
  taxAmount?: number;
  taxRate?: number;
};

type Invoice = {
  id: string;
  clientId: string;
  date?: string;
  services?: Service[];
  payment?: Payment;
};

export interface InvoiceState {
  invoice: Invoice[];
}

const initialState: InvoiceState = {
  invoice: invoiceData.map((inv: Invoice) => ({
    ...inv,
    services: Array.isArray(inv.services) ? inv.services : [],
  })),
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      const existingInvoice = state.invoice.find(
        (inv) => inv.clientId === action.payload.clientId
      );
      if (!existingInvoice) {
        // state.invoice.push(action.payload);
        state.invoice = [...state.invoice, action.payload];
      }
    },

    addService: (
      state,
      action: PayloadAction<{ clientId: string; service: Service }>
    ) => {
      const invoice = state.invoice.find(
        (inv) => inv.clientId === action.payload.clientId
      );
      if (invoice) {
        invoice.services = [
          ...(invoice.services || []),
          action.payload.service,
        ];
      }
    },

    addPayment: (
      state,
      action: PayloadAction<{ clientId: string; payment: Payment }>
    ) => {
      const invoice = state.invoice.find(
        (inv) => inv.clientId === action.payload.clientId
      );

      if (invoice) {
        invoice.payment = action.payload.payment;
      } else {
        const newInvoice: Invoice = {
          id: `inv${Math.floor(Math.random() * (100 - 4 + 1)) + 4}`,
          clientId: action.payload.clientId,
          payment: action.payload.payment,
          services: [],
        };
        state.invoice = [...state.invoice, newInvoice];
      }
    },
  },
});
export const { addInvoice, addService, addPayment } = invoiceSlice.actions;
export const selectInvoices = (state: RootState) => state.invoices;
export const selectInvoiceList = (state: RootState) => state.invoices.invoice;
export default invoiceSlice.reducer;
