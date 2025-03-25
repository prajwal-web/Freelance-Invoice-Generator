import Box from "@mui/material/Box";
import { Link } from "react-router";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCardIcon from "@mui/icons-material/AddCard";
import { Button } from "@mui/material";
import BasicModal from "./BasicModal";
import { useDispatch } from "react-redux";
import { modalSlice } from "../../redux/slices/SnackbarSlice";

const SideBar = () => {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(modalSlice(false));
  };
  return (
    <>
      <Box
        sx={{ display: "flex", height: "100vh", backgroundColor: "#f7f7f7" }}
      >
        <Box
          sx={{
            width: 250,
            bgcolor: "#d6e2fa",
            // position: "fixed",
            height: "100%",
            paddingTop: 4,
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ padding: 2 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 3,
                padding: "10px 0",
                borderRadius: 2,
                cursor: "pointer",
              }}
            >
              <Button
                variant="text"
                color="inherit"
                startIcon={<PersonAddIcon />}
                sx={{ fontWeight: 500, fontSize: "1rem" }}
                onClick={() => dispatch(modalSlice(true))}
              >
                Add Clients
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 3,
                padding: "10px 0",
                borderRadius: 2,

                cursor: "pointer",
              }}
            >
              <Button
                variant="text"
                color="inherit"
                sx={{ fontWeight: 500 }}
                startIcon={<AddCardIcon />}
              >
                <Link
                  to="/invoice"
                  style={{
                    textDecoration: "none",
                    fontWeight: "500",
                    fontSize: "1rem",
                    color: "black",
                  }}
                >
                  Create Invoice
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <BasicModal onClose={handleCloseModal} />
    </>
  );
};

export default SideBar;
