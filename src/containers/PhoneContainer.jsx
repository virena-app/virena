import React, { Component } from 'react';
import PhoneScreen from '../components/PhoneScreen.jsx';
import BottomTab from '../components/BottomTab.jsx';

export default class PhoneContainer extends Component {
  render() {
    return (
      <div className='screen-view'>
        <PhoneScreen />
        <BottomTab />
      </div>
    )
  }
}