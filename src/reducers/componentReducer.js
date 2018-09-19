import * as types from '../constants/actionTypes';
import { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from 'react-sortable-tree';
import React from 'react'

const initialState = {
  treeData: [{title: 'Hello', subtitle: 'Test'}],
  addAsFirstChild: false,
  input: '',
  selectedComponent: [],
  typeSelected: '',
  parentSelected: '',
  availableParents: [],
  changeNameInput: '',
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
    case types.LOAD_PARENTS_DROPDOWN:
      let output = [];
      const getAllParents = (tree) => {
        tree.forEach(branch => {
          if (branch.type !== "screen") {
            output.push({title: branch.title, id: branch.id})
          }
          if (branch.children && branch.children.length > 0) {
            getAllParents(branch.children);
          }
        })
      }
      getAllParents(state.treeData);
      console.log(output);
      let results = output.map(titleObj => <option value={titleObj.title} key={titleObj.id}>{titleObj.title, titleObj.id}</option>);
      console.log('inside reducer load parents');
      return {
        ...state,
        availableParents: results
      }

    case types.SELECT_COMPONENT:
      const key3 = action.payload.key;
      const path3 = action.payload.path;
      const title = action.payload.title;
      copy.selectedComponent = [];
      copy.selectedComponent.push({ title, path: path3, key: key3 });
      console.log('Selected Component reducer on save?');
      return {
        ...state,
        selectedComponent: copy.selectedComponent
      }

    case types.SELECT_TYPE:
      return {
        ...state,
        typeSelected: action.payload
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

      return {
        ...state,
        treeData: changeNodeAtPath({
          treeData: copy.treeData,
          path: path4,
          newNode: (({ node }) => ({ ...node, title: action.payload.title, subtitle: action.payload.subtitle })),
          getNodeKey: key4,
        })
      }
    default: 
      return state;
  }
}

export default componentReducer;