/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Formik, Form } from "formik";
import { PaymentSchema } from "../../validation/InvoiceValidationForm";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useDispatch } from "react-redux";
import { addPayment } from "../../redux/slices/InvoiceSlice";

export default function Addpayment({
  setPaymentAdded,
  setPaymentData,
  selectedClient,
  servicesList,
}: any) {
  const dispatch = useDispatch();

  const [showPaymentFields, setShowPaymentFields] = useState(false);
  const [paymentAdded, setPaymentAddedState] = useState(false);
  const [paymentData, setPaymentDataState] = useState<any>(null);

  const handleEditPayment = () => {
    setPaymentAddedState(false);
    setShowPaymentFields(true);
  };

  const calculatedTotalAmount = servicesList?.reduce(
    (sum: number, service: any) => sum + Number(service.rate),
    0
  );

  return (
    <>
      {!showPaymentFields && !paymentAdded && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "65px",
            border: "dashed 1px black",
            borderRadius: "20px",
            cursor: "pointer",
          }}
          onClick={() => setShowPaymentFields(true)}
        >
          <Tooltip title="Add Payment">
            <AddIcon sx={{ fontSize: 30, color: "black" }} />
          </Tooltip>
        </Box>
      )}

      {showPaymentFields && !paymentAdded && (
        <Formik
          initialValues={{
            totalAmount: calculatedTotalAmount || "",
            amountPaid: paymentData?.amountPaid || "",
            remAmount: paymentData?.remAmount || "",
            taxRate: paymentData?.taxRate || 18,
          }}
          validationSchema={PaymentSchema}
          onSubmit={(values) => {
            const taxAmount =
              (Number(values.taxRate) / 100) * Number(values.totalAmount);
            const updatedRemainingAmount = Number(values.remAmount) + taxAmount;
            const invoiceData = {
              payment: {
                totalAmount: Number(values.totalAmount),
                amountPaid: Number(values.amountPaid),
                remaining: updatedRemainingAmount,
                taxRate: Number(values.taxRate),
                taxAmount: taxAmount,
              },
            };

            dispatch(
              addPayment({
                clientId: selectedClient,
                payment: invoiceData.payment,
              })
            );

            setPaymentAdded(true);
            setPaymentData(invoiceData.payment);
            setPaymentAddedState(true);
            setPaymentDataState(invoiceData.payment);
          }}
        >
          {({ errors, touched, handleChange, handleReset, values }) => (
            <Form>
              <Box mt={1}>
                <TextField
                  label="Total Amount"
                  name="totalAmount"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  sx={{
                    mt: 2,
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiInputBase-input": {
                      color: "black",
                    },
                  }}
                  value={values.totalAmount}
                  onChange={handleChange}
                  error={touched.totalAmount && Boolean(errors.totalAmount)}
                  helperText={
                    touched.totalAmount &&
                    typeof errors.totalAmount === "string"
                      ? errors.totalAmount
                      : ""
                  }
                />

                <TextField
                  label="Amount Paid"
                  name="amountPaid"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  sx={{
                    mt: 2,
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiInputBase-input": {
                      color: "black",
                    },
                  }}
                  value={values.amountPaid}
                  onChange={handleChange}
                  error={touched.amountPaid && Boolean(errors.amountPaid)}
                  helperText={
                    touched.amountPaid && typeof errors.amountPaid === "string"
                      ? errors.amountPaid
                      : ""
                  }
                />

                <TextField
                  label="Remaining Amount"
                  name="remAmount"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  sx={{
                    mt: 2,
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiInputBase-input": {
                      color: "black",
                    },
                  }}
                  value={values.remAmount}
                  onChange={handleChange}
                  error={touched.remAmount && Boolean(errors.remAmount)}
                  helperText={
                    touched.remAmount && typeof errors.remAmount === "string"
                      ? errors.remAmount
                      : ""
                  }
                />

                <TextField
                  label="Tax Rate (18%)"
                  name="taxRate"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  sx={{
                    mt: 2,
                    "& .MuiInputLabel-root": {
                      color: "black",
                    },
                    "& .MuiInputBase-input": {
                      color: "black",
                    },
                  }}
                  value={values.taxRate}
                  onChange={handleChange}
                  error={touched.taxRate && Boolean(errors.taxRate)}
                  helperText={
                    touched.taxRate && typeof errors.taxRate === "string"
                      ? errors.taxRate
                      : ""
                  }
                />

                <Box display="flex" gap={2} justifyContent="right" mt={3}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      handleReset();
                      setShowPaymentFields(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="success">
                    Save
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      )}

      {paymentAdded && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "65px",
            borderRadius: "20px",
            backgroundColor: "#dddddd",
            padding: "10px",
            textAlign: "center",
            border: "1px solid black",
          }}
        >
          <Typography variant="h6" sx={{ color: "green" }}>
            Payment Added Successfully!
          </Typography>
        </Box>
      )}

      {paymentAdded && (
        <Box sx={{ position: "relative", bottom: 90, left: 300 }}>
          <Box mt={3} display="flex" justifyContent="center">
            <Tooltip title="Edit Payment">
              <Button
                variant="text"
                sx={{ color: "black" }}
                onClick={handleEditPayment}
              >
                <EditNoteIcon />
              </Button>
            </Tooltip>
          </Box>
        </Box>
      )}
    </>
  );
}
