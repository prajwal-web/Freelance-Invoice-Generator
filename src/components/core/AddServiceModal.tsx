import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { MenuItem, TextField, Tooltip } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import AddIcon from "@mui/icons-material/Add";
import AddPaymentModal from "./AddPaymentModal";
import { useState } from "react";
import { Formik, Form } from "formik";
import { ServiceSchema } from "../../validation/InvoiceValidationForm";

export default function AddServiceModal() {
  const currency = ["₹ (INR)", "$ (USD)", "€ (Euro)"];
  const clients = useAppSelector((state) => state.clients.clients);
  const [selectedClient, setSelectedClient] = React.useState("");
  const [showServiceFields, setShowServiceFields] = useState(false);
  const [serviceAdded, setServiceAdded] = useState(false);

  return (
    <>
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
            <MenuItem key={client.id} value={client.id}>
              {client.id}
            </MenuItem>
          ))}
        </TextField>

        <Typography variant="h5" mt={2} gutterBottom>
          Add Services
        </Typography>

        {!showServiceFields && !serviceAdded && (
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
              <AddIcon sx={{ fontSize: 50, color: "text.primary" }} />
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
              console.log("Service Details:", values);
              setShowServiceFields(false);
              setServiceAdded(true);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleReset,
              // setFieldValue,
            }) => (
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
                    InputLabelProps={{ shrink: true }}
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
        <AddPaymentModal />
      </Box>
    </>
  );
}
