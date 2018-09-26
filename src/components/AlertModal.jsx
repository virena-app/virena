import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';



function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 150,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 20,
  },
});

class AlertModal extends React.Component {
  

  handleOpen(){
    // this.setState({ open: true });
  };

  handleClose(){
    // this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={() => this.props.closeExportModal(false)}>Close</Button>
        <Modal
          aria-labelledby="alert-modal-title"
          aria-describedby="alert-modal-description"
          open={this.props.fileExportModalState.open}
          onClose={() => this.props.closeExportModal(false)}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Files Exported!
            </Typography>
            <Typography variant="subheading" id="alert-modal-description">
            </Typography>
            <AlertModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

AlertModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AlertModalWrapped = withStyles(styles)(AlertModal);

export default AlertModalWrapped