import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      options: {

      }
    }
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
          // backgroundColor: 'rgb(51, 51, 204)',
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
    return (
      <div>
        <h1>CryptoCrazy</h1>
        <Line data={this.state.data} height={100} width={300} />
        <p>Powered by CoinDesk</p>
      </div>
    )
  }
}

export default App;
