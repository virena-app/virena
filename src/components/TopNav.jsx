import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

export default class TopNav extends Component {
  render() {
    return (
      <nav className='top-nav'>
        <ul>
          <li><img src='./assets/add_new.png' className='nav-icon'/>New Project</li>
          <li><img src='./assets/load_file.png' className='nav-icon'/>Load Project</li>
          <li><img src='./assets/save_file.png' className='nav-icon'/>Save Project</li>
        </ul>
        <div className='logout-wrapper'>
          <div id='logout-btn' onClick={() => {
            console.log('clicked')
            ipcRenderer.send('logout', 'logout')
          }}><img src='./assets/logout.png' className='nav-icon'/>Log Out</div>
        </div>
      </nav>
    )
  }
}