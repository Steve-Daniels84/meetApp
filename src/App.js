import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import EventList from "./components/EventList";
import CitySearch from "./components/city-search";
import NumberOfEvents from "./components/NumberOfEvents";
import { extractLocations, getEvents } from "../src/api";
import "./App.css";
import { WarningAlert } from "./components/Alert";
import CityEventsChart from "./components/cities-event-chart";
import EventsGenreChart from "./components/event-genre-chart";

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(25);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [errorAlert, setErrorAlert] = useState("");
  const [infoAlert, setInfoAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = useCallback(async () => {
    const allEvents = await getEvents();
    const filteredEvents =
      currentCity === "See all cities"
        ? allEvents
        : allEvents.filter((event) => event.location === currentCity);
    const currentEvents = filteredEvents.slice(0, currentNOE);

    setEvents(currentEvents);
    setAllLocations(extractLocations(allEvents));
  }, [currentCity, currentNOE]);

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("Offline mode enabled");
    }

    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      <div className="alerts-container">
        {warningAlert && warningAlert.length > 0 ? (
          <WarningAlert text={warningAlert} />
        ) : null}
      </div>
      <div className="header">
        <CitySearch
          allLocations={allLocations}
          setCurrentCity={setCurrentCity}
          infoAlert={infoAlert}
          setInfoAlert={setInfoAlert}
        />
        <NumberOfEvents
          setCurrentNOE={setCurrentNOE}
          setErrorAlert={setErrorAlert}
          errorAlert={errorAlert}
        />
      </div>
      <div className="chart-container">
        <CityEventsChart allLocations={allLocations} events={events} />
        <EventsGenreChart events={events} />
      </div>
      <div className="body">
        <EventList events={events} />
      </div>
    </div>
  );
};

export default App;
