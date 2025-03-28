import { Box, Typography } from "@mui/material";
import { Link } from "react-router";
import AppRouter from "../../router/AppRouter";

const gradientStyle: React.CSSProperties = {
  background: "linear-gradient(270deg, #ff6a00, #ee0979, #ff6a00)",
  backgroundSize: "600% 600%",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "gradientMove 4s ease infinite",
  fontWeight: "bold",
  position: "relative",
  margin: "0 2px",
};

const dotStyle: React.CSSProperties = {
  position: "absolute",
  top: "-10px",
  left: "3px",
  fontSize: "1.2rem",
  color: "#ff1744",
  animation: "pulse 1.5s infinite",
};

const GradientLetter = ({
  letter,
  showDot = false,
}: {
  letter: string;
  showDot?: boolean;
}) => {
  return (
    <span style={gradientStyle}>
      {letter}
      {showDot && <span style={dotStyle}>•</span>}
    </span>
  );
};

const LandingPage = () => {
  return (
    <>
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0.6; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 30,
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
            height: 50,
            width: 50,
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
          }}
        >
          <GradientLetter letter="I" showDot />
          <GradientLetter letter="N" />
          <GradientLetter letter="V" />
          <GradientLetter letter="O" />
          <GradientLetter letter="I" showDot />
          <GradientLetter letter="C" />
          <GradientLetter letter="E" />
        </Typography>
      </Box>

      <AppRouter />
    </>
  );
};

export default LandingPage;
