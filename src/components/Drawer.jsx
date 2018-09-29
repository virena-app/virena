import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Drawer extends Component {
  render() {
    const { selectedComponent, drawerState, selectComponent } = this.props;
    let drawerClass = 'drawer';
    if (drawerState) drawerClass = 'drawer open';

    const links = selectedComponent.children ? 
      selectedComponent.children.map((screen, i) => {
        if (screen.subtitle === "Simple Screen") {
          return <NavLink to={`/${screen.title}`}>{screen.title}</NavLink>
        }
        else if (screen.subtitle === 'BottomTab') {
          return <button onClick={() => this.props.selectComponent(screen)}>{screen.title}</button>
        }
      }) : null
  
    return (
      <div className={drawerClass}>
        {links}
      </div>
    )
  }
}