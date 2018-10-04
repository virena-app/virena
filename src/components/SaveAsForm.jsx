import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  saveAsInput: {
    marginRight: '15px'
  },
  saveAsButton: {
    background: '#2068c9'
  }
})

class SaveAsForm extends Component {
  render() {
    const { classes, treeData, uid, displayName, addUserProject, projectNameInput, changeProjectNameInput, toggleModal } = this.props;
    return (
        <form className='save-form' onSubmit={(e) => {
          e.preventDefault();
          addUserProject(treeData, projectNameInput, uid, displayName)
          toggleModal('')
        }}
        >
        <Input 
          id='save-as-input'
          onChange={(e) => {
            changeProjectNameInput(e.target.value)
          }}
          className={classes.saveAsInput}
          value={projectNameInput}
          required
        />
        <Button variant="contained" type='submit' color="primary" className={classes.saveAsButton}>Save</Button>
      </form>
    )
  }
}

export default withStyles(styles) (SaveAsForm);