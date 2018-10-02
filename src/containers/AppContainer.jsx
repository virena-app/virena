import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopNav from '../components/TopNav.jsx';
import ViewContainer from './ViewContainer.jsx';
import TreeContainer from './TreeContainer.jsx';
import PanelContainer from './PanelContainer.jsx';

const mapStateToProps = store => ({
  userLoggedIn: store.data.userLoggedIn
})

const mapDispatchToProps = dispatch => ({

})

class AppContainer extends Component {
  componentDidMount() {
    console.log('AppContainer Mounted!')
  }
  render() {
    const { userLoggedIn } = this.props
    console.log('AppContainer Rendered')
    return (
      <div>
        <TopNav userLoggedIn={userLoggedIn}/>
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