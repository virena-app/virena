import * as types from '../constants/actionTypes';

const initialState = {
  userInput: '',
  // components: [],
  components: [
    { 
      title: 'Crap',
      id: 1,
      expanded: true,
      type: 'Drawer Navigator',
      subtitle: 'Drawer Navigator',
      children: [
        {
          title: 'Tab Navigator',
          id: 2,
          expanded: true,
          type: 'Tab Navigator',
          subtitle: 'Tab Navigator',
          children: [
            {
              title: 'Tab A screen',
              id: 3,
              type: 'Screen',
              subtitle: 'Screen',
            },
            {
              title: 'Tab B screen',
              id: 4,
              type: 'Screen',
              subtitle: 'Screen',
            }
          ]
        }
      ]
    }
  ],
}

const compReducer = (state=initialState, action) => {
  switch(action.type) {
    case types.ADD_USERINPUT:
      return {
        ...state,
        userInput: action.payload
      }

    case types.ADD_COMPONENT:
      const newComponent = state.components.concat([{title:  state.userInput}]);
      // const newState = Object.assign({}, state);
      return {
        ...state,
        components: newComponent
      }

    case types.UPDATE_COMPONENTS:
      const updateState = Object.assign({}, state, {components: action.payload});
      // newState = action.payload;
      
      console.log('new state here', updateState);
      return updateState;

    case types.DELETE_COMPONENT:
      

    default:
      return state;
  }
}

export default compReducer

