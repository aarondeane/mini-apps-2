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
      btcOptions: {},
      ethOptions: {},
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
          valueFormatString: "YYYY-MM-DD"
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
          valueFormatString: "YYYY-MM-DD"
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
    let btcChart = <Line data={this.state.btcdata} height={50} width={200} />;
    let ethChart = <Line data={this.state.ethdata} height={50} width={200} />;
    switch(this.state.value) {
      case 'Line':
        btcChart = <Line data={this.state.btcdata} height={50} width={200} />;
        ethChart = <Line data={this.state.ethdata} height={50} width={200} />;
      break;
      case 'Bar':
        btcChart = <Bar data={this.state.btcdata} height={50} width={200} />;
        ethChart = <Bar data={this.state.ethdata} height={50} width={200} />;
      break;
      case 'Candlestick':
        btcChart = <CanvasJSChart options={this.state.btcOptions} />;
        ethChart = <CanvasJSChart options={this.state.ethOptions} />;
      break;
    }

    return (
      <div>
        <h1>CryptoCrazy</h1>
        <label>Select Chart Type: 
          <select value={this.state.value} onChange={this.handleChange} >
            <option value="Line">Line</option>
            <option value="Bar">Bar</option>
            <option value="Candlestick">Candlestick</option>
          </select>
        </label>
        <div className="BTC">{btcChart}</div>        
        <div className="ETH">{ethChart}</div>
      </div>
    )
  }
}

export default App;
