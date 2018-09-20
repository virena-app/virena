import React, {Component} from 'react';
import SortableTree from 'react-sortable-tree';
import '../styles/tree.css';

export default class Tree extends Component {
  render() {
    const getNodeKey = ({ treeIndex }) => treeIndex;
    return (
      <SortableTree
            treeData={this.props.treeData}
            onChange={treeData => this.props.setTree(treeData)}
            generateNodeProps={({ node, path }) => ({
              buttons: [
                <button onClick={() => this.props.addChild(this.props.input, 'screen', getNodeKey, path)}>
                  +
                </button>,
                <button onClick={() => this.props.deleteComponent(getNodeKey, path)}>
                  -
                </button>,
              <button onClick={() => {
                console.log(this.props.treeData)
                console.log(node)
                this.props.selectComponent(node.title, node.subtitle, node.children, getNodeKey, path)}}>
                  Details
                </button>
              ],
            })}
          />
    )
  }
}

// Tree.propTypes = {
//   //check to make sure props.
//   treeData: PropTypes.array,
// }