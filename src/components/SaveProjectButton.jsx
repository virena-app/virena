import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  saveButton: {
    background: '#2068c9',
    width: '250px'
  }
})

class SaveProjectButton extends Component {
  render() {
    const {treeData, saveProject, classes } = this.props;
    return (
      <Button variant="contained" color="primary"
      className={classes.saveButton} 
      onClick={() => saveProject(treeData)}>
        Save My Project
      </Button>
    );
  }
}

export default (withStyles(styles)) (SaveProjectButton);