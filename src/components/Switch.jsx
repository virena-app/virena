import React, { Component } from 'react';

export default class Switch extends Component {
  render() {
    const switchClass = 'switch-button'
    return (
      <div className={switchClass}>
        <button onClick={() => this.props.selectComponent(this.props.child)}>{this.props.selectedComponent.title}</button>
      </div>
    )
  }
}

