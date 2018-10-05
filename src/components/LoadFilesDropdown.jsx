import React, { Component } from 'react';
import { findMaxId } from '../utils/helperFunctions.util.js'

export default class LoadFilesDropdown extends Component {

  render() {
    const { userProjects, setTree, setCurrentProject, deleteProject, uid, setId } = this.props
    return (
      <div className="menu">
        {userProjects.map((project, i) => (
        <div>
          <div onClick={()=> {
            setTree(project.treeData);
            setId(findMaxId(project.treeData) + 1);
            setCurrentProject(project);
          }}>{project.projectName}
            <button onClick={() => {
              deleteProject(project.projectName, uid)
            }}>Delete{i}</button>
          </div>
        </div>
        ))}
      </div>
    )
  }
}
