import React, {Component} from 'react';

export default class ViewContainer extends Component {
  render() {
    return (
      <div className='view'>
        <p>ViewContainer</p>
        <img id='iphone' src='../assets/iphonex.png'></img>
      </div>
    )
  }
}