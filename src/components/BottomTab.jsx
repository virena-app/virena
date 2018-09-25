import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BottomTab extends Component {
  render() {
    const links = this.props.selectedComponent.children.map((screen, i) => <Link to={`/${screen.title}`} key={i}>{screen.title}</Link>)
    return (
      <div className='bottom-tab'>
          {links}
          {/* <Link to='/one' replace>One</Link>
          <Link to ='/two' replace>Two</Link> */}
      </div>
    )
  }
}