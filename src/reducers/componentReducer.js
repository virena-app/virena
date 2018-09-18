import * as types from '../constants/actionTypes';
import { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';


const initialState = {
  treeData: [{title: 'Hello', subtitle: 'Test'}],
  addAsFirstChild: false,
  input: ''
}

const componentReducer = (state = initialState, action) => {
  const copy = Object.assign({}, state);

  switch (action.type) {
    case types.SET_TREE:
        return {
          ...state,
          treeData: action.payload
        }

    case types.SET_PARENT_NAME:
      return {
        ...state,
        input: action.payload
      }

    case types.ADD_PARENT:
      copy.treeData = state.treeData.slice()
      copy.treeData.push({
        title: copy.input,
      })

    return {
      ...state,
      treeData: copy.treeData,
      input: ''
    }

    case types.ADD_CHILD:
      const key1 = action.payload.key;
      const path1 = action.payload.path;

      return {
        ...state,
        treeData: addNodeUnderParent({
          treeData: copy.treeData,
          parentKey: path1[path1.length - 1],
          expandParent: true,
          getNodeKey: key1,
          newNode: action.payload,
          addAsFirstChild: copy.addAsFirstChild,
        }).treeData,
      }

    case types.DELETE_COMPONENT:
      const key2 = action.payload.key;
      const path2 = action.payload.path;

      return {
        ...state,
        treeData: removeNodeAtPath({
          treeData: copy.treeData,
          path: path2,
          getNodeKey: key2,
        }),
      }

    default: 
      return state;
  }
}

export default componentReducer;