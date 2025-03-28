import * as Yup from "yup";
export const PaymentSchema = Yup.object().shape({
  totalAmount: Yup.number()
    .typeError("Total Amount must be a number")
    .required("Total Amount is required"),
  amountPaid: Yup.number()
    .typeError("Amount Paid must be a number")
    .required("Amount Paid is required")
    .max(Yup.ref("totalAmount"), "Amount Paid cannot exceed Total Amount"),
  remAmount: Yup.number()
    .typeError("Remaining Amount must be a number")
    .required("Remaining Amount is required"),
});
export const ServiceSchema = Yup.object().shape({
  service: Yup.string().required("Service is required"),
  rate: Yup.number()
    .typeError("Rate must be a number")
    .required("Rate is required"),
  currency: Yup.string().required("Currency is required"),
  date: Yup.date().required("Date is required"),
});
