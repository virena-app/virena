import React, { Component } from 'react';

export default class Backdrop extends Component {
  render() {
    return (
      <div className='backdrop' onClick={this.props.closeDrawer}></div>
    )
  }
}