import React, {Component} from 'react';
import Tree from '../components/Tree.jsx';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store =>({
  treeData: store.data.treeData,
  input: store.data.input,
  id: store.data.id,
})

const mapDispatchToProps = dispatch => ({
  setTree: treeData => dispatch(actions.setTree(treeData)),
  addChild: (name, type, key, path, id) => dispatch(actions.addChild(name, type, key, path, id)),
  deleteComponent: (key, path) => dispatch(actions.deleteComponent(key, path)),
  selectComponent: (name, subtitle, children, key, path) => dispatch(actions.selectComponent(name, subtitle, children, key, path)),
  // loadParentsDropdown: () => dispatch(actions.loadParentsDropdown()),
})

class RightContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { treeData, input, setTree, addChild, deleteComponent, selectComponent, id } = this.props;
    return (
      <div className='right'>
        <Tree 
          treeData={treeData} 
          setTree={setTree} 
          addChild={addChild} 
          deleteComponent={deleteComponent} 
          selectComponent={selectComponent} 
          input={input}
          id={id}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (RightContainer);
