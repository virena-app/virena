import React, { Component } from 'react';

export default class Switch extends Component {
  render() {
    console.log('child here', this.props.child);
    return (
      <div>
        <button onClick={() => this.props.selectComponent(this.props.child)}>{this.props.selectedComponent.title}</button>
      </div>
    )
  }
}

