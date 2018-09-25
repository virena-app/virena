import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Tab1 from './Tab1.jsx';
import Tab2 from './Tab2.jsx';

export default class ScreenDisplay extends Component {
  render() {
    const { selected } = this.props;
    return(
      <div className='screen'>
        <Switch>
          <Route path='/tab1' component={Tab1}></Route>
          <Route path='/tab2' component={Tab2}></Route>
        </Switch>
      </div>
    )
  }
}