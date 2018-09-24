import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BottomTab extends Component {
  render() {
    return (
      <div className='bottom-tab'>
          <Link to='/one'>One</Link>
          <Link to='/two'>Two</Link>
          <Link to='/three'>Three</Link>
      </div>
    )
  }
}