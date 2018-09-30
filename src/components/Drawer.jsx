import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Drawer extends Component {
  render() {
    const { selectedComponent, drawerState } = this.props;
    let drawerClass = 'drawer';
    if (drawerState) drawerClass = 'drawer open';

    const links = selectedComponent.children ? 
      selectedComponent.children.map((screen, i) => {
        if (screen.subtitle === "Simple Screen") {
          return <NavLink 
                    style={{color: '#333'}} 
                    activeStyle={{backgroundColor: '#f6f6f6', color: 'rgb(0, 122, 255)'}} 
                    to={`/${screen.title}`}>
                    {screen.title}
                 </NavLink>
        }
        else if (screen.subtitle === 'BottomTab') {          
          return <NavLink 
                    style={{color: '#333'}}
                    activeStyle={{backgroundColor: '#f6f6f6', color: 'rgb(0, 122, 255)'}}
                    to={`/${screen.title}`}>
                    <div onClick={() => this.props.selectComponent(screen)}>
                      {screen.title}
                    </div>
                 </NavLink>
        }
      }) : null
  
    return (
      <div className={drawerClass}>
        {links}
      </div>
    )
  }
}