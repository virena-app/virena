import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';
import TopNav from '../components/TopNav.jsx';
import ViewContainer from './ViewContainer.jsx';
import TreeContainer from './TreeContainer.jsx';
import PanelContainer from './PanelContainer.jsx';
import InfoModal from '../components/InfoModal.jsx';
import { db, Project } from '../models/db.js';
const { ipcRenderer } = require('electron');
import { findMaxId } from '../utils/helperFunctions.util.js'

const mapStateToProps = store => ({
  userLoggedIn: store.data.userLoggedIn,
  modalStatus: store.data.modalStatus,
  modalAction: store.data.modalAction,
  uid: store.data.uid,
  userProjects: store.data.userProjects,
  projectNameInput: store.data.projectNameInput,
  treeData: store.data.treeData,
  displayName: store.data.displayName,
  dropdownStatus: store.data.dropdownStatus,
  deleteTarget: store.data.deleteTarget,
  deleteTargetUid: store.data.deleteTargetUid
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
  reset: () => dispatch(actions.reset()),
  toggleModal: (use, project, uid) => dispatch(actions.toggleModal(use, project, uid)),
  setUserData: (loginData) => dispatch(actions.setUserData(loginData)),
  setUserProjects: (userProjects) => dispatch(actions.setUserProjects(userProjects)),
  setTree: (treeData) => dispatch(actions.setTree(treeData)),
  addUserProject: (treeData, projectNameInput, uid, displayName) => dispatch(actions.addUserProject(treeData, projectNameInput, uid, displayName)),
  changeProjectNameInput: (projectNameInput) => dispatch(actions.changeProjectNameInput(projectNameInput)),
  setCurrentProject: (project) => dispatch(actions.setCurrentProject(project)),
  deleteProject: (projectName, uid) => dispatch(actions.deleteProject(projectName, uid)),
  toggleDropdown: () => dispatch(actions.toggleDropdown()),
  setId: (id) => dispatch(actions.setId(id)),
})

class AppContainer extends Component {
  
  componentDidMount() {
    const { setUserData, setUserProjects, userProjects } = this.props;
    ipcRenderer.on('userLoggedIn', (event,loginData) => {

      setUserData(loginData);
      const { uid } = this.props;
      db.sync()
      .then(()=> {
        Project.findAll({
          where: {
            uid
          }
        }).then(data => {
          if (data) {
            const projects = data.map(model => ({
              projectName: model.dataValues.projectName,
              treeData: model.dataValues.treeData
            }))
            setUserProjects(projects)
          }
        })
      })
    })
  }
  render() {
    const { userLoggedIn, logout, modalStatus, toggleModal, modalAction, reset, userProjects, setTree, treeData, uid, displayName, addUserProject, projectNameInput, changeProjectNameInput, setCurrentProject, deleteProject, toggleDropdown, dropdownStatus, triggerDelete, deleteTarget, deleteTargetUid, setId } = this.props
    return (
      <div onClick={() => {if (dropdownStatus && !modalStatus) toggleDropdown()}}>
        <TopNav userLoggedIn={userLoggedIn} logout={logout} modalStatus={modalStatus} toggleModal={toggleModal} reset={reset} userProjects={userProjects} setTree={setTree} addUserProject={addUserProject} changeProjectNameInput={changeProjectNameInput} projectNameInput={projectNameInput} setCurrentProject={setCurrentProject} treeData={treeData} displayName={displayName} uid={uid} deleteProject={deleteProject} toggleDropdown={toggleDropdown} dropdownStatus={dropdownStatus} setId={setId} />
        {modalStatus && <InfoModal modalStatus={modalStatus} toggleModal={toggleModal} modalAction={modalAction} logout={logout} reset={reset} addUserProject={addUserProject} changeProjectNameInput={changeProjectNameInput} projectNameInput={projectNameInput} treeData={treeData} uid={uid} displayName={displayName} deleteProject={deleteProject} deleteTarget={deleteTarget} deleteTargetUid={deleteTargetUid} />}
        <div className='main'>
        <ViewContainer />
        <div className='vertical-line'></div>
        <TreeContainer />
        <div className='vertical-line'></div>
        <PanelContainer />
      </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (AppContainer));