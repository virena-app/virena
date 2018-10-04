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
  const { classes, statusPopupOpen, statusPopupErrorOpen, closeStatusPopup, saveProjectOpen, saveProjectErrorOpen } = props;

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
          message='Error generating files, may have exported files without a navigator file. Please check navigation tree logic.'
          onClose={closeStatusPopup}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={saveProjectOpen}
        autoHideDuration={6000}
        onClose={closeStatusPopup}
      >
        <StatusPopupContent 
          variant='success'
          className={classes.margin}
          message='Successfully saved to db!'
          onClose={closeStatusPopup}
        />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={saveProjectErrorOpen}
        autoHideDuration={6000}
        onClose={closeStatusPopup}
      >
        <StatusPopupContent 
          variant='error'
          className={classes.margin}
          message='Error writing data to db!'
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