import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';
import TopNav from '../components/TopNav.jsx';
import ViewContainer from './ViewContainer.jsx';
import TreeContainer from './TreeContainer.jsx';
import PanelContainer from './PanelContainer.jsx';

const mapStateToProps = store => ({
  userLoggedIn: store.data.userLoggedIn
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
})

class AppContainer extends Component {
  componentDidMount() {
    console.log('AppContainer Mounted!')
  }
  render() {
    const { userLoggedIn, logout } = this.props
    console.log('AppContainer Rendered')
    return (
      <div>
        <TopNav userLoggedIn={userLoggedIn} logout={logout}/>
        <div className='main'>
        <ViewContainer />
        <div className='vertical-line'></div>
        <TreeContainer />
        <div className='vertical-line'></div>
        <PanelContainer />
      </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AppContainer)