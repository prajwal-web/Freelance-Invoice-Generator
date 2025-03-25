import { BrowserRouter } from "react-router";
import AppRouter from "./router/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
import { Box, CssBaseline } from "@mui/material";
import SideBar from "./components/core/SideBar";
import CustomizedSnackbars from "./components/core/SnackBar";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <CssBaseline />
          <CustomizedSnackbars />
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              display: "flex",
              gap: 3,
            }}
          >
            <Box>
              <SideBar />
            </Box>
            <Box sx={{ overflowX: "hidden", wordWrap: "break-word" }}>
              <AppRouter />
            </Box>
          </Box>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
