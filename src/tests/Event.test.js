import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Event from "../components/Event";
import userEvent from "@testing-library/user-event";
import mockData from "../mock-data";

global.MutationObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  disconnect() {}
};

const formatDateTime = (dateTime, locale = "en-US") => {
  if (!dateTime) return "Date and time not available";

  const date = new Date(dateTime);

  const dateOptions = {
    weekday: "long", // e.g., 'Wednesday'
    day: "2-digit", // e.g., '20'
    month: "long", // e.g., 'May'
    year: "numeric", // e.g., '2020'
  };

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = date.toLocaleDateString(locale, dateOptions);
  const formattedTime = date.toLocaleTimeString(locale, timeOptions);

  return `${formattedDate} at ${formattedTime}`;
};

describe("<Event /> component", () => {
  let EventComponent;

  const event = mockData[0];

  beforeEach(() => {
    EventComponent = render(<Event event={event} />);
  });

  test("renders event location", () => {
    expect(EventComponent.queryByText(event.location)).toBeInTheDocument();
  });

  test("renders event start time", async () => {
    const formattedStartDateTime = formatDateTime(event.start?.dateTime);

    waitFor(() => {
      expect(
        EventComponent.queryByText(formattedStartDateTime)
      ).toBeInTheDocument();
    });
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
