import React, { Component } from 'react';
import Cell from './Cell.jsx';
import Tally from './Tally.jsx'

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: "X",               // X or O
      playGrid: this.createGrid(),      // Matrix representing grid
      status: "Player X",               // Winner, Draw, Player
      gameOver: false,                  // if the game is over or not
      tallyX: 0,
      tallyO: 0,
      tallyDraw: 0
    };
    this.startPlayer = "X";             //Player that plays first
    this.numPlayed = 0;                 // Number of moves played
  }
  createGrid() {
    var matrix = [];
    for(var i = 0; i < 3; i++) {
      matrix.push([]);
      for(var j = 0; j < 3; j++) {
        matrix[i].push({
          letter: "",
          row: i,
          col: j
        });
      }
    }
    return matrix;
  }
  play(row, col) {
    if(this.state.status === "Player X" || this.state.status === "Player O"){
      this.numPlayed++;
      var _playGrid = this.state.playGrid;
      _playGrid[row][col].letter = this.state.currentPlayer;
      this.setState({
        playGrid: _playGrid
      });
      this.judge();
    }
  }
  judge() {
    var win = this.checkWin();
    if(win) {
      this.setState({
        status: ("Winner " + this.state.currentPlayer),
        gameOver: true,
      });
      if(this.state.currentPlayer === "X") {
        this.setState({tallyX: this.state.tallyX + 1});
      } else {
        this.setState({tallyO: this.state.tallyO + 1});
      }
      return;
    }

    if(this.numPlayed === 9) {
      console.log("here");
      this.setState({
        status: "Draw",
        gameOver: true,
        tallyDraw: this.state.tallyDraw + 1
      });
      return;
    }

    var nextPlayer = ((this.state.currentPlayer === "X") ? "O" : "X");
    this.setState({
      currentPlayer: nextPlayer,
      status: "Player " + nextPlayer
    });

  }
  checkWin() {
    var playGrid = this.state.playGrid;

    //test diagonals
    if((playGrid[0][0].letter ===  playGrid[1][1].letter && playGrid[0][0].letter === playGrid[2][2].letter) ||
      (playGrid[0][2].letter ===  playGrid[1][1].letter && playGrid[0][2].letter === playGrid[2][0].letter))
    {
      if(playGrid[1][1].letter !== "") {
        return true;
      }
    }
    //check rows
    var i;
    for(i = 0; i < 3; i++) {
      if(playGrid[i][0].letter ===  playGrid[i][1].letter && playGrid[i][0].letter === playGrid[i][2].letter){
        if(playGrid[i][0].letter !== "") {
          return true;
        }
      }
    }
    //check col
    for(i = 0; i < 3; i++) {
      if(playGrid[0][i].letter ===  playGrid[1][i].letter && playGrid[0][i].letter === playGrid[2][i].letter){
        if(playGrid[0][i].letter !== "") {
          return true;
        }
      }
    }

    return false;
  }
  newGame() {
    this.startPlayer = (this.startPlayer === "X") ? "O" : "X";
    this.setState({
      currentPlayer: this.startPlayer,
      playGrid: this.createGrid(),
      status: "Player " + this.startPlayer,
      gameOver: false
    });
    this.numPlayed = 0;
  }
  render() {

    var cells = () => {
      var _playGrid = this.state.playGrid;
      var rowArray = [];
      for(var i = 0; i < 3; i++) {
        rowArray.push(
          <tr key={i}>
            <Cell key={i + "" + 0} cell={_playGrid[i][0]} play={this.play.bind(this)}/>
            <Cell key={i + "" + 1} cell={_playGrid[i][1]} play={this.play.bind(this)}/>
            <Cell key={i + "" + 2} cell={_playGrid[i][2]} play={this.play.bind(this)}/>
          </tr>
        );
      }
      return rowArray;
    };

    return (
      <div className="TicTacToe">
        <h1>{this.state.status}</h1>
        <table className={"Grid Grid-" + this.state.gameOver}>
          <tbody>
            {cells()}
          </tbody>
        </table>
        <button onClick={this.newGame.bind(this)}>Next Game</button>
        <Tally tallyX={this.state.tallyX} tallyO={this.state.tallyO} tallyDraw={this.state.tallyDraw} />
      </div>
    );
  }
}
