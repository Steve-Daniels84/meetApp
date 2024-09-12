import React from "react";
import { useState, useEffect } from "react";

const CitySearch = ({allLocations}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
      if (allLocations.length > 0) {
        setSuggestions(allLocations);
      }
    }, [JSON.stringify(allLocations)]);

    const handleInputchanged = (event) => {
      const value = event.target.value;
      const filteredLocations = allLocations ? allLocations.filter((location) => {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
      }) : [];
  
      setQuery(value);
      setSuggestions(filteredLocations);
    }

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
    }

    return (
      <div id="city-search">
        <input
            type="text"
            className="city"
            placeholder="Search for a city"
            value={query}
            onFocus={() => setShowSuggestions(true)}
            onChange={handleInputchanged}
        />
       {showSuggestions ?
        <ul className="suggestions" >
          {suggestions.map((suggestion) => {
            return <li key={suggestion} onClick={handleItemClicked}>{suggestion}</li>
          })}
          <li key='See all cities'>
            <b>See all cities</b>
          </li>
        </ul>
        : null
      }
      </div>
    )
  }

export default CitySearch;