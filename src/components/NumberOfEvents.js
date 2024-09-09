import React from "react";
import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(32);

  const handleInputChanged = (e) => {
    let value = e.target.value;
    if (isNaN(value) || value.length <= 0) {
      setErrorAlert("Please enter a valid number");
    } else {
      setErrorAlert(""); // Clear error message if input is valid
      setNumber(value);
      setCurrentNOE(value);
    }
  };

  return (
    <div id="numberOfEvents">
      <label htmlFor="number" id="number">
        Number of Events:
        <input
          type="text"
          className="number"
          value={number}
          onChange={handleInputChanged}
        />
      </label>
    </div>
  );
};

export default NumberOfEvents;