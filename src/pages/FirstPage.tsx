import { Button } from "@mui/material";
import { Link } from "react-router";

const FirstPage = () => {
  return (
    <>
      <h1 className="first">first</h1>
      <Link to="/second">
        <Button variant="contained">second</Button>
      </Link>
    </>
  );
};

export default FirstPage;
