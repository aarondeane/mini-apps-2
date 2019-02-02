import React, { Component } from 'react';

const Pin = (props) => {
  return (<div className="pin">{props.value}</div>);
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [
        [1],
        [2, 3],
        [4, 5, 6],
        [7, 8, 9, 10]
    ],
    }
  }

  renderPin(i,j) {
    return (<Pin value={this.state.pins[i][j]} />);
  }

  render() {
    return (
      <div className="board">
        <div id="row3" className="board-row">
          {this.renderPin(3,0)}
          {this.renderPin(3,1)}
          {this.renderPin(3,2)}
          {this.renderPin(3,3)}
        </div>
        <div id="row2" className="board-row">
          {this.renderPin(2,0)}
          {this.renderPin(2,1)}
          {this.renderPin(2,2)}
        </div>
        <div id="row1" className="board-row">
          {this.renderPin(1,0)}
          {this.renderPin(1,1)}
        </div>
        <div id="row0" className="board-row">
          {this.renderPin(0,0)}
        </div>
      </div>
    )
  }
  
}

export default Board;