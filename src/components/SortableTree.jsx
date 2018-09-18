import SortableTree, { addNodeUnderParent, removeNodeAtPath } from "react-sortable-tree";
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as actions from '../actions/actions'
import { connect } from 'react-redux'
import '../visuals/styles.css'

const mapStateToProps = store => ({
  components: store.compReducer.components,
  userInput: store.compReducer.userInput,
})

const mapDispatchToProps = dispatch => ({
  updateComponents: components => dispatch(actions.updateComponents(components)),
  deleteComponent: (key, path) => dispatch(actions.deleteComponent(key, path)),
  addChild: (name, type, key, path) => dispatch(actions.addChild(name, type, key, path)),
  selectComponent: (name, key, path) => dispatch(actions.selectComponent(name, key, path)),
})


class NavTree extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const { userInput } = this.props;
    return (
      <div className='nav-tree'>
        <SortableTree 
          style={{ backgroundColor: '#333'}}
          treeData={this.props.components}
          onChange={components => this.props.updateComponents(components)}
          generateNodeProps={({ node, path }) => ({
            buttons: [
              <button
                onClick={() => this.props.addChild(userInput, 'hi', getNodeKey, path)}
                >
                  +
                </button>,
              <button
                onClick={() => {
                  this.props.deleteComponent(getNodeKey, path)
                }}>
                -
              </button>,
              <button
                onClick={() => {
                  console.log('Edit button Clicked!', node.title, getNodeKey);
                  this.props.selectComponent(node.title, getNodeKey, path)
                }}>
                Edit
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