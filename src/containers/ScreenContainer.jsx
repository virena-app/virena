import React, { Component } from 'react';
import Screen from './Screen.jsx';
import BottomTab from './BottomTab.jsx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default class ScreenContainer extends Component {
  render() {
    return (
      <div className='screen-container'>
        <Screen />
        <BottomTab />
      </div>
    )
  }
}