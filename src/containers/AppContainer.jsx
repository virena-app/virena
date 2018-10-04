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

const mapStateToProps = store => ({
  userLoggedIn: store.data.userLoggedIn,
  modalStatus: store.data.modalStatus,
  modalAction: store.data.modalAction,
  uid: store.data.uid,
  userProjects: store.data.userProjects,
  projectNameInput: store.data.projectNameInput,
  treeData: store.data.treeData,
  displayName: store.data.displayName
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
  reset: () => dispatch(actions.reset()),
  toggleModal: (use) => dispatch(actions.toggleModal(use)),
  setUserData: (loginData) => dispatch(actions.setUserData(loginData)),
  setUserProjects: (userProjects) => dispatch(actions.setUserProjects(userProjects)),
  setTree: (treeData) => dispatch(actions.setTree(treeData)),
  addUserProject: (treeData, projectNameInput, uid, displayName) => dispatch(actions.addUserProject(treeData, projectNameInput, uid, displayName)),
  changeProjectNameInput: (projectNameInput) => dispatch(actions.changeProjectNameInput(projectNameInput)),
  setProjectName: (projectName) => dispatch(actions.setProjectName(projectName)),
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
    const { userLoggedIn, logout, modalStatus, toggleModal, modalAction, reset, userProjects, setTree, treeData, uid, displayName, addUserProject, projectNameInput, changeProjectNameInput, setProjectName } = this.props
    return (
      <div>
        <TopNav userLoggedIn={userLoggedIn} logout={logout} modalStatus={modalStatus} toggleModal={toggleModal} reset={reset} userProjects={userProjects} setTree={setTree} addUserProject={addUserProject} changeProjectNameInput={changeProjectNameInput} projectNameInput={projectNameInput} treeData={treeData} displayName={displayName} uid={uid}/>
        {modalStatus && <InfoModal modalStatus={modalStatus} toggleModal={toggleModal} modalAction={modalAction} logout={logout} reset={reset} addUserProject={addUserProject} changeProjectNameInput={changeProjectNameInput} projectNameInput={projectNameInput} treeData={treeData} uid={uid} displayName={displayName}/>}
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