import { Route, Routes } from "react-router";
import FirstPage from "../pages/FirstPage";
import SecondPage from "../pages/SecondPage";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<FirstPage />} />
        <Route path="/second" element={<SecondPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
