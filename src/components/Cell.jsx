import React, { Component } from 'react';

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter: this.props.cell.letter,
      row: this.props.cell.row,
      col: this.props.cell.col
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      letter: nextProps.cell.letter
    });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.cell.letter === this.state.letter) {
      return false;
    }
    return true;
  }
  play() {
    if(this.state.letter === "") {
      this.props.play(this.state.row, this.state.col);
    }
  }
  render() {
    return(
      <td onClick={this.play.bind(this)}> {this.state.letter} </td>
    );
  }
}
