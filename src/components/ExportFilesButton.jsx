import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  exportButton: {
    background: '#2068c9',
    width: '250px',
    marginTop: '0px'
  }
})

class ExportFilesButton extends Component {
  render() {
    const {treeData, openDirectory, classes, statusPopupOpen, statusPopupErrorOpen, closeStatusPopup} = this.props;
    return (
      <Button variant="contained" color="primary"
      className={classes.exportButton} 
      onClick={openDirectory}>
        Export
      </Button>
    );
  }
}

export default (withStyles(styles)) (ExportFilesButton);