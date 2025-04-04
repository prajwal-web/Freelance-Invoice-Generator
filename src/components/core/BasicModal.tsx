import { Box, Typography, Modal, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { RootState } from "../../redux/store";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  modalSlice,
  setSnackbarMessage,
  setSnackbarType,
  snackbar,
} from "../../redux/slices/ToggleSlice";
import { addClient } from "../../redux/slices/ClientSlice";
import { Formik, Form } from "formik";
import { ClientSchema } from "../../validation/ClientValidationForm";

const modalStyle = {
  position: "absolute",
  borderRadius: "5%",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector((state: RootState) => state.snack.modal);
  const clients = useAppSelector((state) => state.clients.clients);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h5" id="modal-modal-title">
          Add Client
        </Typography>

        <Formik
          initialValues={{
            id: "",
            name: "",
            email: "",
            phone: "",
            address: "",
          }}
          validationSchema={ClientSchema}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            const exists = clients.find(
              (client) =>
                client.id === values.id || client.email === values.email
            );
            if (exists) {
              dispatch(modalSlice(false));
              dispatch(setSnackbarType("error"));
              dispatch(
                setSnackbarMessage(
                  "Client with this ID or Email already exists!"
                )
              );
              dispatch(snackbar(true));
              resetForm();
              return;
            }
            dispatch(addClient(values));
            dispatch(modalSlice(false));
            dispatch(
              setSnackbarMessage(` Glad to have you with us, ${values.name}!`)
            );
            dispatch(snackbar(true));
            dispatch(setSnackbarType("success"));
            resetForm();
            setTimeout(() => {
              navigate("/");
            }, 1000);
          }}
        >
          {({ errors, touched, handleChange, values }) => (
            <Form>
              <TextField
                label="ID"
                name="id"
                variant="standard"
                fullWidth
                sx={{ mt: 2 }}
                value={values.id}
                onChange={handleChange}
                error={touched.id && Boolean(errors.id)}
                helperText={touched.id && errors.id}
              />

              <TextField
                label="Name"
                name="name"
                variant="standard"
                fullWidth
                sx={{ mt: 2 }}
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <TextField
                label="Email"
                name="email"
                variant="standard"
                fullWidth
                sx={{ mt: 2 }}
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                label="Phone"
                name="phone"
                variant="standard"
                fullWidth
                sx={{ mt: 2 }}
                value={values.phone}
                onChange={handleChange}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
              />

              <TextField
                label="Address"
                name="address"
                variant="standard"
                fullWidth
                sx={{ mt: 2 }}
                value={values.address}
                onChange={handleChange}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
              />

              <Button
                variant="contained"
                color="success"
                type="submit"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>

              <Button
                variant="text"
                color="inherit"
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 4,
                  fontSize: "1.5rem",
                }}
                onClick={onClose}
              >
                X
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default BasicModal;
