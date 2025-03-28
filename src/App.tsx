import { BrowserRouter } from "react-router";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./redux/store";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import SideBar from "./components/core/SideBar";
import CustomizedSnackbars from "./components/core/SnackBar";
import { AppTheme } from "./components/theme/AppTheme";
import LandingPage from "./components/pages/LandingPage";

const AppContent = () => {
  const themeMode = useSelector((state: RootState) => state.snack.themeMode);
  const theme = AppTheme(themeMode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomizedSnackbars />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box>
          <SideBar />
        </Box>
        <Box
          sx={{
            overflowX: "hidden",
            wordWrap: "break-word",
            backgroundColor: theme.palette.background.paper,
            flex: 1,
            padding: 2,
          }}
        >
          <LandingPage />
        </Box>
      </Box>
    </ThemeProvider>
  );
};
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
export default App;
