import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

export default class TopNav extends Component {

  render() {
    const { userLoggedIn, logout, userProjects } = this.props
    console.log("USER PROJECTS FOR LOAD BUTTON DROPDOWN IN TOP NAV BAR", userProjects)
    return (
      <nav className='top-nav'>
        <ul>
          {userLoggedIn? <li><img src='./assets/add_new.png' className='nav-icon'/>New Project</li> : <li style={{width: '250px'}}><img src='./assets/add_new.png' className='nav-icon'/>New Project</li>}
          {userLoggedIn && <li><img src='./assets/load_file.png' className='nav-icon'/>Load Project</li>}
          {userLoggedIn && <li><img src='./assets/save_file.png' className='nav-icon'/>Save Project</li>}
        </ul>
        <div className='logout-wrapper'>
          {userLoggedIn && (<div id='logout-btn' onClick={() => {
            logout()
            ipcRenderer.send('logout', 'logout')
          }}>
            <img src='./assets/logout.png' className='nav-icon'/>
            <span>Log Out</span>
          </div>)}
          {!userLoggedIn && (<div id='logout-btn' onClick={() => {
              ipcRenderer.send('login', 'login')
            }}>
            <img src='./assets/login.png' className='nav-icon'/>
            <span>Log In</span>
          </div>)}
        </div>
      </nav>
    )
  }
}