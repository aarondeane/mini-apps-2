import React, { Component } from 'react';
import { Line, Bar } from 'react-chartjs-2';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'Line',
      data: {},
      options: {},
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  componentDidMount() {
    fetch('/bitcoin')
    .then(response => {
      return response.json()
    })
    .then(data => {
      data = JSON.parse(data).bpi;

      let bpi = {
        labels: Object.keys(data),
        datasets: [{
          label: "Bitcoin Price",
          backgroundColor: 'rgb(51, 51, 204)',
          borderColor: 'rgb(51, 51, 204)',
          data: Object.values(data),
        }],
      }
      this.setState({
        data: bpi,
      })
    })
    .catch(err => console.error('Error: ', err))
  }

  render () {
    let chart = this.state.value === 'Line' ? <Line data={this.state.data} height={100} width={300} /> : <Bar data={this.state.data} height={100} width={300} />
    
    return (
      <div>
        <h1>CryptoCrazy</h1>
        <label>Select Chart Type: 
          <select value={this.state.value} onChange={this.handleChange} >
            <option value="Line">Line</option>
            <option value="Bar">Bar</option>
          </select>
        </label>
        {chart}
        {/* <Line data={this.state.data} height={100} width={300} /> */}
        <p>Powered by CoinDesk</p>
      </div>
    )
  }
}

export default App;
