// src/theme/theme.ts
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
      background: {
        default: mode === "dark" ? "#1b2e2b" : "black",
        paper: mode === "dark" ? "#1a6767" : "#262626",
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
        fontSize: "1.5rem",
        fontFamily: "cursive",
        fontWeight: 700,
        letterSpacing: "3px",
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
