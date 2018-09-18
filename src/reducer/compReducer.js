import * as types from '../constants/actionTypes';
import { removeNodeAtPath, addNodeUnderParent } from 'react-sortable-tree';

const initialState = {
  userInput: '',
  id: 0,
  components: [],
  selectedComponent: [],
}

const compReducer = (state=initialState, action) => {
  const getNodeKey = ({ treeIndex }) => treeIndex;

  switch(action.type) {
    case types.ADD_USERINPUT:
    return {
      ...state,
      userInput: action.payload
    }
    
    case types.ADD_COMPONENT:
      // const newComponentState = addNode(state.components, )
      const newComponent = state.components.concat([{title: state.userInput, id: state.id}]);
      // const newState = Object.assign({}, state);
      return {
        ...state,
        id: state.id + 1,
        components: newComponent
      }
    
    case types.UPDATE_COMPONENTS:
      const updateState = Object.assign({}, state, {components: action.payload});
        return updateState;
    
    case types.DELETE_COMPONENT:
      const key = action.payload.key;
      const path = action.payload.path;
      return {
        ...state,
        components: removeNodeAtPath({
          treeData: state.components,
          path,
          getNodeKey: key
        })
    }

    case types.ADD_CHILD:
    const copy = Object.assign({}, state)
      const key1 = action.payload.key;
      const path1 = action.payload.path;
      return {
        ...state,
        components: addNodeUnderParent({
          treeData: copy.components,
          parentKey: path1[path1.length - 1],
          expandParent: true,
          getNodeKey: key1,
          newNode: action.payload,
          addAsFirstChild: copy.addAsFirstChild,
        }).treeData,
    }
    case types.SELECT_COMPONENT:
      const key2 = action.payload.key;
      const path2 = action.payload.path;
      const title2 = action.payload.title;
      state.selectedComponent = [];
      state.selectedComponent.push({ title: title2, path: path2, key: key2 });
      const selectedComponent = state.selectedComponent;
      return {
        ...state,
        selectedComponent
      }
    default:
      return state;
  }
}

export default compReducer


// components: [
//   { 
//     title: 'Crap',
//     expanded: true,
//     type: 'hi',
//     subtitle: 'drawer nav',
//     children: [
//       {
//         title: 'Tab Navigator',
//         expanded: true,
//         children: [
//           {
//             title: 'Tab A screen'
//           },
//           {
//             title: 'Tab B screen'
//           }
//         ]
//       }
//     ]
//   }
// ],