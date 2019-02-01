import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
import { Line, Bar } from 'react-chartjs-2';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
  let labels = props.state.data.map(date => {
    let temp = new Date(date.time * 1000);
    
    return temp.getFullYear()+'-'+(temp.getMonth()+1)+'-'+temp.getDate();
  })

  let data = props.state.data.map(price => {
    return Number(((price.high + price.low) / 2).toFixed(2));
  })

  let datapoints = props.state.data.map(entry => {
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
      name: `${props.state.symbol} Price`,
      yValueFormatString: "$###0.00",
      xValueFormatString: "YYYY MM DD",
      dataPoints: datapoints,
    }]
  }

  let chartJSdata = {
    labels: labels,
    datasets: [{
      label: "Bitcoin Price",
      backgroundColor: 'rgb(255, 153, 0)',
      borderColor: 'rgb(0, 0, 0)',
      data: data,
    }],
  }
  

    let chart = <Line data={chartJSdata} height={props.state.height} width={props.state.width} />;
    
    switch(props.state.chart) {
      case 'Line':
        chart = <Line data={chartJSdata} height={props.state.height} width={props.state.width} />;
      break;
      case 'Bar':
        chart = <Bar data={chartJSdata} height={props.state.height} width={props.state.width} />;
      break;
      case 'Candlestick':
        chart = <CanvasJSChart options={options} height={props.state.height} width={props.state.width}/>;
      break;
    }

    return (
        <div className="crypto-chart">{chart}</div>
        )
}

export default Chart;