import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
export default class Drawer extends Component {
  render() {
    const { selected } = this.props;
    let screens;
    if(selected.children && selected.children.length) {
      screens = selected.children.map((currElem, currIndex) => {
        let currPath = `/Screen${currIndex + 1}`;
        return <li><NavLink to={currPath}>Screen {currIndex + 1}</NavLink></li> 
      })
    }
    return (
      <div>
        <ul>
          {screens}
        </ul>
      </div>
    )
  }
}