import * as types from '../constants/actionTypes';

export const setTree = treeData => ({
  type: types.SET_TREE,
  payload: treeData
})

export const setParentName = name => ({
  type: types.SET_PARENT_NAME,
  payload: name
})

export const addParent = name => ({
  type: types.ADD_PARENT,
  payload: name
})

export const addChild = (name, type, key, path, id) => ({
  type: types.ADD_CHILD,
  payload: {
    title: name,
    subtitle: type,
    key,
    path,
    id
  }
})

export const deleteComponent = (key, path) => ({
  type: types.DELETE_COMPONENT,
  payload: {
    key,
    path
  }
})

export const selectComponent = (node) => ({
  type: types.SELECT_COMPONENT,
  payload: {
    ...node
  }
})

export const selectParent = (parent) => ({
  type: types.SELECT_PARENT,
  payload: parent
})

export const selectType = (navType) => ({
  type: types.SELECT_TYPE,
  payload: navType
})

export const selectInitialType = (navType) => ({
  type: types.SELECT_INITIAL_TYPE,
  payload: navType
})

export const setNameToChange = name => ({
  type: types.SET_NAME_TO_CHANGE,
  payload: name
})

export const updateNameAndType = (name, type, selected) => ({
  type: types.UPDATE_NAME_AND_TYPE,
  payload: {
    title: name,
    subtitle: type,
    selectedComponent: selected
  }
})

export const exportFiles = treeData => ({
  type: types.EXPORT_FILES,
  payload: treeData
})