import React, {Component} from 'react';
import Tree from '../components/Tree.jsx';
import {connect} from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = store =>({
  treeData: store.data.treeData,
  selectedComponent: store.data.selectedComponent,
  input: store.data.input,
  id: store.data.id,
  headerStatus: store.data.headerStatus,
})

const mapDispatchToProps = dispatch => ({
  setTree: treeData => dispatch(actions.setTree(treeData)),
  addChild: (name, type, key, path, id) => dispatch(actions.addChild(name, type, key, path, id)),
  deleteComponent: (key, path) => dispatch(actions.deleteComponent(key, path)),
  selectComponent: (name, subtitle, children, key, path) => dispatch(actions.selectComponent(name, subtitle, children, key, path)),
  toggleHeader: headerStatus => dispatch(actions.toggleHeader(headerStatus)),
})

class TreeContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { treeData, input, setTree, addChild, deleteComponent, selectComponent, selectedComponent, id, headerStatus, toggleHeader } = this.props;
    return (
      <div className='tree'>
        <Tree 
          treeData={treeData} 
          setTree={setTree} 
          addChild={addChild} 
          deleteComponent={deleteComponent} 
          selectComponent={selectComponent} 
          selectedComponent={selectedComponent}
          input={input}
          id={id}
          headerStatus={headerStatus}
          toggleHeader={toggleHeader}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (TreeContainer);
