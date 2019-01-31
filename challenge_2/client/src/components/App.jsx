import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
import { Line, Bar } from 'react-chartjs-2';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'Line',
      btcdata: {},
      ethdata: {},
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
    .then(res => {
      res = JSON.parse(res).Data;
      
      let labels = res.map(date => {
        let temp = new Date(date.time * 1000);
        
        return temp.getFullYear()+'-'+(temp.getMonth()+1)+'-'+temp.getDate();
      })
      let data = res.map(price => {
        return Number(((price.high + price.low) / 2).toFixed(2));
      })

      let bpi = {
        labels: labels,
        datasets: [{
          label: "Bitcoin Price",
          backgroundColor: 'rgb(255, 153, 0)',
          borderColor: 'rgb(0, 0, 0)',
          data: data,
        }],
      }
      this.setState({
        btcdata: bpi,
      })
    })
    .catch(err => console.error('Error: ', err))

    fetch('/ethereum')
    .then(response => {
      return response.json()
    })
    .then(res => {
      res = JSON.parse(res).Data;
      
      let labels = res.map(date => {
        let temp = new Date(date.time * 1000);
        
        return temp.getFullYear()+'-'+(temp.getMonth()+1)+'-'+temp.getDate();
      })
      let data = res.map(price => {
        return Number(((price.high + price.low) / 2).toFixed(2));
      })

      let eth = {
        labels: labels,
        datasets: [{
          label: "Ethereum Price",
          backgroundColor: 'rgb(51, 51, 204)',
          borderColor: 'rgb(0, 0, 0)',
          data: data,
        }],
      }
      this.setState({
        ethdata: eth,
      })
    })
    .catch(err => console.error('Error: ', err))
  }

  render () {
    let btcChart = this.state.value === 'Line' ? <Line data={this.state.btcdata} height={50} width={200} /> : <Bar data={this.state.btcdata} height={50} width={200} />
    let ethChart = this.state.value === 'Line' ? <Line data={this.state.ethdata} height={50} width={200} /> : <Bar data={this.state.ethdata} height={50} width={200} />
    const options = {
      title: {
        text: "BTC Canvas Chart"
      },
      data: [{
        type: "column",
        dataPoints: [
          { label: "Apple",  y: 10  },
          { label: "Orange", y: 15  },
          { label: "Banana", y: 25  },
          { label: "Mango",  y: 30  },
          { label: "Grape",  y: 28  },
        ]
      }]
    }

    return (
      <div>
        <h1>CryptoCrazy</h1>
        <label>Select Chart Type: 
          <select value={this.state.value} onChange={this.handleChange} >
            <option value="Line">Line</option>
            <option value="Bar">Bar</option>
          </select>
        </label>
        {btcChart}
        {ethChart}
        <CanvasJSChart options={options} />
      </div>
    )
  }
}

export default App;
