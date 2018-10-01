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
          style: selectedComponent.id === node.id ? { color: 'yellow', fontSize: '17px', fontWeight: '700', height: '52px', backgroundColor: 'red', border: '1px solid yellow' } : { backgroundColor: '#282828', borderRadius: '2px', border: '1px solid red', height: '44px'}
        })}
      />
    )
  }
}

// Tree.propTypes = {
//   //check to make sure props.
//   treeData: PropTypes.array,
// }