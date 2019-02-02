import React, { Component } from 'react';
import Board from './Board.jsx';
import Scorecard from './Scorecard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frame: 1,
      play: 1,
      totalScore: 0,
      totalPins: 10,
      currPlay: 0,
      strike: false,
      spare: false,
      bonusPts: 0,
      bonusRoll: 0,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(event) {
    if(this.state.currPlay > this.state.totalPins) {
      alert(`Sorry there are only ${this.state.totalPins} pins left, try again`);
      return;
    }
    
    // Strike Scoring//
    if (this.state.play < 2 && this.state.currPlay === 10) {
      this.setState({
        strike: true,
        play: this.state.play + 1,
        totalScore: this.state.totalScore + this.state.currPlay,
        currPlay: 0,
        totalPins: 10,
        bonusRoll: 2
      })
      // Spare Scoring//
    } else if (this.state.play === 2 && (this.state.currPlay === this.state.totalPins)) {
      this.setState({
        spare: true,
        frame: this.state.frame + 1,
        play: 1,
        totalScore: this.state.totalScore + this.state.currPlay,
        currPlay: 0,
        totalPins: 10,
        bonusRoll: 1
      })
      // Standard roll Scoring with no Strikes or Spares//
    } else if (this.state.play < 2 && this.state.currPlay < 10 && this.state.bonusRoll === 0) {
      this.setState({
        play: this.state.play + 1,
        totalScore: this.state.totalScore + this.state.currPlay + this.state.bonusPts,
        currPlay: 0,
        totalPins: this.state.totalPins - this.state.currPlay,
        bonusPts: 0,
        spare: false,
        strike: false
      })
    } else if (this.state.play === 2 && this.state.currPlay < 10 && this.state.bonusRoll === 0) {
      this.setState({
        frame: this.state.frame + 1,
        play: 1,
        totalScore: this.state.totalScore + this.state.currPlay + this.state.bonusPts,
        currPlay: 0,
        totalPins: 10,
        bonusPts: 0,
        spare: false,
        strike: false
      })
    } else if (this.state.play < 2 && this.state.currPlay < 10 && this.state.bonusRoll !== 0) {
      this.setState({
        play: this.state.play + 1,
        totalScore: this.state.totalScore + this.state.currPlay,
        currPlay: 0,
        totalPins: this.state.totalPins - this.state.currPlay,
        bonusRoll: this.state.bonusRoll - 1,
        bonusPts: this.state.currPlay,
      })
    } else if (this.state.play === 2 && this.state.currPlay < 10 && this.state.bonusRoll !== 0) {
      this.setState({
        frame: this.state.frame + 1,
        play: 1,
        totalScore: this.state.totalScore + this.state.currPlay,
        currPlay: 0,
        totalPins: this.state.totalPins - this.state.currPlay,
        bonusRoll: this.state.bonusRoll - 1,
        bonusPts: this.state.currPlay,
      })
    }
  }

  handleChange(event) {
    const value = event.target.value;    
    this.setState({
      currPlay: Number(value),
    })
  }

  

  render() {
    return (
      <div>
        <h1>React Bowl-o-rama</h1>
        <h3>Frame:{this.state.frame}</h3>
        <h3>Play:{this.state.play}</h3>
        <h3>Score:{this.state.totalScore}</h3>
        <label>Choose Number of Pins
        <select name="curr-play" value={this.state.currPlay} onChange={this.handleChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        <button type="submit" value="Play" onClick={this.handleSubmit}>Play</button>
        </label>
        <Scorecard state={this.state} /><br/>
        <div className="bowling-lane">
          <Board />
        </div>
      </div>
    )
  }
}

export default App;
