import React, { Component } from 'react';

export default class Switch extends Component {
  render() {
    const switchClass = 'switch-div column'
    const switchBtn = 'switch-button'
    return (
      <div className={switchClass}>
        <button className={switchBtn} onClick={() => this.props.selectComponent(this.props.child)}>{this.props.selectedComponent.title}</button>
        <div style={{fontSize: 12}}>*Click to proceed onto the next screen*</div>
      </div>
    )
  }
}

