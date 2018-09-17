import SortableTree, { addNodeUnderParent, removeNodeAtPath } from "react-sortable-tree";
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as actions from '../actions/actions'
import { connect } from 'react-redux'
import '../visuals/styles.css'

const mapStateToProps = store => ({
  components: store.compReducer.components,
})

const mapDispatchToProps = dispatch => ({

})


class NavTree extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    console.log('store', this.props.components);
    return (
      <div className='nav-tree' 
      // style={{height: '100%'}}
      >
        <SortableTree 
          style={{ backgroundColor: 'rgb(34, 34, 34)'}}
          treeData={this.props.components}
          onChange={treeData => this.setState({ treeData })}
          
        />
      </div>
    )
  }
}
    

NavTree.propTypes = {
  //check to make sure props.
  components: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(NavTree);