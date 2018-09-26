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
  const { classes, statusPopupOpen, statusPopupErrorOpen, closeStatusPopup } = props;

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
          message='Error exporting files!'
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