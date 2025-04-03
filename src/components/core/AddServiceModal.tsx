/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, TextField, Tooltip } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Formik, Form } from "formik";
import { ServiceSchema } from "../../validation/InvoiceValidationForm";
import AddPaymentModal from "./AddPaymentModal";
import {
  addInvoice,
  addPayment,
  addService,
  Service,
} from "../../redux/slices/InvoiceSlice";
import { useDispatch } from "react-redux";
import {
  setSnackbarMessage,
  setSnackbarType,
  snackbar,
} from "../../redux/slices/ToggleSlice";
import { useNavigate } from "react-router";

export default function AddServiceModal() {
  const navigate = useNavigate();
  const currency = ["₹ ", "$ ", "€"];
  const clients = useAppSelector((state) => state.clients.clients);

  const dispatch = useDispatch();

  const [selectedClient, setSelectedClient] = useState("");
  const [showServiceFields, setShowServiceFields] = useState(false);
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [paymentAdded, setPaymentAdded] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [taxes, setTaxes] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleSubmit = () => {
    if (servicesList.length === 0 && !paymentAdded) {
      dispatch(setSnackbarType("error"));
      dispatch(
        setSnackbarMessage(
          "You must add at least one service or payment before submitting."
        )
      );
      dispatch(snackbar(true));
      return;
    }
    servicesList.forEach((service) => {
      dispatch(addService({ clientId: selectedClient, service }));
    });
    if (paymentAdded) {
      dispatch(addPayment({ clientId: selectedClient, payment: paymentData }));
    }

    const totalServicesAmount = servicesList.reduce(
      (total, service) => total + service.rate,
      0
    );
    const taxesAmount = totalServicesAmount * 0.18;
    const total = totalServicesAmount + taxesAmount;

    const invoiceData = {
      clientId: selectedClient,
      totalAmount: total,
      services: servicesList,
      paymentStatus: paymentData ? paymentData.status : "Unpaid",
    };

    dispatch(addInvoice(invoiceData));

    setSubTotal(totalServicesAmount);
    setTaxes(taxesAmount);
    setTotalAmount(total);
    setPaymentAdded(false);
    setShowServiceFields(false);
    setPaymentData(null);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <Box
      p={4}
      maxWidth={700}
      mx="auto"
      sx={{ borderRadius: 2, background: "background.paper" }}
    >
      <Typography variant="h5" mb={2}>
        Create Invoice
      </Typography>

      <TextField
        fullWidth
        select
        label="Select Client"
        value={selectedClient}
        onChange={(e) => setSelectedClient(e.target.value)}
        sx={{ mb: 3 }}
      >
        {clients.map((client) => (
          <MenuItem key={client.email} value={client.email}>
            {client.email}
          </MenuItem>
        ))}
      </TextField>

      <Typography variant="h5" mt={2} gutterBottom>
        Add Services
      </Typography>

      {servicesList.map((service, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
            border: "1px solid black",
            height: "100px",
            borderRadius: 3,
            mb: 1,
            background: "#FFF085",
            color: "black",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography gutterBottom>{service.description}</Typography>
            <Typography gutterBottom sx={{ position: "relative", top: 20 }}>
              {service.currency} {service.rate}
            </Typography>
          </Box>
          <Typography sx={{ alignSelf: "flex-start", mt: 1 }} gutterBottom>
            {service.time}
          </Typography>
        </Box>
      ))}

      {!showServiceFields && servicesList.length > 0 && (
        <Button
          startIcon={<AddIcon />}
          onClick={() => setShowServiceFields(true)}
          sx={{
            mb: 2,
            right: "17%",
            background: "#FFF085",
            color: "black",
            position: "relative",
            ml: "93%",
            width: "150px",
            borderRadius: 3,
          }}
        >
          Add More
        </Button>
      )}

      {!showServiceFields && servicesList.length === 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "65px",
            border: "dashed 1px black",
            borderRadius: "20px",
            cursor: "pointer",
            mb: 2,
          }}
          onClick={() => setShowServiceFields(true)}
        >
          <Tooltip title="Add Services">
            <AddIcon sx={{ fontSize: 30, color: "text.primary" }} />
          </Tooltip>
        </Box>
      )}

      {showServiceFields && (
        <Formik
          initialValues={{
            service: "",
            rate: "",
            currency: "",
            date: "",
          }}
          validationSchema={ServiceSchema}
          onSubmit={(values) => {
            const newService: Service = {
              description: values.service,
              currency: values.currency,
              time: values.date,
              rate: Number(values.rate),
            };

            setServicesList([...servicesList, newService]);
            setShowServiceFields(false);
            dispatch(
              addService({ clientId: selectedClient, service: newService })
            );
          }}
        >
          {({ values, errors, touched, handleChange, handleReset }) => (
            <Form>
              <TextField
                label="Service"
                name="service"
                variant="standard"
                fullWidth
                sx={{ mt: 2 }}
                value={values.service}
                onChange={handleChange}
                error={touched.service && Boolean(errors.service)}
                helperText={touched.service && errors.service}
              />

              <TextField
                label="Rate"
                name="rate"
                fullWidth
                variant="standard"
                sx={{ mt: 2 }}
                value={values.rate}
                onChange={handleChange}
                error={touched.rate && Boolean(errors.rate)}
                helperText={touched.rate && errors.rate}
              />

              <Box
                sx={{
                  marginTop: 3,
                  display: "flex",
                  flexDirection: "row",
                  gap: 6,
                }}
              >
                <TextField
                  select
                  sx={{ width: 200 }}
                  label="Currency"
                  name="currency"
                  value={values.currency}
                  onChange={handleChange}
                  error={touched.currency && Boolean(errors.currency)}
                  helperText={touched.currency && errors.currency}
                >
                  {currency.map((cur, index) => (
                    <MenuItem key={index} value={cur}>
                      {cur}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="date"
                  name="date"
                  label="Date"
                  sx={{ width: 500 }}
                  value={values.date}
                  onChange={handleChange}
                  error={touched.date && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                />
              </Box>

              <Box mt={3} display="flex" gap={4} justifyContent="right">
                <Button
                  type="button"
                  color="error"
                  variant="contained"
                  onClick={() => {
                    handleReset();
                    setShowServiceFields(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}

      <Typography variant="h5" mt={4} gutterBottom>
        Add Payment
      </Typography>
      <AddPaymentModal
        setPaymentAdded={setPaymentAdded}
        setPaymentData={setPaymentData}
        selectedClient={selectedClient}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            mt={4}
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <span>Services:</span> <span>{subTotal}</span>
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <span>Taxes :</span> <span>{taxes}</span>
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
              borderTop: "1px solid black",
              paddingTop: "4px",
            }}
          >
            <span>Sub Total:</span> <span>{totalAmount}</span>
          </Typography>
        </Box>

        <Box>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
