import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';
import PhoneContainer from './PhoneContainer.jsx';

const mapStateToProps = store => ({
  phone: store.data.phone,
  // screen: store.data.screen,
})

const mapDispatchToProps = dispatch => ({
  changePhone: (phone, screen) => dispatch(actions.changePhone(phone, screen)),
  // changeScreen: screen => dispatch(actions.changeScreen(screen)),
})
class ViewContainer extends Component {
  render() {
    return (
      <div className='view'>
        <div className={this.props.phone}>
            <PhoneContainer />
        </div>
        <div className='row ios-android'>
          <button onClick={() => this.props.changePhone('iphone-view', 'iphone-screen column')}>iOS</button>
          <button onClick={() => this.props.changePhone('android-view', 'android-screen column')}>Android</button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewContainer));