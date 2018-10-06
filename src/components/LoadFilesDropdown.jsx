import React, { Component } from 'react';

export default class LoadFilesDropdown extends Component {

  render() {
    const { userProjects, setTree, setCurrentProject, uid, dropdownStatus, toggleModal } = this.props
    const loadMenuClass = dropdownStatus? 'load-menu down': 'load-menu';
    return (
      <div className={loadMenuClass}>
        {userProjects.map((project) => (
          <div className='load-items'>
            <div className='load-item' onClick={()=> {
              setTree(project.treeData)
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
