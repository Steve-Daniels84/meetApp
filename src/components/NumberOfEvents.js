import React from "react";
import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert, errorAlert }) => {
  const [number, setNumber] = useState(25);

  const handleInputChanged = (e) => {
    let value = e.target.value;
      setErrorAlert(value);
      setNumber(value);
      setCurrentNOE(value);
    
  };

  return (
    <div>
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
    {errorAlert <= 0 ? "Enter a valid number" : null}
    </div>
  );
};

export default NumberOfEvents;