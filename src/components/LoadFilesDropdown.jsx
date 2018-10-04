import React, { Component } from 'react';

export default class LoadFilesDropdown extends Component {

  render() {
    const { userProjects, setTree, setProjectName } = this.props
    return (
      <div className="menu">
        {userProjects.map((project, i) => (
        <div>
          <div onClick={()=> {
            setTree(project.treeData)
            setProjectName(project.projectName);
          }}>{project.projectName}
            <button>Delete{i}</button>
          </div>
        </div>
        ))}
      </div>
    )
  }
}
