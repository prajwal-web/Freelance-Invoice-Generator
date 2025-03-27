import { BrowserRouter } from "react-router";
import AppRouter from "./router/AppRouter";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./redux/store";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import SideBar from "./components/core/SideBar";
import CustomizedSnackbars from "./components/core/SnackBar";
import { AppTheme } from "./components/theme/AppTheme";

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
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
            component={Link}
            to="/"
          >
            <Box
              component="img"
              sx={{
                height: 100,
                width: 100,
                borderRadius: "50%",
              }}
              alt="The house from the offer."
              src="https://th.bing.com/th/id/OIP.efhBSCiCBLDMMbjffcojpQHaGr?rs=1&pid=ImgDetMain"
            />
          </Box> */}

          <AppRouter />
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
