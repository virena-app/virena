import React, { Component } from 'react';

export default class LoadFilesDropdown extends Component {

  render() {
    const { userProjects, setTree, setProjectName } = this.props
    return (
      <div className="menu">
        {userProjects.map(project => <button onClick={()=> {
          setTree(project.treeData)
          setProjectName(project.projectName);
        }}>{project.projectName}</button>)}
      </div>
    )
  }
}
