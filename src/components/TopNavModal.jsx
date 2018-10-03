import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles, Typography, Button, Modal } from '@material-ui/core';

const mapStateToProps = store => ({

})

const mapDispatchToProps = ({})

class TopNavModal extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal>
          <div>
            <Typography>Would you like to create a new project?</Typography>
            <Button onClick={}>Yes</Button>
            <Button onClick={}>No</Button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)