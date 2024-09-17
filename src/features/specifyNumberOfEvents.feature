Feature: Specify Number of Events
 Scenario: Show 25 events by default when no number is specified
  Given the user has not specified the number of events to display
  When the user views the event list
  Then 25 events should be displayed by default
 Scenario: User can change the number of events displayed
  Given the user is on the event settings page
  And the number of events input is rendered
  When the user specifies a number of events to display
  Then the event list should update to show the specified number of events