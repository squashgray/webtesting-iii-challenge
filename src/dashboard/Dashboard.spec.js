import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // for toBeInTheDocument to work
import Dashboard from "./Dashboard";

test("should match snapshot", () => {
  const wrapper = render(<Dashboard />);
  expect(wrapper.asFragment()).toMatchSnapshot(); // elements are rendering correctly //
});

test("defaults to unlocked and open", () => {
  const { getByText } = render(<Dashboard />);
  const unlocked = getByText(/unlocked/i);
  const open = getByText(/open/i);

  expect(unlocked).toBeInTheDocument();
  expect(open).toBeInTheDocument(); //finds unlocked and open on the dashboard //
});
