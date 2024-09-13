import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/city-search';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from '../src/api';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");


  const fetchData = useCallback(async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities"
      ? allEvents
      : allEvents.filter(event => event.location === currentCity);
    const currentEvents = filteredEvents.slice(0, currentNOE);

    setEvents(currentEvents);
    setAllLocations(extractLocations(allEvents));
  }, [currentCity, currentNOE]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">

      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <EventList events={events} />
    </div>
  );
}

export default App;