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
      state.invoice.push(action.payload);
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
      // Find if an invoice for the client already exists
      let invoice = state.invoice.find(
        (inv) => inv.clientId === action.payload.clientId
      );
      console.log(invoice, "   found invoice");

      if (invoice) {
        // If an invoice is found, do nothing (no payment added)
        console.log("Invoice already exists, no new payment added.");
      } else {
        // If no invoice is found, create a new invoice with the payment
        invoice = {
          id: `inv-${Math.floor(Math.random() * 100)}`,
          clientId: action.payload.clientId,
          payment: action.payload.payment,
        };
        state.invoice.push(invoice);
        console.log("New invoice created and payment added.");
      }
    },
  },
});

export const { addInvoice, addService, addPayment } = invoiceSlice.actions;

export const selectInvoices = (state: RootState) => state.invoices;
export const selectInvoiceList = (state: RootState) => state.invoices.invoice;

export default invoiceSlice.reducer;
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";
// import invoiceData from "../../Mock_Data/InvoiceData.json";

// export type Service = {
//   description: string;
//   rate: number;
//   time: string;
//   currency: string;
// };

// type Payment = {
//   amountPaid: number;
//   totalAmount: number;
//   remaining: number;
//   taxRate: number;
//   taxAmount: number;
// };

// type Invoice = {
//   id: string;
//   clientId: string;
//   date?: string;
//   services?: Service[];
//   payment?: Payment;
// };

// export interface InvoiceState {
//   invoice: Invoice[];
// }

// const initialState: InvoiceState = {
//   invoice: invoiceData.map((inv: Invoice) => ({
//     ...inv,
//     services: Array.isArray(inv.services) ? inv.services : [],
//   })),
// };

// export const invoiceSlice = createSlice({
//   name: "invoices",
//   initialState,
//   reducers: {
//     addInvoice: (state, action: PayloadAction<Invoice>) => {
//       // Adding a new invoice, without mutating the state
//       state.invoice = [...state.invoice, action.payload];
//     },
//     addService: (
//       state,
//       action: PayloadAction<{ clientId: string; service: Service }>
//     ) => {
//       const { clientId, service } = action.payload;
//       // Update invoice array immutably
//       state.invoice = state.invoice.map((inv) =>
//         inv.clientId === clientId
//           ? {
//               ...inv,
//               services: inv.services ? [...inv.services, service] : [service],
//             }
//           : inv
//       );
//     },
//     addPayment: (
//       state,
//       action: PayloadAction<{ clientId: string; payment: Payment }>
//     ) => {
//       const { clientId, payment } = action.payload;
//       // Update invoice array immutably
//       state.invoice = state.invoice.map((inv) =>
//         inv.clientId === clientId ? { ...inv, payment } : inv
//       );
//     },
//   },
// });

// export const { addInvoice, addService, addPayment } = invoiceSlice.actions;

// export const selectInvoices = (state: RootState) => state.invoices;
// export const selectInvoiceList = (state: RootState) => state.invoices.invoice;

// export default invoiceSlice.reducer;
