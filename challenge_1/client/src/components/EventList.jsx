import React from 'react';
import Event from './Event.jsx';

const EventList = (props) => {
  const events = props.events;
  return (
    <div>
      {events.map((event, index) => 
        <Event key={index} event={event} />
      )}
    </div>
  )
}

export default EventList;