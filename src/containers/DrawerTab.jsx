import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class DrawerTab extends Component {
  render() {
    // map through each
    return(
      <nav>
        <ul>
          <li><NavLink></NavLink></li>
          <li><NavLink></NavLink></li>
        </ul>
      </nav>
    )
  }
}