import Box from "@mui/material/Box";
import { Link } from "react-router";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddCardIcon from "@mui/icons-material/AddCard";
import { Button, Tooltip } from "@mui/material";
import BasicModal from "./BasicModal";
import { useDispatch } from "react-redux";
import { modalSlice, toggleMode } from "../../redux/slices/ToggleSlice";
// import { modalSlice } from "../../redux/slices/ToggleSlice";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ModeIcon from "@mui/icons-material/Mode";

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
            bgcolor: "background.default",
            height: "100%",
            paddingTop: 4,
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
                component={Link}
                to="/"
                variant="text"
                color="inherit"
                startIcon={<DashboardIcon />}
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                }}
              >
                DashBoard
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
                startIcon={<PersonAddIcon />}
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "text.primary",
                }}
                onClick={() => {
                  dispatch(modalSlice(true));
                }}
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
                component={Link}
                to="/invoice"
                variant="text"
                color="inherit"
                startIcon={<AddCardIcon />}
                sx={{
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                }}
              >
                Create Invoice
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
              <Tooltip title="change mode">
                <Button
                  variant="text"
                  color="inherit"
                  startIcon={<ModeIcon />}
                  sx={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "text.primary",
                  }}
                  onClick={() => {
                    dispatch(toggleMode());
                  }}
                >
                  Change Mode
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>
      </Box>
      <BasicModal onClose={handleCloseModal} />
    </>
  );
};

export default SideBar;
