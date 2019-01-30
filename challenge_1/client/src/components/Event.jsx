import React from 'react';

const Event = (props) => {
  return (
    <div>
      <div className="date">Date: {props.event.date}</div>
      <div className="description">Description:{props.event.description}</div>
      <div className="lang">{props.event.lang}</div>
      <div className="category1">{props.event.category1}</div>
      <div className="category2">{props.event.category2}</div>
    </div>
  )
}

export default Event;