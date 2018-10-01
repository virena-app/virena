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

class ExportModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen(){
    this.setState({ open: true });
  };

  handleClose(){
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleClose}>Close</Button>
        <Modal
          aria-labelledby="alert-modal-title"
          aria-describedby="alert-modal-description"
          open={this.handleOpen}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              Enter file name
            </Typography>
            <Typography variant="subheading" id="alert-modal-description">
            </Typography>
            <ExportModalWrapped />
          </div>
        </Modal>
      </div>
    );
  }
}

ExportModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const ExportModalWrapped = withStyles(styles)(ExportModal);

export default ExportModalWrapped