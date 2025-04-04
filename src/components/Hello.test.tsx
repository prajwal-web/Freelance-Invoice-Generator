import Hello from "./Hello";
import { render, screen } from "@testing-library/react";

test("renders Hello Dev", () => {
  render(<Hello />);
  const myElement = screen.getByText("Hello Dev");
  expect(myElement).toBeInTheDocument();
});
