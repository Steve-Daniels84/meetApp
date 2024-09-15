import React from "react";
import { render, waitFor } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

global.MutationObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  disconnect() {}
};

describe("<NumberOfEvents /> component", () => {
  test("has number of events", () => {
    const NumberOfEventsComponent = render(<NumberOfEvents />);
    waitFor(() => {
      expect(NumberOfEventsComponent.queryByRole("input")).toBeInTheDocument();
    });
  });
});