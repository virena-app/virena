import React, { Component } from 'react';

export default class LoadFilesDropdown extends Component {

  render() {
    const { userProjects, setTree } = this.props
    return (
      <div className="menu">
        {userProjects.map(project => <button onClick={()=>setTree(project.treeData)}>{project.projectName}</button>)}
      </div>
    )
  }
}
