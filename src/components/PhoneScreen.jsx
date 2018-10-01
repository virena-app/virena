import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getParent } from '../utils/helperFunctions.util';

export default class PhoneScreen extends Component {
  render() {
    const { selectedComponent, parent, child} = this.props;
    /**
     * routes - Checks to see if the selectedComponent has any children, if there are, return an array of Routes with the
     * appropriate screen titles to render
     * If the selectedComponent does not have any child, it must be a Simple Screen that may have a BottomTab or Drawer as a parent,
     * render the selectedComponent (child)
     */
    const routes = () => {
      if (selectedComponent.children) {
        return selectedComponent.children.map((screen, i) => <Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />)
      }
      else {
        if (parent && (parent.subtitle === 'BottomTab' || parent.subtitle === 'Drawer')) {
          return parent.children.reduce((acc, screen, i) => {
            if(screen.title === selectedComponent.title) {
              this.props.selectComponent(screen);
              acc.unshift(<Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>}/>)
            }else {
              acc.push(<Route path={`/${screen.title}`} render={() => <div>{screen.title}</div>} />);
            }
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
      <div className='phone-screen column'>
        <Switch>
          {routes()}
        </Switch>
      </div>
    )
  }
}