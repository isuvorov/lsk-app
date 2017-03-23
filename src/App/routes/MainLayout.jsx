import React, { Component } from 'react';
import NavBar from './_layouts/NavBar';

export default class CabinetLayout extends Component { //eslint-disable-line
  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}
