import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import EventList from './EventList.jsx';
import Search from './Search.jsx';
import $ from 'jquery';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
      pageCount: 0,
      currPage: 0,
      events: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  
  handleChange(event) {
    const value = event.target.value;
    this.setState({
      search: value,
    })
  }

  handlePageClick(page) {
    const newPage = page.selected;

    $.ajax({
      url: `/events/?q=${this.state.search}&_page=${newPage + 1}`,
      dataType: 'json',
      type: 'GET',

      success: data => {
        this.setState({
          events: data.slice(0, 10),
          currPage: newPage + 1,
        });
      },

      error: (xhr, status, err) => {
        console.error(status, err.toString());
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (event.target.name === 'save') {
      let data = {
        description: event.target.id,
      }
      console.log(data);
      fetch('/events', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => console.log('Great Success!', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
    } else if (event.target.name === 'edit') {
      console.log(event.target);
    } else {
      $.ajax({
        url: `/events/?q=${this.state.search}&_start=0&_page=${this.state.currPage}`,
        dataType: 'json',
        type: 'GET',
        success: (data, status, xhr) => {
          this.setState({
            events: data.slice(0, 10),
            pageCount: Number(xhr.getResponseHeader('X-Total-Count') / 10),
            currPage: 1,
          });
        },
  
        error: (xhr, status, err) => {
          console.error(status, err.toString());
        }
      })
    }    
  }


  render() {
    return (
      <div className="event-data">
        <Search handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        <EventList events={this.state.events} handleSubmit={this.handleSubmit} />
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          />
      </div>
    )
  }
}

export default App;
