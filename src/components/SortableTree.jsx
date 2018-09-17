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
  updateComponents: components => dispatch(actions.updateComponents(components)),
})


class NavTree extends Component {
  constructor(props) {
    super(props);

    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange(components) {
  //   this.props.updateComponents(components);
  // }

  render () {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    console.log(`node key here ${getNodeKey}`);
    console.log('store', this.props.components);
    return (
      <div className='nav-tree' 
      // style={{height: '100%'}}
      >
        <SortableTree 
          style={{ backgroundColor: '#333'}}
          treeData={this.props.components}
          onChange={components => this.props.updateComponents(components)}
          removeNodeAtPath={({ node, path }) => ({
            buttons: [
              <button
                onClick={() => {

                }}
              >
              Delete
              </button>
            ]
          })}
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