import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Formik, Form } from "formik";
import { PaymentSchema } from "../../validation/InvoiceValidationForm";
import { useDispatch } from "react-redux";
import { addInvoice } from "../../redux/slices/InvoiceSlice";

export default function AddPaymentModal() {
  const [showPaymentFields, setShowPaymentFields] = useState(false);
  const [paymentAdded, setPaymentAdded] = useState(false);
  const dispatch = useDispatch();

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
            <AddIcon sx={{ fontSize: 50, color: "text.primary" }} />
          </Tooltip>
        </Box>
      )}

      {showPaymentFields && (
        <Formik
          initialValues={{
            totalAmount: "",
            amountPaid: "",
            remAmount: "",
          }}
          validationSchema={PaymentSchema}
          onSubmit={(values) => {
            const invoiceData = {
              payment: {
                totalAmount: Number(values.totalAmount),
                amountPaid: Number(values.amountPaid),
                remaining: Number(values.remAmount),
                isPaid: Number(values.remAmount) === 0,
              },
            };
            dispatch(addInvoice(invoiceData));
            setShowPaymentFields(false);
            setPaymentAdded(true);
            console.log(invoiceData);
          }}
        >
          {({ errors, touched, handleChange, handleReset, values }) => (
            <Form>
              <Box mt={2}>
                <TextField
                  label="Total Amount"
                  name="totalAmount"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={values.totalAmount}
                  onChange={handleChange}
                  error={touched.totalAmount && Boolean(errors.totalAmount)}
                  helperText={touched.totalAmount && errors.totalAmount}
                />
                <TextField
                  label="Amount Paid"
                  name="amountPaid"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={values.amountPaid}
                  onChange={handleChange}
                  error={touched.amountPaid && Boolean(errors.amountPaid)}
                  helperText={touched.amountPaid && errors.amountPaid}
                />
                <TextField
                  label="Remaining Amount"
                  name="remAmount"
                  variant="standard"
                  margin="normal"
                  fullWidth
                  sx={{ mt: 2 }}
                  value={values.remAmount}
                  onChange={handleChange}
                  error={touched.remAmount && Boolean(errors.remAmount)}
                  helperText={touched.remAmount && errors.remAmount}
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
    </>
  );
}
