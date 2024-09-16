import React from "react";
import { useState, useEffect } from "react";

const CitySearch = ({ allLocations, setCurrentCity }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputchanged = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations
      ? allLocations.filter((location) => {
          return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        })
      : [];

    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    console.log(value)
    if (value === "See all cities") {
      setSuggestions(allLocations);
      setQuery(value);
      setShowSuggestions(false);
      setCurrentCity(value);
    } else {
      setQuery(value);
      setShowSuggestions(false);
      setCurrentCity(value);
    }
  };

  useEffect(() => {
    if (allLocations.length > 0) {
      setSuggestions(allLocations);
    }
  }, [allLocations]);

  return (
    <div id="city-search">
      <input
        type="text"
        id="city"
        className="city"
        placeholder="Search for a city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        onChange={handleInputchanged}
      />
      {showSuggestions ? (
        <div>
          <ul className="suggestions">
            {suggestions.map((suggestion) => {
              return (
                <li key={suggestion} onClick={handleItemClicked}>
                  {suggestion}
                </li>
              );
            })}
            <li key="See all cities" onClick={handleItemClicked}>
              See all cities
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default CitySearch;
