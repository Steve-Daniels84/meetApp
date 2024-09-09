import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CitySearch from "../components/city-search";
import userEvent from "@testing-library/user-event";
import {extractLocations, getEvents} from "../api";
import { isCompositeComponentWithType } from "react-dom/test-utils";

global.MutationObserver = class {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {}
  disconnect() {}
};

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch />);
  });

  test("renders text input", () => {
    const cityTextBox = CitySearchComponent.getByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    const cityTextBox = CitySearchComponent.getByRole("textbox");

    fireEvent.focus(cityTextBox); // Use fireEvent to trigger focus

    const suggestionList = await CitySearchComponent.queryByRole("list");
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass("suggestions");
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    
    // Re-render CitySearch component with allLocations
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
  
    // Get city text box element
    const cityTextBox = CitySearchComponent.getByRole('textbox');
  
    // Simulate user focus and typing in the input box
    fireEvent.focus(cityTextBox);
    fireEvent.change(cityTextBox, { target: { value: "Berlin" } });
  
    // Filter the locations based on the typed query
    const suggestions = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }) : [];
  
    // Wait for the suggestion list to be in the document
    const suggestionList = await CitySearchComponent.findByRole('list');
    expect(suggestionList).toBeInTheDocument();
  
    // Get the list of suggestion items
    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    
    // Check if the correct number of list items are rendered
    expect(suggestionListItems).toHaveLength(suggestions.length + 1); // +1 for "See all cities"
    
    // Validate that suggestions are rendered correctly
    suggestions.forEach((suggestion, index) => {
      expect(suggestionListItems[index].textContent).toBe(suggestion);
    });
  
    // Check if "See all cities" is in the list
    expect(suggestionListItems[suggestions.length].textContent).toBe("See all cities");
  });

  test('renders the suggestion box content in the textbox upon clicking on a suggestion', async () => {
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);
  
    // Simulate user input in the textbox
    const cityTextBox = CitySearchComponent.getByRole('textbox');
    fireEvent.focus(cityTextBox);
    fireEvent.change(cityTextBox, { target: { value: "Berlin" } });
  
    // Wait for the suggestion list to be in the document
    const suggestionList = await CitySearchComponent.findByRole('list');
    expect(suggestionList).toBeInTheDocument();
  
    // Find and click the first suggestion
    const berlinSuggestion = await CitySearchComponent.findByText('Berlin, Germany'); // Assuming Berlin, Germany is a valid suggestion
    fireEvent.click(berlinSuggestion);
  
    // Assert that the input box value is updated with the suggestion's text
    expect(cityTextBox).toHaveValue(berlinSuggestion.textContent);
  });
});
