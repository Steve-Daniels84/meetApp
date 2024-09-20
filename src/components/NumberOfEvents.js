import React from "react";
import { useState } from "react";
import { ErrorAlert } from "./Alert";

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert, errorAlert }) => {
  const [number, setNumber] = useState(25);

  const handleInputChanged = (e) => {
    let value = e.target.value;

      if (value <= 0) {
        setErrorAlert("Please enter a sensible number!");
        setNumber(value);
        setCurrentNOE(value);
      } else {
        setErrorAlert("");
        setNumber(value);
        setCurrentNOE(value);
      }


  };

  return (
    <div>
    <div id="numberOfEvents">
      <label htmlFor="number-input" id="number">
        Number of Events:
        <input
          type="text"
          className="number"
          value={number}
          onChange={handleInputChanged}
          id="number-input"
        />
      </label>
    </div>
    <div className="alerts-container">
        {errorAlert && errorAlert.length > 0 ? (
          <ErrorAlert text={errorAlert} />
        ) : null}
      </div>
    </div>
  );
};

export default NumberOfEvents;