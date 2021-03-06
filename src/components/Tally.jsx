import React, { Component } from 'react';

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tallyX: 0,
      tallyO: 0,
      tallyDraw: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tallyX: nextProps.tallyX,
      tallyO: nextProps.tallyO,
      tallyDraw: nextProps.tallyDraw,
    });
  }
  render() {
    return (
      <table className="Grid">
        <tbody className="Tally">
          <tr className="grey-bg">
            <td> X </td><td> O </td><td> Draw </td>
          </tr>
          <tr>
            <td> {this.state.tallyX} </td><td> {this.state.tallyO} </td><td> {this.state.tallyDraw}</td>
          </tr>
        </tbody>
      </table>
    );
  }
}
