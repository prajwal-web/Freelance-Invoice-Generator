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
  invoice: invoiceData || [],
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoice = [...state.invoice, action.payload];
    },
    updateInvoice: (state, action: PayloadAction<Invoice>) => {
      const index = state.invoice.findIndex(
        (inv) => inv.id === action.payload.id
      );
      if (index !== -1) {
        state.invoice[index] = action.payload;
      }
    },
  },
});

export const { addInvoice, updateInvoice } = invoiceSlice.actions;

export const selectInvoices = (state: RootState) => state.invoices;
export const selectInvoiceList = (state: RootState) => state.invoices.invoice;

export default invoiceSlice.reducer;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "../AppStrore";

// type Service = {
//   description: string;
//   rate: number;
//   time: string;
//   currency: string;
// };

// type TPayLoad = {
//   id: string;
//   services: Service[];
// };

// type Payment = {
//   isPaid: boolean;
//   amountPaid: number;
//   totalAmount: number;
//   remaining: number;
// };

// type TAddPayment = {
//   id: string;
//   valDispatch: Payment;
// };

// type Invoice = {
//   id?: string;
//   clientId?: string;
//   date?: string;
//   payment?: Payment;
//   services?: Service[];
// };

// const initialState: Invoice[] | [] = [];

// export const invoiceSlice = createSlice({
//   name: "invoices",
//   initialState,
//   reducers: {
//     addInvoices: (state, action: PayloadAction<Invoice[]>) => {
//       return (state = [...action.payload]);
//     },

//     addNewInvoice: (state, action: PayloadAction<Invoice[]>) => {
//       return (state = [...state, ...action.payload]);
//     },

//     addNewService: (state, action: PayloadAction<TPayLoad>) => {
//       state.map((invoice) => {
//         if (invoice.clientId === action.payload.id) {
//           invoice.services = [...invoice.services, ...action.payload.services];
//         }
//       });
//     },

//     addAmount: (state, action: PayloadAction<TAddPayment>) => {
//       state.map((invoice) => {
//         if (invoice.clientId === action.payload.id) {
//           invoice.payment = action.payload.valDispatch;
//         }
//       });
//     },
//   },
// });

// export const { addInvoices, addNewService, addNewInvoice, addAmount } =
//   invoiceSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
// export const selectInvoices = (state: RootState) => state.invoices;

// export default invoiceSlice.reducer;
