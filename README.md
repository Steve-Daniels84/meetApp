# Meet App

Meet App is a mobile-friendly web application that provides users with a convenient way to discover and explore upcoming events. It allows users to filter events by city, view event details, specify the number of events displayed, and use the app offline. The app also includes features for adding a shortcut to the home screen and visualizing event data through charts.

## Features

1. **Filter Events By City**
   - Users can filter events based on the city they are interested in.
  
2. **Show/Hide Event Details**
   - Users can toggle the visibility of event details for each event in the list.

3. **Specify Number of Events**
   - Users can specify how many events they want to display on the screen.

4. **Use the App When Offline**
   - The app supports offline mode, allowing users to access cached data when they don't have an internet connection.

5. **Add an App Shortcut to the Home Screen**
   - Users can add the app as a shortcut to their device's home screen for quick access.

6. **Display Charts Visualizing Event Details**
   - The app displays charts to help users visualize the number of upcoming events in different cities.

## User Stories and Scenarios

### Feature 1: Filter Events By City

- **User Story 1**:  
  As a user, I should be able to filter events by city  
  So that I can find events happening in a specific location.

- **Scenario 1**: Show upcoming events from all cities when no city is searched

  Given the user has not searched for a city
  When the user views the event list
  Then the user should see upcoming events from all cities

- **Scenario 2**: Show a list of suggestions when the user searches for a city

  Given the user is on the event search page
  When the user starts typing in the city search bar
  Then the user should see a list of city suggestions
 
- **Scenario 3**: User can select a city from the suggested list

  Given the user has searched for a city
  And a list of city suggestions is displayed
  When the user selects a city from the list
  Then the user should see events filtered by the selected city

### Feature 2: Show/Hide Event Details

- **User Story 2**:
  As a user, I should be able to show or hide event details
  So that I can view the information that's most relevant to me.

- **Scenario 1**: An event element is collapsed by default

  Given the user is viewing the event list
  When the event list is displayed
  Then each event element should be collapsed by default

- **Scenario 2**: User can expand an event to see details

  Given the user is viewing a collapsed event
  When the user clicks on the event
  Then the event should expand to show its details

- **Scenario 3**: User can collapse an event to hide details
 
  Given the user is viewing an expanded event
  When the user clicks on the event
  Then the event should collapse to hide its details

### Feature 3: Specify Number of Events

- **User Story 3**:
  As a user, I should be able to specify the number of events to display
  So that I can manage the amount of information shown on the screen.

- **Scenario 1**: Show 32 events by default when no number is specified
  Given the user has not specified the number of events to display
  When the user views the event list
  Then 32 events should be displayed by default

- **Scenario 2**: User can change the number of events displayed
  Given the user is on the event settings page
  When the user specifies a number of events to display
  Then the event list should update to show the specified number of events

### Feature 4: Use the App When Offline

- **User Story 4**:
  As a user, I should be able to use the app when offline
  So that I can access event details even without an internet connection.

- **Scenario 1**: Show cached data when there’s no internet connection
Given the user has previously loaded event data

  And the user is offline
  When the user opens the app
  Then the app should display the cached event data

- **Scenario 2**: Show an error when the user changes search settings (city, number of events) while offline

  Given the user is offline
  When the user attempts to change the city or number of events settings
  Then the app should display an error message indicating no internet connection

### Feature 5: Add an App Shortcut to the Home Screen

- **User Story 5**:
  As a user, I should be able to add an app shortcut to the home screen
  So that I can quickly access the app.

- **Scenario 1**: User can install the app as a shortcut on their device home screen

  Given the user is using a compatible device
  When the user selects the option to add the app to the home screen
  Then the app should be added as a shortcut on the user's device home screen

### Feature 6: Display Charts Visualizing Event Details

- **User Story 6**:
  As a user, I should be able to view charts visualizing event details
  So that I can better understand the event data.

- **Scenario 1**: Show a chart with the number of upcoming events in each city

  Given the user is viewing the event details
  When the event details page is loaded
  Then a chart should be displayed showing the number of upcoming events in each city
