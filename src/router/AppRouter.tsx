import { Route, Routes } from "react-router";
import HomePage from "../components/pages/HomePage";
import InvoicePage from "../components/pages/InvoicePage";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
