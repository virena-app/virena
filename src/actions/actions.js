import * as types from '../constants/actionTypes';
const { ipcRenderer } = require('electron')
import exportFilesUtil from '../utils/exportFiles.util.js';
import saveProjectUtil from '../utils/saveProject.util.js';
import deleteProjectUtil from '../utils/deleteProject.util.js'


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

export const addChild = (name, type, key, path, id, header) => ({
  type: types.ADD_CHILD,
  payload: {
    title: name,
    subtitle: type,
    key,
    path,
    id,
    headerStatus: header
  }
})

export const deleteComponent = (node) => ({
  type: types.DELETE_COMPONENT,
  payload: {
    ...node
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

export const updateNameAndType = (name, type, header, selected) => ({
  type: types.UPDATE_NAME_AND_TYPE,
  payload: {
    title: name,
    subtitle: type,
    headerStatus: header,
    selectedComponent: selected
  }
})

export const exportFiles = ( treeData, path ) => (dispatch) => {
  console.log('treeData in exportFiles actions', treeData);
  
  exportFilesUtil(treeData, path)
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

export const saveProject = (treeData, projectName, uid, displayName) => (dispatch) => {
  saveProjectUtil(treeData, projectName || 'projectName', uid, displayName)
    .then(record => dispatch({
      type: types.SAVE_PROJECT_SUCCESS,
      payload: {
        record,
        status: true,
      }
    }))
    .catch(err => dispatch({
      type: types.SAVE_PROJECT_FAIL,
      payload: {
        status: true,
        err
      }
    }))
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

export const openDirectory = () => (dispatch) => {
  ipcRenderer.send('selectFileDirectory')
}

export const changePhone = (phone, screen) => ({
  type: types.CHANGE_PHONE,
  payload: {
    phone: phone,
    screen: screen
  }
})

export const toggleLogo = () => ({
  type: types.TOGGLE_LOGO
})

// export const changeScreen = (screen) => ({
//   type: types.CHANGE_SCREEN,
//   payload: screen
// })
export const setUserData = (loginData) => ({
  type: types.SET_USER_DATA,
  payload: {
    ...loginData,
  }
})

export const logout = () => ({
  type: types.LOGOUT
})

export const toggleModal = (use, project, uid) => ({
  type: types.TOGGLE_MODAL,
  payload: {
    use,
    project,
    uid
  }
})

export const reset = () => ({
  type: types.RESET
})

export const setUserProjects = (userProjects) => ({
  type: types.SET_USER_PROJECTS,
  payload: userProjects
})

export const updateUserProjects = (userProject) => ({
  type: types.UPDATE_USER_PROJECTS,
  payload: userProject
})

export const changeProjectNameInput = (name) => ({
  type: types.CHANGE_PROJECT_NAME_INPUT,
  payload: name
})

export const addUserProject = (treeData, projectNameInput, uid, displayName) => (dispatch) => {
  saveProjectUtil(treeData, projectNameInput, uid, displayName)
    .then(record => dispatch({
      type: types.ADD_USER_PROJECT,
      payload: {
        projectName: projectNameInput,
        treeData
      }
    }))
    .catch(err => dispatch({
      type: types.SAVE_PROJECT_FAIL,
      payload: {
        status: true,
        err
      }
    }))
}

export const setCurrentProject = ({projectName, treeData}) => ({
  type: types.SET_CURRENT_PROJECT,
  payload: {
    projectName,
    treeData
  }
})

export const deleteProject = (projectName, uid) => (dispatch) => {
  deleteProjectUtil(projectName, uid)
    .then(response => dispatch({
      type: types.DELETE_PROJECT,
      payload: projectName
    }))
}

export const toggleHeader = (title, type, header, selected) => ({
  type: types.TOGGLE_HEADER,
  payload: {
    title: title,
    subtitle: type,
    headerStatus: header,
    selectedComponent: selected
  }
})

export const toggleDropdown = () => ({
  type: types.TOGGLE_DROPDOWN
})

export const setId = (id) => ({
  type: types.SET_ID,
  payload: id
})

export const toggleDupsErrorSnackbar = () => ({
  type: types.TOGGLE_DUPS_ERROR_SNACKBAR,
  payload: true
})