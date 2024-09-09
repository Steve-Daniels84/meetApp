import React from 'react';
import { useState } from 'react';
import './App.css';
import EventList from './components/EventList';
import CitySearch from './components/city-search';
import NumberOfEvents from './components/NumberOfEvents';

const App = () => {
  const [currentNOE, setCurrentNOE] = useState(32);

  return (
    <div className="App">
      <CitySearch />
      <EventList />  
      <NumberOfEvents setCurrentNOE={setCurrentNOE}/>  
    </div>
  );
}

export default App;
