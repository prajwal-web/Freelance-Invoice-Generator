import { Box } from "@mui/material";
import ClientTable from "../core/ClientTable";
import InvoiceTable from "../core/InvoiceTable";
const HomePage = () => {
  return (
    <>
      <Box >
        <ClientTable />
      </Box>
      <Box sx={{ marginTop: 3}}>
        <InvoiceTable />
      </Box>
    </>
  );
};

export default HomePage;
