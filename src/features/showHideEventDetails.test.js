import { loadFeature, defineFeature } from "jest-cucumber";
import { render, within, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideEventDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    given("the user is viewing the event list", () => {});

    when("the event list is displayed", () => {});

    then("each event element should be collapsed by default", async () => {});
  });

  test("User can expand an event to see details", ({ given, when, then }) => {
    given("the user is viewing a collapsed event", async () => {});

    when("the user clicks on the event", async () => {});

    then("the event should expand to show its details", async () => {});
  });

  test("User can collapse an event to hide details", ({
    given,
    when,
    then,
  }) => {
    given("the user is viewing an expanded event", async () => {});

    when("the user clicks on the event", async () => {});

    then("the event should collapse to hide its details", async () => {});
  });
});
