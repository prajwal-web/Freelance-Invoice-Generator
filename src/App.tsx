// import { Button } from "@mui/material";
// import { Link } from "react-router";
import { BrowserRouter } from "react-router";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <>
      {/* <Link to="/first">
        <Button variant="contained">click here</Button>
      </Link> */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
