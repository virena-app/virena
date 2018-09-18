import React, {Component} from 'react';
import Tree from '../components/Tree.jsx';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store =>({
  treeData: store.data.treeData
})

const mapDispatchToProps = dispatch => ({
  setTree: treeData => dispatch(actions.setTree(treeData)),
  addChild: (name, type, key, path) => dispatch(actions.addChild(name, type, key, path)),
  deleteComponent: (key, path) => dispatch(actions.deleteComponent(key, path))
})

class RightContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='right'>
        <p>RightContainer</p>
        <Tree treeData={this.props.treeData} setTree={this.props.setTree} addChild={this.props.addChild} deleteComponent={this.props.deleteComponent}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (RightContainer);