import { Box, Typography } from "@mui/material";
import { Link } from "react-router";
import AppRouter from "../../router/AppRouter";

const invoiceStyle: React.CSSProperties = {
  fontWeight: "bold",
  fontSize: "3rem",
  color: "white",
  textAlign: "center",
  marginTop: "20px",
  fontFamily: "'Poppins', sans-serif",
};

const xpertStyle: React.CSSProperties = {
  fontSize: "2rem",
  color: "rgba(56, 36, 143, 1)",
  position: "relative",
  top: "12px",
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
            borderRadius: "50%",
          }}
          alt="Logo"
          src="https://i.pinimg.com/originals/43/04/f4/4304f43275086daecc81676128b651f5.png"
        />
        <Typography
          variant="h2"
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            color: "#212121",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <span style={invoiceStyle}>Invoice</span>
          <span style={xpertStyle}>Xpert</span>
        </Typography>
      </Box>

      <AppRouter />
    </>
  );
};

export default LandingPage;
