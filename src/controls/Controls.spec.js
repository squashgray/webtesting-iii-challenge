import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import Controls from "./Controls";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

test("should match snapshot", () => {
  const wrapper = render(<Controls />);
  expect(wrapper.asFragment()).toMatchSnapshot();
});

test("buttons to toggle the closed and locked states work", () => {
  const { getByText } = render(<Controls />);

  const lockGateButton = getByText(/lock gate/i);
  const closeGateButton = getByText(/close gate/i);

  expect(lockGateButton).toBeTruthy();
  expect(closeGateButton).toBeTruthy(); // if open and unlocked (default values) correct text displays //
});

test("buttons to toggle the closed and locked states work part 2", () => {
  const { getByText } = render(<Controls locked={true} closed={true} />);

  const unlockGateButton = getByText(/unlock gate/i);
  const openGateButton = getByText(/open gate/i);

  expect(unlockGateButton).toBeTruthy();
  expect(openGateButton).toBeTruthy(); //if locked and closed correct text displays //
});

test("lock button works", () => {
  const { getByTestId } = render(<Controls />);

  const lockButton = getByTestId("lock");

  fireEvent.click(lockButton); //lock button is functional //
});

test("gate button works", () => {
  const { getByTestId } = render(<Controls />);

  const openButton = getByTestId("door");

  fireEvent.click(openButton); // gate button is functional //
});

test("the locked toggle button is disabled if the gate is open ", () => {
  const { getByTestId } = render(<Controls locked={false} closed={false} />);

  const lockButton = getByTestId("lock");

  fireEvent.click(lockButton);

  expect(lockButton.disabled).toBe(true); //if gate is open, lock is disabled, cannot be locked //
});

test("the closed toggle button is disabled if the gate is locked", () => {
  const { getByTestId } = render(<Controls locked={true} closed={true} />);

  const gateButton = getByTestId("door");

  fireEvent.click(gateButton);

  expect(gateButton.disabled).toBe(true); // if locked is true, gate will be disabled, cannot be opened //
});
