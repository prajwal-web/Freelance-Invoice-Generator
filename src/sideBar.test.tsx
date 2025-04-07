import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";
import SideBar from "./components/core/SideBar";
import { modalSlice } from "./redux/slices/ToggleSlice";
import "@testing-library/jest-dom";

jest.mock("./redux/slices/ToggleSlice", () => ({
  modalSlice: jest.fn(),
}));

describe("SideBar Component", () => {
  test("should render Dashboard, Add Clients, and Create Invoice buttons", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Clients/i)).toBeInTheDocument();
    expect(screen.getByText(/Create Invoice/i)).toBeInTheDocument();
  });

  test("should navigate to dashboard when Dashboard button is clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Dashboard/i));

    expect(window.location.pathname).toBe("/");
  });

  test("should dispatch modalSlice(true) when Add Clients button is clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Add Clients/i));

    expect(modalSlice).toHaveBeenCalledWith(true);
  });

  test("should navigate to invoice page when Create Invoice button is clicked", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SideBar />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Create Invoice/i));

    expect(window.location.pathname).toBe("/invoice");
  });
});
