Feature: Show Hide Event Details
 Scenario: An event element is collapsed by default
  Given the user is viewing the event list
  When the event list is displayed
  Then each event element should be collapsed by default
 Scenario: User can expand an event to see details
  Given the user is viewing a collapsed event
  When the user clicks on the show event
  Then the event should expand to show its details
 Scenario: User can collapse an event to hide details
  Given the user is viewing an expanded event
  When the user clicks on the event
  Then the event should collapse to hide its details