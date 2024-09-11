import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsComponent;
  let mockSetCurrentNOE;
  let mockSetErrorAlert;

  beforeEach(() => {
    mockSetCurrentNOE = jest.fn();
    mockSetErrorAlert = jest.fn();
    NumberOfEventsComponent = render(
      <NumberOfEvents setCurrentNOE={mockSetCurrentNOE} setErrorAlert={mockSetErrorAlert} />
    );
  });

  test("number of events has the role of textbox", () => {
    const input = NumberOfEventsComponent.queryByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test("ensures the default value of textbox is 32", () => {
    expect(NumberOfEventsComponent.getByRole("textbox")).toHaveValue("32");
  });

  test("textbox value changes according to what user types", () => {
    const numberOfEvents = NumberOfEventsComponent.getByRole("textbox");
    
    fireEvent.change(numberOfEvents, { target: { value: "10" } });
    
    expect(numberOfEvents).toHaveValue("10");
    expect(mockSetCurrentNOE).toHaveBeenCalledWith("10");
  });

  test("shows error message when invalid input is entered", () => {
    const numberOfEvents = NumberOfEventsComponent.getByRole("textbox");
    
    fireEvent.change(numberOfEvents, { target: { value: "abc" } });
    
    expect(mockSetErrorAlert).toHaveBeenCalledWith("Please enter a valid number");
  });

  test("clears error message when valid input is entered after an invalid one", () => {
    const numberOfEvents = NumberOfEventsComponent.getByRole("textbox");
    
    fireEvent.change(numberOfEvents, { target: { value: "abc" } });
    expect(mockSetErrorAlert).toHaveBeenCalledWith("Please enter a valid number");

    fireEvent.change(numberOfEvents, { target: { value: "20" } });
    expect(mockSetErrorAlert).toHaveBeenCalledWith(""); // Ensure error message is cleared
  });

  test("handles edge cases like large numbers and negative numbers", () => {
    const numberOfEvents = NumberOfEventsComponent.getByRole("textbox");
    
    fireEvent.change(numberOfEvents, { target: { value: "1000000" } });
    expect(numberOfEvents).toHaveValue("1000000");
    expect(mockSetCurrentNOE).toHaveBeenCalledWith("1000000");
    
    fireEvent.change(numberOfEvents, { target: { value: "-10" } });
    expect(numberOfEvents).toHaveValue("-10");
    expect(mockSetCurrentNOE).toHaveBeenCalledWith("-10");
  });
});