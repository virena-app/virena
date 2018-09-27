import React, { Component } from 'react';

export default class Switch extends Component {
  render() {
    return (
      <div className='switch-button'>
        <button onClick={() => this.props.selectComponent(this.props.child)}>{this.props.selectedComponent.title}</button>
      </div>
    )
  }
}

