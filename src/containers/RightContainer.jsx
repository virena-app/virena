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
<<<<<<< HEAD
  selectComponent: (name, subtitle, children, key, path) => dispatch(actions.selectComponent(name, subtitle, children, key, path))
=======
  selectComponent: (name, key, path) => dispatch(actions.selectComponent(name, key, path)),
  loadParentsDropdown: () => dispatch(actions.loadParentsDropdown()),
>>>>>>> master
})

class RightContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { treeData, input, setTree, addChild, deleteComponent, selectComponent, loadParentsDropdown } = this.props;
    return (
      <div className='right'>
<<<<<<< HEAD
        <Tree 
          treeData={this.props.treeData} 
          setTree={this.props.setTree} 
          addChild={this.props.addChild} 
          deleteComponent={this.props.deleteComponent} 
          selectComponent={this.props.selectComponent} 
          input={this.props.input}/>
=======
        <Tree treeData={treeData} setTree={setTree} addChild={addChild} deleteComponent={deleteComponent} selectComponent={selectComponent} input={input} loadParentsDropdown={loadParentsDropdown}/>
>>>>>>> master
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (RightContainer);
