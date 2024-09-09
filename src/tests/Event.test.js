import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import mockData from "../mock-data";

describe("<Event /> component", () => {
  let EventComponent;

  const event = mockData[0];

  beforeEach(() => {
    EventComponent = render(<Event event={event} />);
  });

  test("renders event location", () => {
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
  });

  test("renders event start time", () => {
    expect(
      EventComponent.queryByText(event.start?.dateTime)
    ).toBeInTheDocument();
  });

  test("renders event title", () => {
    expect(EventComponent.queryByText(event.summary)).toBeInTheDocument();
  });

  test("renders event show details button", () => {
    expect(EventComponent.queryByText("Show details")).toBeInTheDocument();
  });

  test("event details are hidden by default", () => {
    const eventDetails = EventComponent.container.querySelector(".details");
    expect(eventDetails).not.toBeInTheDocument();
  });

  test("renders event details when user clicks on show details button", async () => {
    const user = userEvent.setup();
    const button = EventComponent.queryByText("Show details");

    fireEvent.click(button);
    const details = EventComponent.container.querySelector(".details");
    expect(details).toBeInTheDocument();
  });

  test("hides event details when user clicks on hide details button", async () => {
    const user = userEvent.setup();
    let button = EventComponent.queryByText("Show details");
    fireEvent.click(button);
    let details = EventComponent.container.querySelector(".details");
    expect(details).toBeInTheDocument();

    button = EventComponent.queryByText("Hide details");
    fireEvent.click(button);
    details = EventComponent.container.querySelector(".details");
    expect(details).not.toBeInTheDocument();
  });
});
