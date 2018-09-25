import * as types from '../constants/actionTypes';
import exportFilesAction from '../utils/exportFiles.util.js'

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

export const selectComponent = (name, type, children, key, path) => ({
  type: types.SELECT_COMPONENT,
  payload: {
    title: name,
    subtitle: type,
    children,
    key,
    path,
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

export const updateNameAndType = (name, type, key, path) => ({
  type: types.UPDATE_NAME_AND_TYPE,
  payload: {
    title: name,
    subtitle: type,
    key,
    path
  }
})

export const exportFiles = ( treeData, path ) => (dispatch) => {
  dispatch({
    type: types.EXPORT_FILES,
  });
  console.log('treeData in exportFiles actions', treeData);
  exportFilesAction(treeData, path)
    .then(data => dispatch({
      type: types.EXPORT_FILES_SUCCESS,
      payload: {
        status: true,
      }
    }))
    .catch(err => dispatch({
      type: types.EXPORT_FILES_FAIL,
      payload: {
        status: true,
        err
      }
    }));
}

export const closeStatusPopup = () => ({
  type: types.CLOSE_STATUS_POPUP,
  payload: false
})

export const openDrawer = () => ({
  type: types.OPEN_DRAWER
})

export const closeDrawer = () => ({
  type: types.CLOSE_DRAWER
})
