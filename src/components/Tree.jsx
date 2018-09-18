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
            generateNodeProps={({ path }) => ({
              buttons: [
                <button onClick={() => this.props.addChild('hi', 'hi', getNodeKey, path)}>
                  +
                </button>,
                <button onClick={() => this.props.deleteComponent(getNodeKey, path)}>
                  -
                </button>
              ],
            })}
          />
    )
  }
}