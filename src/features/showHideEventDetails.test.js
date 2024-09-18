import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideEventDetails.feature");

let AppComponent;
let EventListDOM;
let Events;
let AppDOM;

defineFeature(feature, (test) => {
  beforeEach(async () => {
    AppComponent = render(<App />);
    await waitFor(() => {
      AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector("#event-list");
      Events = within(EventListDOM).queryAllByRole("listitem");
      expect(Events.length).toBeGreaterThan(0);
    });
  });

  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the user is viewing the event list", () => {});

    when("the event list is displayed", () => {
      expect(EventListDOM).toBeVisible();
    });

    then("each event element should be collapsed by default", () => {
      const details = EventListDOM.querySelector(".details");
      expect(details).toEqual(null);
    });
  });

  test("User can expand an event to see details", ({ given, when, then }) => {
    let viewingEvent;
    let details;
    given("the user is viewing a collapsed event", () => {
      viewingEvent = Events[0];
      details = viewingEvent.querySelector(".details");
      expect(details).not.toBeInTheDocument();
    });

    when("the user clicks on the show event", async () => {
      const user = userEvent.setup();
      const button = viewingEvent.querySelector("button");

      await user.click(button);
    });

    then("the event should expand to show its details", async () => {
      details = viewingEvent.querySelector(".details");
      expect(details).toBeInTheDocument();
    });
  });

  test("User can collapse an event to hide details", ({
    given,
    when,
    then,
  }) => {
    let viewingEvent;
    let details;
    given("the user is viewing an expanded event", async () => {
      viewingEvent = Events[0];

      const user = userEvent.setup();
      const button = viewingEvent.querySelector("button");

      await user.click(button);

      details = viewingEvent.querySelector(".details");

      expect(details).toBeInTheDocument();
    });

    when("the user clicks on the event", async () => {
      const user = userEvent.setup();

      const button = viewingEvent.querySelector("button");

      await user.click(button);
    });

    then("the event should collapse to hide its details", async () => {
      details = viewingEvent.querySelector(".details");
      expect(details).not.toBeInTheDocument();
    });
  });
});
