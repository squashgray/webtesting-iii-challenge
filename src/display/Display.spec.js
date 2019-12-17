import React from "react";
import { render } from "@testing-library/react";
import Display from "./Display";
import "@testing-library/jest-dom/extend-expect"; // had to install this to use toHaveClass

test("should match snapshot", () => {
  const wrapper = render(<Display />);
  expect(wrapper.asFragment()).toMatchSnapshot();
});

test("displays if gate is open/unlocked", () => {
  const { getByText } = render(<Display />);

  const unlocked = getByText(/unlocked/i);
  const open = getByText(/open/i);

  expect(unlocked).toBeTruthy();
  expect(open).toBeTruthy();
});

test("displays if gate is closed/locked", () => {
  const { getByText } = render(<Display closed={true} locked={true} />);

  const locked = getByText(/locked/i);
  const closed = getByText(/closed/i);

  expect(locked).toBeTruthy();
  expect(closed).toBeTruthy();
});

test("when `locked` or `closed` use the `red-led` class ", () => {
  const { getByTestId } = render(<Display closed={true} locked={true} />);

  const locked = getByTestId(/locked/i);
  const closed = getByTestId(/doors/i);

  expect(locked).toHaveClass("led red-led");
  expect(closed).toHaveClass("led red-led");
});

test("when `unlocked` or `open` use the `green-led` class ", () => {
  const { getByTestId } = render(<Display closed={false} locked={false} />);

  const locked = getByTestId(/locked/i);
  const closed = getByTestId(/doors/i);

  expect(locked).toHaveClass("led green-led");
  expect(closed).toHaveClass("led green-led");
});
