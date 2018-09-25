import React, { Component } from 'react';
import BottomTab from './BottomTab.jsx';
import { Route, Switch } from 'react-router-dom';

export default class ScreenContainer extends Component {
  render() {
    return (
      <div>
        {/* Have different navigational components in this ScreenContainer */}
        <BottomTab />
      </div>
    )
  }
}