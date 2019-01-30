import React from 'react';

const Event = (props) => {
  return (
    <div>
      <div className="date">Date: {props.event.date}</div>
      <div className="description">Description:{props.event.description}</div>
    </div>
  )
}

export default Event;