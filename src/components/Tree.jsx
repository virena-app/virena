import React, {Component} from 'react';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';
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
                <button
                  onClick={() => this.props.addChild('hi', 'hi', getNodeKey, path)}
                >
                  Add Child
                </button>,
                <button
                onClick={() => this.props.deleteComponent(getNodeKey, path)}
                >
                  Remove
                </button>
              ],
            })}
          />
    )
  }
}