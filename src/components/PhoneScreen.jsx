import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

export default class PhoneScreen extends Component {
  render() {
    const routes = () => {
      console.log('hihi');
      if (this.props.selectedComponent.children) {
        return this.props.selectedComponent.children.map((screen, i) => <Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />)
      }else {
        console.log('title here', this.props.selectedComponent.title);
        return <Route path={`/${this.props.selectedComponent.title}`} render={() => <div>{this.props.selectedComponent.title}</div>} />
      }
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