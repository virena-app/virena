import StatusPopupContent from './StatusPopupContent.jsx'
import Snackbar from '@material-ui/core/Snackbar'
import { withStyles } from '@material-ui/core/styles'
import React, { Component } from 'react'
import PropTypes from 'prop-types'


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

const StatusPopup = (props) => {
  const { classes, statusPopupOpen, statusPopupErrorOpen, closeStatusPopup, exportErrMsg } = props;

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={statusPopupOpen}
        autoHideDuration={6000}
        onClose={closeStatusPopup}
      >
        <StatusPopupContent 
          variant='success'
          className={classes.margin}
          message='Files successfully exported!'
          onClose={closeStatusPopup}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={statusPopupErrorOpen}
        autoHideDuration={6000}
        onClose={closeStatusPopup}
      >
        <StatusPopupContent 
          variant='error'
          className={classes.margin}
          message='File Export Error. Files need to be named/Navigators must have children. May have generated App.js and Screen components without navigators'
          onClose={closeStatusPopup}
        />
      </Snackbar>
    </div>
  )
}

StatusPopup.propTypes = {
  closeStatusPopup: PropTypes.func.isRequired,
  statusPopupOpen: PropTypes.bool.isRequired,
  statusPopupErrorOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StatusPopup)