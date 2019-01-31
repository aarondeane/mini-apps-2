import React from 'react';

const Search = (props) => (
    <form onSubmit={props.handleSubmit}>
    <label>
      Enter Search:
      <input type="text" onChange={props.handleChange} />
    </label>
    <input type="submit" id="search" value="Search" />
    </form>
  )

export default Search;