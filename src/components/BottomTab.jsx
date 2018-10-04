import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class BottomTab extends Component {
  render() {
    const { children } = this.props.selectedComponent;
    const { phone  } = this.props.phone;
    const links = children ? 
    children.map((screen, i) => { 
      return <NavLink  
                style={{color: '#d3d3d3'}} 
                activeStyle={{color: 'rgb(0, 122, 255)'}} 
                activeClassName='is-active' 
                key={i}
                to={`/${screen.title}`}>
                {screen.title}
              </NavLink>
     }) : null
    return (
      <div className={phone === 'iphone-view' ? 'bottom-tab' : 'bottom-tab-top-border'}>
          {links}
      </div>
    )
  }
}