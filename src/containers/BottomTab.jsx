import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';


export default class BottomTab extends Component {
  render() {
    return(
      <ul>
        <li><NavLink to='/tab1'>Tab 1</NavLink></li>
      </ul>
    )
  }
}