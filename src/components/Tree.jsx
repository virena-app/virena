import React, {Component} from 'react';
import SortableTree from 'react-sortable-tree';
import '../styles/tree.css';

export default class Tree extends Component {
  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    const { treeData, addChild, deleteComponent, selectComponent, id, input, setTree, selectedComponent } = this.props;
    return (
      <SortableTree
        treeData={treeData}
        onChange={treeData => setTree(treeData)}
        generateNodeProps={({ node, path }) => ({
          buttons: [
            node.subtitle !== "Simple Screen" && node.subtitle !== "" && <button onClick={() => addChild(input, '', getNodeKey, path, id)} style={{ 'fontFamily': 'Arial' }}>
              +
            </button>,
            <button onClick={() => deleteComponent(node)} style={{ 'fontFamily': 'Arial' }}>
              -
            </button>,
            <button onClick={() => selectComponent(node)} style={{ 'fontFamily': 'Arial' }}>
              Details
            </button>
          ],
          style: selectedComponent.id === node.id 
          ? { color: '#eee', fontSize: '17px', fontWeight: '700', height: '52px', backgroundColor: '#37474f', border: '2px solid #eee', filter: 'drop-shadow(0px 0px 3px #fff)' } 
          : { backgroundColor: '#37474f', borderRadius: '2px', border: 'none', height: '44px'}
        })}
      />
    )
  }
}

// Tree.propTypes = {
//   //check to make sure props.
//   treeData: PropTypes.array,
// }