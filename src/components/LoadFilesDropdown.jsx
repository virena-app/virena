import React, { Component } from 'react';
import { findMaxId } from '../utils/helperFunctions.util.js'

export default class LoadFilesDropdown extends Component {

  render() {
    const { userProjects, setTree, setCurrentProject, uid, dropdownStatus, toggleModal, setId } = this.props
    const loadMenuClass = dropdownStatus? 'load-menu down': 'load-menu';
    return (
      <div className={loadMenuClass}>
        {userProjects.map((project) => (
          <div className='load-items'>
            <div className='load-item' onClick={()=> {
              setTree(project.treeData)
              setId(findMaxId(project.treeData) + 1);
              setCurrentProject(project);
            }}>{project.projectName}
            </div>
            <button id='delete-item' onClick={() => {
              toggleModal('delete', project.projectName, uid)
            }}><img src='./assets/close.png' id='delete-cross' /></button>
          </div>
        ))}
      </div>
    )
  }
}
