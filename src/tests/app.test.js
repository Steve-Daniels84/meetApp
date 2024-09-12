import React from "react";
import { render, fireEvent, within, waitFor } from "@testing-library/react";
import App from "../App";
import { getEvents } from "../api";

global.MutationObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  disconnect() {}
};

describe("<App /> component", () => {
  let AppDom;
  beforeEach(() => {
    AppDom = render(<App />).container.firstChild;
  });

  test("renders list of events", () => {
    expect(AppDom.querySelector("#event-list")).toBeInTheDocument();
  });

  test("render CitySearch", () => {
    expect(AppDom.querySelector("#city-search")).toBeInTheDocument();
  });
});

describe("<App /> Integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    const AppComponent = render(<App />);
    const AppDom = AppComponent.container.firstChild;

    const CitySearchDom = AppDom.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDom).queryByRole("textbox");

    fireEvent.focus(CitySearchInput);
    fireEvent.input(CitySearchInput, { target: { value: "Berlin" } });

    const berlinSuggestionItem = await within(CitySearchDom).findByText(
      "Berlin, Germany"
    );

    waitFor(() => {
      fireEvent.click(berlinSuggestionItem);
    });

    expect(berlinSuggestionItem).toBeInTheDocument;

    const EventListDom = AppDom.querySelector("#event-list");
    const allRenderedEventItems =
      within(EventListDom).queryAllByRole("listitem");

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
  });
});
