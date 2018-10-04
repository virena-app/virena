import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';
import PhoneContainer from './PhoneContainer.jsx';
import { Button, withStyles } from '@material-ui/core/';

const mapStateToProps = store => ({
  phone: store.data.phone,
})

const mapDispatchToProps = dispatch => ({
  changePhone: (phone, screen) => dispatch(actions.changePhone(phone, screen)),
})

const styles = theme => ({
  onButton: {
    background: '#2068c9',
    color: '#eee !important'
  },
  offButton: {
    background: '#d5d5d5'
  }
})
class ViewContainer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className='view'>
        <div className={this.props.phone}>
            <PhoneContainer />
        </div>
        <div className='row ios-android'>
          <Button 
            onClick={() => this.props.changePhone('iphone-view', 'iphone-screen column')}
            variant='contained'
            color='primary'
            className={this.props.phone === 'iphone-view' ? classes.onButton : classes.offButton}>
            iOS
            </Button>
          <Button 
            onClick={() => this.props.changePhone('android-view', 'android-screen column')}
            variant='contained'
            color='primary'
            className={this.props.phone === 'android-view' ? classes.onButton : classes.offButton}>
            Android
          </Button>
        </div>
      </div>
    )
  }
}

export default (withStyles(styles))(withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewContainer)));