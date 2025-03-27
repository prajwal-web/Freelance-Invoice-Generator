import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useAppSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { invoiceServiceModal } from "../../redux/slices/ToggleSlice";
import { TextField, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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

export default function AddServicesModal() {
  const isOpen = useAppSelector(
    (state) => state.snack.invoiceDetails.invoiceServiceModal
  );
  const dispatch = useDispatch();
  const handleClose = () => dispatch(invoiceServiceModal(false));

  return (
    <div>
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
          onClick={() => dispatch(invoiceServiceModal(true))}
          sx={{ mb: 2 }}
        >
          <Tooltip title="Add Services">
            <AddIcon sx={{ fontSize: 50 }} />
          </Tooltip>
        </Button>
      </Box>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" gutterBottom>
            Add Payment
          </Typography>
          <TextField
            label="Total Amount"
            name="totAmt"
            variant="standard"
            margin="normal"
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            label="Amount Paid"
            fullWidth
            name="amntPaid"
            variant="standard"
            margin="normal"
            sx={{ mt: 2 }}
          />
          <TextField
            label="Remaining Amount"
            fullWidth
            name="remAmnt"
            variant="standard"
            margin="normal"
            sx={{ mt: 2 }}
          />
          <Button variant="contained" sx={{ marginTop: 4 }} color="success">
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
