import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

export default class TopNav extends Component {
  render() {
    const { userLoggedIn, logout } = this.props
    return (
      <nav className='top-nav'>
        <ul>
          <li><img src='./assets/add_new.png' className='nav-icon'/>New Project</li>
          {userLoggedIn && <li><img src='./assets/load_file.png' className='nav-icon'/>Load Project</li>}
          {userLoggedIn && <li><img src='./assets/save_file.png' className='nav-icon'/>Save Project</li>}
        </ul>
        <div className='logout-wrapper'>
          <div id='logout-btn' onClick={() => {
            console.log('clicked')
            logout()
            ipcRenderer.send('logout', 'logout')
          }}>
            <img src='./assets/logout.png' className='nav-icon'/>
            {userLoggedIn && <span>Log Out</span>}
          </div>
        </div>
      </nav>
    )
  }
}