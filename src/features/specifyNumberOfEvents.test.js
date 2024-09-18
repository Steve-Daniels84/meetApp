import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

let AppComponent;
let NumberOfEventsComponent;
let AppDOM;

defineFeature(feature, (test) => {

  beforeEach(() => {
    AppComponent = render(<App />);
    AppDOM = AppComponent.container.firstChild;
  });

  test("Show 25 events by default when no number is specified", ({
    given,
    when,
    then,
  }) => {
    given(
      "the user has not specified the number of events to display",
      () => {}
    );

    when("the user views the event list", () => {
    });

    then("25 events should be displayed by default", async () => {
      const EventListDom = AppDOM.querySelector("#event-list");

      waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(25);
      });
    });
  });

  test("User can change the number of events displayed", ({
    given,
    and,
    when,
    then,
  }) => {

    given("the user is on the event settings page", () => {
    });

    and("the number of events input is rendered", async () => {
      waitFor(() => {
        NumberOfEventsComponent = AppDOM.querySelector("#numberOfEvents");
        expect(NumberOfEventsComponent).toBeInTheDocument();
      })
    });

    when("the user specifies a number of events to display", async () => {
      const user = userEvent.setup();
      const numberInput = AppDOM.querySelector("#number-input");
      await user.type(numberInput, "{backspace}{backspace}10");
      expect(numberInput.value).toEqual("10")
    });

    then(
      "the event list should update to show the specified number of events",
      async () => {
        const eventsList = AppDOM.querySelector('#event-list');
        const events = eventsList.querySelectorAll('#event');

        expect(events.length).toEqual(10)
      });
  });
});
