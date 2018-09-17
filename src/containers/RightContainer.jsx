import React, { Component } from 'react'
import { connect } from 'react-redux'
// import * as actions from '../actions/actions'
import ViewContainer from './ViewContainer.jsx'
import NavTree from '../components/SortableTree.jsx'
import '../visuals/styles.css'

const mapStateToProps = store => ({
  
})

const mapDispatchToProps = dispatch => ({

})

class RightContainer extends Component {

  render() {
    return (
      <div className='column right-container'>
        <NavTree
          //components={pass in components from store}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightContainer);