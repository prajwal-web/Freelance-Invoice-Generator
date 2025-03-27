import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MenuItem, TextField, Tooltip } from "@mui/material";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { invoicePayModal } from "../../redux/slices/ToggleSlice";
import AddIcon from "@mui/icons-material/Add";
import AddPaymentModal from "./AddPaymentModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "59%",
  transform: "translate(-50%, -50%)",
  width: 650,
  //   bgcolor: "#FFFECE",
  bgcolor: "background.paper",
  color: "black",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddServiceModal() {
  const currency = ["EUR", "INR", "USD"];
  const clients = useAppSelector((state) => state.clients.clients);
  const isOpen = useAppSelector(
    (state) => state.snack.invoiceDetails.invoicePaymentModal
  );
  const [selectedClient, setSelectedClient] = React.useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(invoicePayModal(false));
  };

  return (
    <>
      <Box
        p={4}
        maxWidth={700}
        mx="auto"
        sx={{ borderRadius: 2, background: "backround.paper " }}
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
            <MenuItem
              key={client.id}
              value={client.id}
              sx={{ background: "#006d40" }}
            >
              {client.id}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="h6" mt={2} gutterBottom>
          Add Services
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "65px",
            border: "dashed 1px black",
            borderRadius: "20px",
          }}
        >
          <Button
            onClick={() => dispatch(invoicePayModal(true))}
            sx={{ mb: 2 }}
          >
            <Tooltip title="Add Services">
              <AddIcon sx={{ fontSize: 50 }} />
            </Tooltip>
          </Button>
        </Box>

        <Typography variant="h6" mt={2} gutterBottom>
          Add Payment
        </Typography>
        <AddPaymentModal />
      </Box>

      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" gutterBottom>
            Add Services
          </Typography>
          <TextField
            label="Service"
            name="service"
            variant="standard"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Rate"
            fullWidth
            name="rate"
            variant="standard"
            sx={{ mt: 2 }}
          />
          <Box
            sx={{ marginTop: 3, display: "flex", flexDirection: "row", gap: 6 }}
          >
            <TextField
              select
              sx={{ width: 200 }}
              label="Currency"
              name="currency"
            >
              {currency.map((cur, index) => (
                <MenuItem key={index} value={cur}>
                  {cur}
                </MenuItem>
              ))}
            </TextField>
            <TextField fullWidth type="date" name="date" sx={{ width: 300 }} />
          </Box>
          <Box mt={3} display="flex" gap={4} justifyContent="right">
            <Button
              onClick={() => dispatch(invoicePayModal(false))}
              color="error"
              variant="contained"
            >
              Cancel
            </Button>
            <Button variant="contained" color="success">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
