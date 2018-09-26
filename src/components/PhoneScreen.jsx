import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export default class PhoneScreen extends Component {
  render() {
    const routes = () => {
      if (this.props.selectedComponent.children) {
        return this.props.selectedComponent.children.map((screen, i) => <Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />)
      }
      else {
        if(this.props.parent) {
          // return this.props.parent.children.map((screen, i) => {
          //   if(this.props.selectedComponent.title === screen.title) {
          //     console.log('hello??');
          //     return <Route exact path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />
          //   }
          //   return <Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />
          // })
          return this.props.parent.children.reduce((acc, screen, i) => {
            if(this.props.selectedComponent.title === screen.title) {
              console.log(screen.title);
              acc.unshift(<Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />);
            }
            acc.push(<Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />);
            return acc; 
          }, [])
        }
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