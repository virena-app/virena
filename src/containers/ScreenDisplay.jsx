import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Screen from '../components/Screen.jsx';
// import Tab1 from './Tab1';
// import Tab2 from './Tab2';

export default class ScreenDisplay extends Component {
  render() {
    const { selected } = this.props;
    let routes;
    if(selected.children && selected.children.length) {
      routes = selected.children.map((currElem, currIndex) => {
        let currPath = `/Screen${currIndex + 1}`;
        return <Route 
                  path={currPath} 
                  render={(props) => <Screen screenNum={currIndex + 1} />} />
      })
    }
  
    return(
      <div className='screen'>
        <Switch>
          {/* <button>+</button> */}
          { routes }
        </Switch>
      </div>
    )
  }
}