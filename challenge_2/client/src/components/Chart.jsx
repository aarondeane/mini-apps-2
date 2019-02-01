import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
import { Line, Bar } from 'react-chartjs-2';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (props) => {
    let btcChart = <Line data={props.state.btcdata} height={props.state.height} width={props.state.width} />;
    let ethChart = <Line data={props.state.ethdata} height={props.state.height} width={props.state.width} />;
    switch(props.state.chart) {
      case 'Line':
        btcChart = <Line data={props.state.btcdata} height={props.state.height} width={props.state.width} />;
        ethChart = <Line data={props.state.ethdata} height={props.state.height} width={props.state.width} />;
      break;
      case 'Bar':
        btcChart = <Bar data={props.state.btcdata} height={props.state.height} width={props.state.width} />;
        ethChart = <Bar data={props.state.ethdata} height={props.state.height} width={props.state.width} />;
      break;
      case 'Candlestick':
        btcChart = <CanvasJSChart options={props.state.btcOptions} height={props.state.height} width={props.state.width}/>;
        ethChart = <CanvasJSChart options={props.state.ethOptions} height={props.state.height} width={props.state.width}/>;
      break;
    }

    return (
      <div>
        <div className="BTC">{btcChart}</div>        
        <div className="ETH">{ethChart}</div>
      </div>
    )
}

export default Chart;