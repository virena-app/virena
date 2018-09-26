import * as types from '../constants/actionTypes';
import { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from 'react-sortable-tree';
import exportFiles from '../utils/exportFiles.util.js';
import { pascalCase, maxDepth, findNewNode, updateNode } from '../utils/helperFunctions.util.js'
const initialState = {
  treeData: [],
  addAsFirstChild: false,
  input: '',
  selectedComponent: {},
  initialTypeSelection: 'Choose Type',
  typeSelected: '',
  parentSelected: '',
  availableParents: [],
  changeNameInput: '',
  id: 0,
  statusPopupOpen: false, 
  statusPopupErrorOpen: false,
  fileExportModalState: false,
  drawerState: false
}
const componentReducer = (state = initialState, action) => {
  const copy = Object.assign({}, state);
  switch (action.type) {
    case types.SET_TREE:
        return {
          ...state,
          treeData: action.payload.length > 1 ? copy.treeData : action.payload
        }
    case types.SET_PARENT_NAME:
      return {
        ...state,
        input: action.payload
      }
    case types.ADD_PARENT:
      copy.treeData = state.treeData.slice()
      copy.treeData.push({
        title: pascalCase(copy.input),
        subtitle: copy.initialTypeSelection,
        id: copy.id,
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
      const newTreeData = addNodeUnderParent({
        treeData: copy.treeData,
        parentKey: path1[path1.length - 1],
        expandParent: true,
        getNodeKey: key1,
        newNode: action.payload,
        addAsFirstChild: copy.addAsFirstChild,
      }).treeData;
      const newNode = findNewNode(copy.treeData, newTreeData);
      return {
        ...state,
        treeData: maxDepth(newTreeData) > 5 ? copy.treeData : newTreeData,
        id: copy.id + 1,
        selectedComponent: newNode
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
      return {
        ...state,
        selectedComponent: {...action.payload},
        changeNameInput: action.payload.title,
        typeSelected: action.payload.subtitle
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
      const updated = updateNode(copy.treeData, action.payload.title, action.payload.subtitle, action.payload.selectedComponent)
      return {
        ...state,
        treeData: updated
      }
    case types.EXPORT_FILES:
      console.log('asfsf', action.payload)
      //todo: 
      //1. take out hardcoded path
      //2. take it out of the reducer since it does nothing to change state, it's a util function
      //3. implement actions to notify the user when the export file is in the process of finishing and actually finishes
      // exportFiles(action.payload, '/Users/danielmatuszak/Desktop/Codesmith/TestRNVirena')
      //add logic to manipulate statusPopupOpen to be true?
      //also statusPopupErrorOpen
      return state;
    case types.EXPORT_FILES_SUCCESS:
      console.log('successful export!');
      return {
        ...state,
        statusPopupOpen: action.payload.status
      }
    case types.EXPORT_FILES_FAIL:
      console.log(action.payload.err)
      return {
        ...state,
        statusPopupErrorOpen: action.payload.status
      }
    case types.CLOSE_STATUS_POPUP:
      
      return {
        ...state,
        statusPopupOpen: action.payload, 
        statusPopupErrorOpen: action.payload,
      }
    case types.OPEN_DRAWER:
      return {
        ...state,
        drawerState: !state.drawerState
      }

    case types.CLOSE_DRAWER:
      return {
        ...state,
        drawerState: false
      }
    default: 
      return state;
  }
}
export default componentReducer;