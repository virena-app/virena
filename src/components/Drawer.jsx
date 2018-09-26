import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Drawer extends Component {
  render() {
    let drawerClass = 'drawer';
    const getNodeKey = ({ treeIndex }) => treeIndex;
    if (this.props.drawerState) {
      drawerClass= 'drawer open'
    }

    const links = () => {if (this.props.selectedComponent.children) return this.props.selectedComponent.children.map((screen, i) => {
      if (screen.subtitle === 'Simple Screen') {
        return <Link to={`/${screen.title}`}>{screen.title}</Link>
      }
      else if (screen.subtitle === 'BottomTab') return <button onClick={() => this.props.selectComponent(screen.title, screen.subtitle, screen.children, getNodeKey, screen.path)}>{screen.title}</button>
    })}

    return (
      <div className={drawerClass}>
        {links()}
      </div>
    )
  }
}