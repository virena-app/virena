import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import One from './One.jsx';
import Two from './Two.jsx';
import Three from './Three.jsx';

export default class PhoneScreen extends Component {
  render() {
    // const routes = () => this.props.selectedComponent.children? this.props.selectedComponent.children.map((screen, i) => <Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />): <Route exact path='/' render={() => <div>Default</div>} />;
    return (
      <div className='phone-screen'>
        <Switch>
          {/* {routes()} */}
          <Route exact path='/One' render={() => <div>One</div>} />
          <Route path='/Two' render={() => <div>Two</div>} />
        </Switch>
      </div>
    )
  }
}