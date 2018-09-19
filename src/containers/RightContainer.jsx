import React, {Component} from 'react';
import Tree from '../components/Tree.jsx';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store =>({
  treeData: store.data.treeData,
  input: store.data.input
})

const mapDispatchToProps = dispatch => ({
  setTree: treeData => dispatch(actions.setTree(treeData)),
  addChild: (name, type, key, path) => dispatch(actions.addChild(name, type, key, path)),
  deleteComponent: (key, path) => dispatch(actions.deleteComponent(key, path)),
  selectComponent: (name, subtitle, children, key, path) => dispatch(actions.selectComponent(name, subtitle, children, key, path))
})

class RightContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='right'>
        <Tree 
          treeData={this.props.treeData} 
          setTree={this.props.setTree} 
          addChild={this.props.addChild} 
          deleteComponent={this.props.deleteComponent} 
          selectComponent={this.props.selectComponent} 
          input={this.props.input}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (RightContainer);
