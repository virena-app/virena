import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'white',
    outline: 'none',
    padding: '50px'
  }
})

class InfoModal extends Component {
  render() {
    const { modalStatus, toggleModal, classes, modalAction, logout, reset } = this.props;
    const modalText = modalAction === 'logout'? 'Are you sure you want to log out?' : 'Create new project?';
    return (
      <Modal open={modalStatus} onClose={toggleModal}>
        <div className={classes.modal}>
        <Typography variant='title' id='title'>
          {modalText}
        </Typography>
        <Button color="primary" className={classes.button} onClick={() => {
          if (modalAction === 'logout') {
            logout()
            ipcRenderer.send('logout', 'logout')
          } else if (modalAction === 'reset') {
            reset()
          }
          toggleModal()
        }}>Yes</Button>
        <Button color="primary" className={classes.button} onClick={toggleModal}>No</Button>
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles) (InfoModal);