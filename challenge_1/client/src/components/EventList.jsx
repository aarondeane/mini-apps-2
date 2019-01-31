import React from 'react';
import Event from './Event.jsx';

const EventList = (props) => {
  const events = props.events;
  return (
    <div>
      {events.map((event, index) => 
        <Event key={index} id={index} event={event} handleSubmit={props.handleSubmit} />
      )}
    </div>
  )
}

export default EventList;