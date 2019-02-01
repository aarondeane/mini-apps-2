import React, { Component } from 'react';
import Chart from './Chart.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symbol: 'BTC',
      chart: 'Line',
      btcdata: {},
      ethdata: {},
      btcOptions: {},
      ethOptions: {},
      height: 50,
      width: 180,
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
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
      let datapoints = res.map(entry => {
        let temp = new Date(entry.time * 1000);
        let date = new Date(temp.getFullYear()+'-'+(temp.getMonth()+1)+'-'+temp.getDate());
        let point = {
          x: date,
          y: [entry.open, entry.high, entry.low, entry.close],
        }
        return point;
      });
      const options = {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
			  animationEnabled: true,
			  exportEnabled: true,
        axisX: {
          valueFormatString: "YYYY-MM-DD",
          labelAngle: -50,
        },
        axisY: {
          includeZero:false,
          prefix: "$",
          title: "Price (in USD)"
        },
        data: [{
          type: "candlestick",
          risingColor: "#00cc00",
          fallingColor: "#ff0000",
          showInLegend: true,
          name: "BTC Price",
          yValueFormatString: "$###0.00",
          xValueFormatString: "YYYY MM DD",
          dataPoints: datapoints,
        }]
      }

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
        btcOptions: options
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
      let datapoints = res.map(entry => {
        let temp = new Date(entry.time * 1000);
        let date = new Date(temp.getFullYear()+'-'+(temp.getMonth()+1)+'-'+temp.getDate());
        let point = {
          x: date,
          y: [entry.open, entry.high, entry.low, entry.close],
        }
        return point;
      });
      const options = {
        theme: "light1", // "light1", "light2", "dark1", "dark2"
			  animationEnabled: true,
			  exportEnabled: true,
        axisX: {
          valueFormatString: "YYYY-MM-DD",
          labelAngle: -50,
        },
        axisY: {
          includeZero:false,
          prefix: "$",
          title: "Price (in USD)"
        },
        data: [{
          type: "candlestick",
          risingColor: "#00cc00",
          fallingColor: "#ff0000",
          showInLegend: true,
          name: "ETH Price",
          yValueFormatString: "$###0.00",
          xValueFormatString: "YYYY MM DD",
          dataPoints: datapoints,
        }]
      }

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
        ethOptions: options
      })
    })
    .catch(err => console.error('Error: ', err))
  }

  render () {
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
        <label>Select Crypto Symbol: 
          <select name="symbol" value={this.state.symbol} onChange={this.handleChange} >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
          </select>
        </label>
        <Chart state={this.state} />
      </div>
    )
  }
}

export default App;
