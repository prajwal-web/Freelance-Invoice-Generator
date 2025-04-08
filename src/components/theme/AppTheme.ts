import { createTheme, Theme } from "@mui/material/styles";

export const AppTheme = (mode: "light" | "dark"): Theme =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#8e2bd9",
      },
      secondary: {
        main: "#77d92b",
      },
      // background: {
      //   default: mode === "dark" ? "#1b2e2b" : "#1b2e2b",
      //   paper: mode === "dark" ? "#1a6767" : "#1a6767",
      // },
      // #c8c8c8
      background: {
        default: mode === "dark" ? "#fff" : "#dddddd",
        paper: mode === "dark" ? "#fff" : "#fff",
      },
      text: {
        primary: mode === "dark" ? "#fff" : "#fff",
        secondary: mode === "dark" ? "#fff" : "#fff",
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
      h1: {
        fontSize: "4rem",
        fontWeight: 400,
        letterSpacing: "-0.5px",
      },
      h5: {
        marginTop: "5px",
        fontSize: "1.8rem",
        fontWeight: 700,
        letterSpacing: "2px",
        fontFamily: "bold",
      },
      h2: {
        fontSize: "2rem",
        fontFamily: "cursive",
        fontWeight: 600,
      },
      body1: {
        fontSize: "1rem",
        fontWeight: 400,
      },
      button: {
        fontSize: "1rem",
        fontWeight: 600,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
