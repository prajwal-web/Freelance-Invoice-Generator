import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { RootState } from "../../redux/store";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Button, TextField } from "@mui/material";
import {
  modalSlice,
  setSnackbarMessage,
  snackbar,
} from "../../redux/slices/SnackbarSlice";
import { useNavigate } from "react-router";
import { addClient } from "../../redux/slices/ClientSlice";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state: RootState) => state.snack.modal);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");

  const newClient = {
    id,
    name,
    email,
    phone,
    address,
  };
  const handleSubmit = () => {
    console.log("Submitted Data:", { name, email, phone, address });
    dispatch(modalSlice(false));
    dispatch(addClient(newClient));
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setId("");
    dispatch(setSnackbarMessage("New clients are added..."));
    dispatch(snackbar(true));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography variant="h6" id="modal-modal-title">
          Add Client
        </Typography>

        <TextField
          label="ID"
          variant="standard"
          fullWidth
          sx={{ mt: 2 }}
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <TextField
          label="Name"
          variant="standard"
          fullWidth
          sx={{ mt: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label="Email"
          variant="standard"
          fullWidth
          sx={{ mt: 2 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Phone"
          variant="standard"
          fullWidth
          sx={{ mt: 2 }}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <TextField
          label="Address"
          variant="standard"
          fullWidth
          sx={{ mt: 2 }}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="text"
          color="inherit"
          sx={{ position: "absolute", top: 10, right: 4, fontSize: "1.5rem" }}
          onClick={() => onClose()}
        >
          X
        </Button>
      </Box>
    </Modal>
  );
};

export default BasicModal;
