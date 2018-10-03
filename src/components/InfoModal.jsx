import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ipcRenderer } from 'electron';

const styles = theme => ({
  modalwrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
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
    const { modalStatus, toggleModal, classes, modalAction, logout, reset } = this.props;
    const modalText = modalAction === 'logout'? 'Are you sure you want to log out?' : 'Create new project?';
    return (
      <Modal open={modalStatus} onClose={toggleModal} className={classes.modalwrapper}>
        <div className={classes.modal}>
          <Typography variant='title' id='title'>
            {modalText}
          </Typography>
          <div>
            <Button color="primary" className={classes.button} onClick={() => {
              if (modalAction === 'logout') {
                logout()
                ipcRenderer.send('logout', 'logout')
              } else if (modalAction === 'reset') {
                reset()
              }
              toggleModal('')
            }}>Yes</Button>
            <Button color="primary" className={classes.button} onClick={toggleModal}>No</Button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles) (InfoModal);