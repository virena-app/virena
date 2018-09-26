import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Drawer extends Component {
  render() {
    const { selectedComponent, drawerState } = this.props;
    let drawerClass = 'drawer';
    if (drawerState) drawerClass = 'drawer open';

    const links = selectedComponent.children ? 
      selectedComponent.children.map((screen, i) => {
        if (screen.subtitle === "Simple Screen") {
          return <Link to={`/${screen.title}`}>{screen.title}</Link>
        }
        else if (screen.subtitle === 'BottomTab') {
          return <button onClick={() => selectComponent(screen)}>{screen.title}</button>
        }
      }) : null
  

    return (
      <div className={drawerClass}>
        {links}
      </div>
    )
  }
}