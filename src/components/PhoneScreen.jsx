import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import One from './One.jsx';
import Two from './Two.jsx';
import Three from './Three.jsx';

export default class PhoneScreen extends Component {
  render() {
    return (
      <div className='phone-screen'>
        <Switch>
          <Route exact path='/one' component={One}></Route>
          <Route exact path='/two' component={Two}></Route>
          <Route exact path='/three' component={Three}></Route>
        </Switch>
      </div>
    )
  }
}