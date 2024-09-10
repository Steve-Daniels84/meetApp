import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/city-search';
import NumberOfEvents from './components/NumberOfEvents';
import {extractLocations,getEvents} from '../src/api';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
      <CitySearch allLocations={allLocations}/>
      <NumberOfEvents setCurrentNOE={setCurrentNOE}/> 
      <EventList events={events}/>  
    </div>
  );
}

export default App;
