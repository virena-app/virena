import * as types from '../constants/actionTypes';
import { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from 'react-sortable-tree';
import React from 'react';
import exportFiles from '../utils/exportFiles.util.js';

const initialState = {
  treeData: [],
  addAsFirstChild: false,
  input: '',
  selectedComponent: {},
  initialTypeSelection: '',
  typeSelected: '',
  parentSelected: '',
  availableParents: [],
  changeNameInput: '',
  id: 1,
  // parentId: 0,
  // parents: {},
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
        subtitle: copy.initialTypeSelection,
        id: copy.id
      })
      const copyid = copy.id + 1;

    return {
      ...state,
      treeData: copy.treeData,
      input: '',
      id: copyid,
    }

    case types.ADD_CHILD:
      const key1 = action.payload.key;
      const path1 = action.payload.path;
      // const currParentId = action.payload.parentId;
      console.log('path being clicked on?', path1);
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
        id: copy.id + 1,
        // parentId: currParentId
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

    case types.SELECT_COMPONENT:
      const title = action.payload.title;
      const subtitle = action.payload.subtitle;
      // const parentId = action.payload.parentId;
      // const id = action.payload.id;
      const key3 = action.payload.key;
      const path3 = action.payload.path;
      
      copy.selectedComponent = {};
      if(action.payload.children && action.payload.children.length)
        copy.selectedComponent.children = Object.assign([], action.payload.children);
      
      copy.selectedComponent.title = title;
      copy.selectedComponent.subtitle = subtitle;
      // copy.selectedComponent.parentId = parentId;
      // copy.selectedComponent.id = id;
      copy.selectedComponent.path = path3;
      copy.selectedComponent.key = key3;

      return {
        ...state,
        selectedComponent: copy.selectedComponent
      }

    case types.SELECT_TYPE:
      return {
        ...state,
        typeSelected: action.payload
      }
    case types.SELECT_INITIAL_TYPE:
      return {
        ...state,
        initialTypeSelection: action.payload
      }
    case types.SELECT_PARENT:
      return {
        ...state,
        parentSelected: action.payload
      }
    case types.SET_NAME_TO_CHANGE:
      return {
        ...state,
        changeNameInput: action.payload
      }
    case types.UPDATE_NAME_AND_TYPE:
      //update name and type of the selected component on save click
      const key4 = action.payload.key;
      const path4 = action.payload.path;
      const type = action.payload.subtitle;
      console.log('check path', path4, 'key', key4);

      // if(type === 'BottomTab') {
        
      // }

      return {
        ...state,
        treeData: changeNodeAtPath({
          treeData: copy.treeData,
          path: path4,
          newNode: (({ node }) => ({ ...node, title: action.payload.title, subtitle: type })),
          getNodeKey: key4,
        })
      }
      case types.EXPORT_FILES:
        //todo: 
        //1. take out hardcoded path
        //2. take it out of the reducer since it does nothing to change state, it's a util function
        //3. implement actions to notify the user when the export file is in the process of finishing and actually finishes
        exportFiles(action.payload, '/Users/danielmatuszak/Desktop/Codesmith/TestRNVirena')
        return state;
    default: 
      return state;
  }
}

export default componentReducer;