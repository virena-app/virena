import * as types from '../constants/actionTypes';
import { addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from 'react-sortable-tree';
import exportFiles from '../utils/exportFiles.util.js';

const initialState = {
  treeData: [ 
    {
      title: 'Hello', 
      subtitle: 'Drawer', 
      children: [
        { 
          title: 'World', 
          subtitle: 'BottomTab', 
          children: [ {title: 'TabA', subtitle: 'Simple Screen'} ]
        },
        {
          title: 'DrawerChild',
          subtitle: 'Simple Screen'
        }
      ]
    } 
  ],
  addAsFirstChild: false,
  input: '',
  selectedComponent: {},
  initialTypeSelection: '',
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
        subtitle: copy.initialTypeSelection,
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

    case types.SELECT_COMPONENT:
      const subtitle = action.payload.subtitle;
      const title = action.payload.title;
      const key3 = action.payload.key;
      const path3 = action.payload.path;
      
      copy.selectedComponent = {};
      
      if(action.payload.children && action.payload.children.length)
        copy.selectedComponent.children = Object.assign([], action.payload.children);
      // copy.selectedComponent.push({ title, path: path3, key: key3 });
      copy.selectedComponent.title = title;
      copy.selectedComponent.subtitle = subtitle;
      copy.selectedComponent.path = path3;
      copy.selectedComponent.key = action.payload.realKey;

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

      return {
        ...state,
        treeData: changeNodeAtPath({
          treeData: copy.treeData,
          path: path4,
          newNode: (({ node }) => ({ ...node, title: action.payload.title, subtitle: action.payload.subtitle })),
          getNodeKey: key4,
        })
      }
      case types.EXPORT_FILES:
        console.log('asfsf', action.payload)
        //todo: 
        //1. take out hardcoded path
        //2. take it out of the reducer since it does nothing to change state, it's a util function
        //3. implement actions to notify the user when the export file is in the process of finishing and actually finishes
        exportFiles(action.payload, '/Users/jchan/Documents/virena/src/reducers/')
        return state;
    default: 
      return state;
  }
}

export default componentReducer;