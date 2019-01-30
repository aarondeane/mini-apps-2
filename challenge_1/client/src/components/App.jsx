import React from 'react';
import ReactPaginate from 'react-paginate';
import EventList from './EventList.jsx';
import Search from './Search.jsx';
import Pagination from './Pagination.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pageCount: 0,
      events: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({
      search: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    $.ajax({
      url: `/events/?q=${this.state.search}`,
      dataType: 'json',
      type: 'GET',

      success: data => {
        this.setState({
          events: data,
          pageCount: Math.ceil(data.length / 20),
        });
      },

      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    })
  }

  componentDidMount(){
    
  }


  render() {
    return (
      <div className="event-data">
        <Search handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <EventList events={this.state.events} />
      </div>
      )
  }

}

export default App;
