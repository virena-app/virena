import React, { Component } from 'react';
import * as actions from '../actions/actions';
import { ipcRenderer } from 'electron';
import { withStyles, Modal, Typography, Button  } from '@material-ui/core';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = store => ({
  openModalStatus: store.data.openModalStatus,
  navTitle: store.data.navTitle
})

const mapDispatchToProps = dispatch => ({
  openModal: (openModalStatus, navTitle) => dispatch(actions.openModal(openModalStatus, navTitle)),
  resetState: () => dispatch(actions.resetState()),
})

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    // outline: 'none'
  }
})

class TopNav extends Component {
  render() {
    const { openModalStatus, openModal, navTitle, classes, resetState } = this.props;

    // const modalDialogs = () => {
    //   if(navTitle === 'add_new') {
    //     return (
    //       <div>
    //         <Typography>Would you like to create a new project?</Typography>
    //         <Button>create</Button>
    //         <Button>cancel</Button>
    //       </div>
    //     )
    //   }

    //   if(navTitle === 'load_file') {
    //     return (
    //       <div>
    //       <Typography>Would you like to load a new project?</Typography>
    //       <Button>load</Button>
    //       <Button>cancel</Button>
    //     </div>
    //     )
    //   }

    //   if(navTitle === 'save_file') {
    //     return (
    //       <div>
    //       <Typography>Would you like to load a new project?</Typography>
    //       <Button>save</Button>
    //       <Button>cancel</Button>
    //     </div>
    //     )
    //   }
    // }

    return (

      <nav className='top-nav'>
        <ul>
          <li onClick={() => openModal(openModalStatus)}><img src='./assets/add_new.png' className='nav-icon'/>New Project</li>
          <li /*onClick={() => openModal(openModalStatus, 'load_file')}*/><img src='./assets/load_file.png' className='nav-icon'/>Load Project</li>
          <li /*onClick={() => openModal(openModalStatus, 'save_file')}*/><img src='./assets/save_file.png' className='nav-icon'/>Save Project</li>
        </ul>
        <div className='logout-wrapper'>
          <div id='logout-btn' onClick={() => {
            console.log('clicked')
            ipcRenderer.send('logout', 'logout')
          }}><img src='./assets/logout.png' className='nav-icon'/>Log Out</div>
        </div>
        <Modal
          open={openModalStatus}
          onClose={() => openModal(!openModalStatus)}>
          <div style={{top: '40%', left: '35%'}} className={classes.paper}>
            <Typography>Would you like to create a new project?</Typography>
            <Button onClick={() => resetState}>create</Button>
            <Button>cancel</Button>
          </div>
        </Modal>
      </nav>
    )
  }
}

export default (withStyles(styles))(withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav)));