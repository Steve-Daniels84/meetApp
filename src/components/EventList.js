import React from "react";
import Event from "./Event";

const EventList = ({events, index}) => {
    return (
        <div id="eventsList">
        <ul className="event-list" id="event-list">
              {events? events.map(event => <Event key={event.id} event={event} />) : null}
        </ul>
        </div>
    );
  }
  
  export default EventList;