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
  selectComponent: (name, key, path) => dispatch(actions.selectComponent(name, key, path)),
})

class RightContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { treeData, input, setTree, addChild, deleteComponent, selectComponent } = this.props;
    return (
      <div className='right'>
        <Tree treeData={treeData} setTree={setTree} addChild={addChild} deleteComponent={deleteComponent} selectComponent={selectComponent} input={input}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (RightContainer);
