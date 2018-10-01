import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';
import PhoneContainer from './PhoneContainer.jsx';

const mapStateToProps = store => ({
  screen: store.data.screen,
})

const mapDispatchToProps = dispatch => ({
  changeScreen: screen => dispatch(actions.changeScreen(screen)),
})
class ViewContainer extends Component {
  render() {
    return (
      <div className='view'>
        <div className={this.props.screen}>
            <PhoneContainer />
        </div>
        <div className='row ios-android'>
          <button onClick={() => this.props.changeScreen('iphone-view')}>iOS</button>
          <button onClick={() => this.props.changeScreen('android-view')}>Android</button>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewContainer));