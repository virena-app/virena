import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import { setUserProjects } from '../actions/actions';

const styles = theme => ({
  saveButton: {
    background: '#2068c9',
    width: '250px',
    marginTop: '50px'
  }
})

class UpdateProjectButton extends Component {
  render() {
    const {treeData, saveProject, classes, currentProject, uid, displayName, updateUserProjects} = this.props;
    return (
      <Button variant="contained" color="primary"
      className={classes.saveButton} 
      onClick={() => {
        saveProject(treeData, currentProject.projectName, uid, displayName)
        updateUserProjects({projectName: currentProject.projectName, treeData})
      }}>
        Update Project
      </Button>
    );
  }
}

export default (withStyles(styles)) (UpdateProjectButton);