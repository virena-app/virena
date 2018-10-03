import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';
import TopNav from '../components/TopNav.jsx';
import ViewContainer from './ViewContainer.jsx';
import TreeContainer from './TreeContainer.jsx';
import PanelContainer from './PanelContainer.jsx';
import { db, Project } from '../models/db.js';
const { ipcRenderer } = require('electron');

const mapStateToProps = store => ({
  userLoggedIn: store.data.userLoggedIn,
  uid: store.data.uid,
  userProjects: store.data.userProjects
})

const mapDispatchToProps = dispatch => ({
  setUserProjects: (userProjects) => dispatch(actions.setUserProjects(userProjects)),
  logout: () => dispatch(actions.logout()),
  setUserData: (loginData) => dispatch(actions.setUserData(loginData))
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
            const projects = data.map(model => model.dataValues.projectName)
            setUserProjects(projects);
          }
        })
      })
    })
  }
  render() {
    const { userLoggedIn, logout, uid, userProjects } = this.props
    return (
      <div>
        <TopNav userLoggedIn={userLoggedIn} logout={logout} uid={uid} userProjects={userProjects}/>
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