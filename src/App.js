import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/city-search';
import NumberOfEvents from './components/NumberOfEvents';
import {extractLocations,getEvents} from '../src/api';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(25);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [currentCity]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity}/>
      <NumberOfEvents setCurrentNOE={setCurrentNOE}/> 
      <EventList events={events}/>  
    </div>
  );
}

export default App;
