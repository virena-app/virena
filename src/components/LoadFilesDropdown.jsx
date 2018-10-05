import React, { Component } from 'react';

export default class LoadFilesDropdown extends Component {

  render() {
    const { userProjects, setTree, setProjectName, deleteProject, uid } = this.props
    return (
      <div className="load-menu">
        {userProjects.map((project, i) => (
          <div onClick={()=> {
            setTree(project.treeData)
            setProjectName(project.projectName);
          }}>{project.projectName}
            <button onClick={() => {
              deleteProject(project.projectName, uid)
            }}>Delete{i}</button>
          </div>
        ))}
      </div>
    )
  }
}
