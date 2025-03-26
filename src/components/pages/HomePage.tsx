import { Box } from "@mui/material";
import ClientTable from "../core/ClientTable";
import InvoiceTable from "../core/InvoiceTable";
const HomePage = () => {
  return (
    <>
      <Box sx={{ marginTop: -2 }}>
        <ClientTable />
      </Box>
      <Box sx={{ marginTop: 1 }}>
        <InvoiceTable />
      </Box>
    </>
  );
};

export default HomePage;
