import React, { Component } from 'react';

export default class SaveAsForm extends Component {

  render() {
    const { treeData, uid, displayName, addUserProject, projectNameInput, changeProjectNameInput } = this.props;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        addUserProject(treeData, projectNameInput, uid, displayName)
      }}>

        <input type='text' value={projectNameInput} onChange={(e) => {
          changeProjectNameInput(e.target.value)
        }}/>
        <button>Save As</button>
      </form>
    )
  }
}