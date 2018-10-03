import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions/actions';
import TopNav from '../components/TopNav.jsx';
import ViewContainer from './ViewContainer.jsx';
import TreeContainer from './TreeContainer.jsx';
import PanelContainer from './PanelContainer.jsx';
import InfoModal from '../components/InfoModal.jsx';

const mapStateToProps = store => ({
  userLoggedIn: store.data.userLoggedIn,
  modalStatus: store.data.modalStatus,
  modalAction: store.data.modalAction
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout()),
  reset: () => dispatch(actions.reset()),
  toggleModal: (use) => dispatch(actions.toggleModal(use)),
})

class AppContainer extends Component {
  componentDidMount() {
    console.log('AppContainer Mounted!')
  }
  render() {
    const { userLoggedIn, logout, modalStatus, toggleModal, modalAction, reset } = this.props
    console.log('AppContainer Rendered')
    return (
      <div>
        <TopNav userLoggedIn={userLoggedIn} logout={logout} modalStatus={modalStatus} toggleModal={toggleModal} reset={reset}/>
        {modalStatus && <InfoModal modalStatus={modalStatus} toggleModal={toggleModal} modalAction={modalAction} logout={logout} reset={reset}/>}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps) (AppContainer));