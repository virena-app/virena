import React, { Component } from 'react';
import ScreenDisplay from './ScreenDisplay.jsx';
import BottomTab from './BottomTab.jsx';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default class ScreenContainer extends Component {
  render() {
    const { selected } = this.props;
    return (
      <div className='screen-container'>
        <ScreenDisplay selected={selected}/>
        { selected.subtitle === 'Drawer'
          ? <Drawer selected={selected}/>
          : null
        }
      </div>
    )
  }
}