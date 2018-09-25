import React, { Component } from 'react';
import { Switch, Route } from 'react-route-dom';


export default class Drawer extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path='/drawer' />
          <Route path='/screen1' />
        </Switch>
      </div>
    )
  }
}