import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

export default class PhoneScreen extends Component {
  render() {
    const routes = () => {
      if (this.props.selectedComponent.children) return this.props.selectedComponent.children.map((screen, i) => <Route key={i} path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />)
    }
    return (
      <div className='phone-screen'>
        <Switch>
          {routes()}
        </Switch>
      </div>
    )
  }
}