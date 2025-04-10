import { Box, Typography } from "@mui/material";
import { Link } from "react-router";
import AppRouter from "../../router/AppRouter";

const invoiceStyle: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "2.2rem",
  color: "black",
  textAlign: "center",
  marginTop: "20px",
  fontFamily: "'Poppins', sans-serif",
};

const xpertStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  color: "rgba(56, 36, 143, 1)",
  position: "relative",
  top: "14px",
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "600",
};
const xStyle: React.CSSProperties = {
  fontSize: "2.2rem",
  color: "rgba(56, 36, 143, 1)",
  position: "relative",
  top: "10px",
  fontFamily: "'Poppins', sans-serif",
  fontWeight: "600",
};

const LandingPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "30px",
          width: "100%",
          gap: 2,
          textDecoration: "none",
        }}
        component={Link}
        to="/"
      >
        <Box
          component="img"
          sx={{
            height: 60,
            width: 60,
          }}
          alt="Logo"
          src="https://i.pinimg.com/originals/43/04/f4/4304f43275086daecc81676128b651f5.png"
        />
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={invoiceStyle}>Invoice</span>
          <span style={xStyle}>X</span>
          <span style={xpertStyle}>pert</span>
        </Typography>
      </Box>

      <AppRouter />
    </>
  );
};

export default LandingPage;
