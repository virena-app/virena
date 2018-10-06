import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ipcRenderer } from 'electron';
import SaveAsForm from './SaveAsForm.jsx';

const styles = theme => ({
  modalwrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    backgroundColor: 'white',
    outline: 'none',
    padding: '50px',
    display: 'inherit',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class InfoModal extends Component {
  render() {
    const { modalStatus, toggleModal, classes, modalAction, logout, reset, treeData, uid, displayName, addUserProject, projectNameInput, changeProjectNameInput, deleteProject, deleteTarget, deleteTargetUid } = this.props;
    let modalText;
    if (modalAction === 'logout') modalText = 'Are you sure you want to log out? (Unsaved progress will be lost)'
    else if (modalAction === 'reset') modalText = 'Create new project?'
    else if (modalAction === 'save') modalText = 'Save Project As:'
    else if (modalAction === 'delete') modalText = 'Are you sure you want to delete this project?'
    return (
      <Modal open={modalStatus} onClose={toggleModal} className={classes.modalwrapper}>
        <div className={classes.modal}>
          <Typography variant='title' id='title'>
            {modalText}
          </Typography>
          {(modalAction === 'logout' || modalAction === 'reset' || modalAction === 'delete') && <div>
            <Button color="primary" className={classes.button} onClick={() => {
              if (modalAction === 'logout') {
                logout()
                ipcRenderer.send('logout', 'logout')
              } else if (modalAction === 'reset') {
                reset()
              } else if (modalAction === 'delete') {
                deleteProject(deleteTarget, deleteTargetUid)
              }
              toggleModal('')
            }}>Yes</Button>
            <Button color="primary" className={classes.button} onClick={toggleModal}>No</Button>
          </div>}
          {modalAction === 'save' && <div>
            <SaveAsForm addUserProject={addUserProject} changeProjectNameInput={changeProjectNameInput} projectNameInput={projectNameInput} treeData={treeData} uid={uid} displayName={displayName} toggleModal={toggleModal}/>
          </div>}
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles) (InfoModal);