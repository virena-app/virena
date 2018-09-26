import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

export default class PhoneScreen extends Component {
  render() {
    const { selectedComponent, parent, child } = this.props;

    const routes = () => {
      if (selectedComponent.children) {
        return selectedComponent.children.map((screen, i) => <Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />)
      }
      else {
        if (parent) {
          return parent.children.reduce((acc, screen, i) => {
            if (selectedComponent.title === screen.title)
              acc.unshift(<Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />);
            else 
              acc.push(<Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />);
            
            return acc; 
          }, [])
        }

        if (child) {
          return <Route path={`/${child.title}`} render={() => <div>{selectedComponent.title}</div>} />
        }
        
        return <Route path={`/${selectedComponent.title}`} render={() => <div>{selectedComponent.title}</div>} />
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