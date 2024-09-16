import React from "react";
import { useState } from "react";

// Utility function to format a dateTime string, with optional custom formatting
const formatDateTime = (
  dateTime,
  locale = "en-US",
  options = { dateStyle: "medium", timeStyle: "short" }
) => {
  if (!dateTime) return "Date and time not available";

  // Format the date and time with optional locale and options
  return new Date(dateTime).toLocaleString(locale, options);
};

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const formattedStartDateTime = formatDateTime(
    event.start?.dateTime,
    "en-GB",
    { dateStyle: "full", timeStyle: "short" }
  );
  const formattedEndDateTime = formatDateTime(event.end?.dateTime); // default format

  return (
    <li className="event" id="event">
      <div className="event-container">
        <div className="summary-container">
          <h3>{event.summary}</h3>
          <p>{event.location}</p>
        </div>
        <div className="date-container">
          <p>Start: {formattedStartDateTime}</p>
          <p>End: {formattedEndDateTime}</p>
        </div>

        <div className="button-container">
          <button
            className="button"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? "Hide details" : "Show details"}
          </button>
        </div>
      </div>
      {showDetails ? <p className="details">{event.description}</p> : <></>}
    </li>
  );
};

export default Event;
