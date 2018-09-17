import React, { Component } from 'react'
import { connect } from 'react-redux'
// import * as actions from './actions/actions.js'
import ViewContainer from './ViewContainer.jsx'
import LeftContainer from './LeftContainer.jsx';
import RightContainer from './RightContainer.jsx'
import '../visuals/styles.css'

const mapStateToProps = store => ({
  
})

const mapDispatchToProps = dispatch => ({

})

class AppContainer extends Component {

  render() {
    return (
      <div className='app-container'>
        <LeftContainer />
        <ViewContainer />
        <RightContainer />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);