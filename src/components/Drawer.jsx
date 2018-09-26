import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Drawer extends Component {
  render() {
    let drawerClass = 'drawer';
    if (this.props.drawerState) {
      drawerClass= 'drawer open'
    }

    const links = () => {if (this.props.selectedComponent.children) return this.props.selectedComponent.children.map((screen, i) => <Link to={`/${screen.title}`}>{screen.title}</Link>)}

    return (
      <div className={drawerClass}>
        {links()}
      </div>
    )
  }
}