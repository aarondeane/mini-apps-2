import React from 'react';

const Event = (props) => (
  <div>
    <div className="event-date">Date:{props.event.date}</div>
    <div className="event-description">Description:{props.event.description}</div>
    <input type="button" name= "edit" id={props.id} value="Edit" onClick={props.handleSubmit} />
    <input type="button" name="save" id={props.id} value="Save" onClick={props.handleSubmit} />
  </div>
)

export default Event;
