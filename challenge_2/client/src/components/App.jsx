import React, { Component } from 'react';
import Chart from './Chart.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: 'BTC',
      chart: 'Line',
      data: [],
      height: 50,
      width: 180,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value,
    })
    
  }

  handleSubmit(event) {
    fetch(`/api/${this.state.symbol}`)
    .then(response => {
      return response.json()
    })
    .then(res => {
      console.log(res);
      res = JSON.parse(res);
      res = res.Data;
      
      this.setState({
        data: res
      })
      
    })
    .catch(err => console.error('Error: ', err));
  }

  componentDidMount() {
    fetch(`/api/${this.state.symbol}`)
    .then(response => {
      return response.json()
    })
    .then(res => {
      console.log(res);
      res = JSON.parse(res);
      res = res.Data;
      
      this.setState({
        data: res
      })

    })
    .catch(err => console.error('Error: ', err));
  }

  render() {
    return (
      <div>
        <h1>CryptoCrazy</h1>
        <label>Select Chart Type: 
          <select name="chart" value={this.state.chart} onChange={this.handleChange} >
            <option value="Line">Line</option>
            <option value="Bar">Bar</option>
            <option value="Candlestick">Candlestick</option>
          </select>
        </label>
        <label>Select Symbol: 
          <select name="symbol" value={this.state.symbol} onChange={this.handleChange} >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
          </select>
          <button type="submit" value="Submit" onClick={this.handleSubmit}>Submit</button>
        </label>
        <Chart state={this.state} />
      </div>
    )
  }
}

export default App;
