import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BottomTab extends Component {
  render() {
    const { children } = this.props.selectedComponent;
    const links = children ? 
    children.map((screen, i) => <Link to={`/${screen.title}`} key={i}>{screen.title}</Link>) :
    null
    return (
      <div className='bottom-tab'>
          {links}
      </div>
    )
  }
}