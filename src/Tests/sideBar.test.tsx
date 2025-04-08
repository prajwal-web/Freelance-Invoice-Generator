import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SideBar from "../components/core/SideBar";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import snackbarReducer from "../redux/slices/ToggleSlice";
import clientsReducer from "../redux/slices/ClientSlice";

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.pathname}</div>;
};

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      appUI: snackbarReducer,
      clients: clientsReducer,
    },
    preloadedState: {
      clients: {
        clients: [],
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={component} />
          <Route path="/invoice" element={<div>Invoices Page</div>} />
        </Routes>
        <LocationDisplay />
      </MemoryRouter>
    </Provider>
  );
};

describe("BasicSidebar Navigation", () => {
  test("navigates to /invoice when 'Create Invoice' link is clicked", () => {
    renderWithProviders(<SideBar />);
    const createInvoiceLink = screen.getByRole("link", {
      name: /create invoice/i,
    });
    fireEvent.click(createInvoiceLink);
    expect(screen.getByTestId("location-display")).toHaveTextContent(
      "/invoice"
    );
    expect(screen.getByText("Invoices Page")).toBeInTheDocument();
  });
  test("navigates to homePage when 'DashBoard' link is clicked", () => {
    renderWithProviders(<SideBar />);
    const dashBoardLink = screen.getByRole("link", {
      name: /dashBoard/i,
    });
    fireEvent.click(dashBoardLink);
    expect(screen.getByTestId("location-display")).toHaveTextContent("/");
    expect(screen.getByText("DashBoard")).toBeInTheDocument();
  });

  test("Add Clients button is in the document", () => {
    renderWithProviders(<SideBar />);

    const addClientButton = screen.getByRole("button", {
      name: /add clients/i,
    });
    expect(addClientButton).toBeInTheDocument();
  });

  test("Create Invoice link is in the document", () => {
    renderWithProviders(<SideBar />);

    const createInvoiceText = screen.getByText("Create Invoice");
    expect(createInvoiceText).toBeInTheDocument();
  });
});
