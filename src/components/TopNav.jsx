import React, { Component } from 'react';
import * as actions from '../actions/actions';
import { ipcRenderer } from 'electron';
import LoadFilesDropdown from './LoadFilesDropdown.jsx';
import SaveAsForm from './SaveAsForm.jsx'



const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    // outline: 'none'
  }
})

export default class TopNav extends Component {

  render() {
    const { treeData, uid, displayName, userLoggedIn, userProjects, modalStatus, toggleModal, setTree, addUserProject, projectNameInput, changeProjectNameInput, setCurrentProject, deleteProject, toggleDropdown, dropdownStatus } = this.props
    console.log("USER PROJECTS FOR LOAD BUTTON DROPDOWN IN TOP NAV BAR", userProjects)
    return (
      
      <nav className='top-nav'>
        <ul>
          {userLoggedIn? <li onClick={() => toggleModal('reset')}><img src='./assets/add_new.png' className='nav-icon'/>New Project</li> : <li onClick={() => toggleModal('reset')} style={{width: '250px'}}><img src='./assets/add_new.png' className='nav-icon'/>New Project</li>}
          {userLoggedIn && <li className='load-wrapper'>
            <div className='load-btn' onClick={toggleDropdown}>
              <img src='./assets/load_file.png' className='nav-icon'/>Load Project
            </div>
            <LoadFilesDropdown userProjects={userProjects} setTree={setTree} setCurrentProject={setCurrentProject} deleteProject={deleteProject} uid={uid} dropdownStatus={dropdownStatus} toggleModal={toggleModal} />
          </li>}
          {userLoggedIn && <li onClick={() => toggleModal('save')}><img src='./assets/save_file.png' className='nav-icon'/>Save Project</li>}
        </ul>
        <div className='logout-wrapper'>
          {userLoggedIn && (<div id='logout-btn' onClick={() => toggleModal('logout')}>
            <img src='./assets/logout.png' className='nav-icon'/>
            <span>Log Out</span>
          </div>)}
          {!userLoggedIn && (<div id='logout-btn' onClick={() => ipcRenderer.send('login', 'login')}>
            <img src='./assets/login.png' className='nav-icon'/>
            <span>Log In</span>
          </div>)}
        </div>
      </nav>
    )
  }
}
