import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

export default class BottomTab extends Component {
  render() {
    return(
      <nav>
        <ul className='bottom-tab'>
          <li><NavLink to='/tab1'>Tab 1</NavLink></li>
          <li><NavLink to='/tab2'>Tab 2</NavLink></li>
        </ul>
      </nav>
    )
  }
}