import * as types from '../constants/actionTypes';

const initialState = {
  userInput: '',
}

const addCompReducer = (state=initialState, action) => {
  switch(action.type) {
    case types.ADD_USERINPUT:
      return {
        userInput: action.payload
      }

    default:
      return state;
  }
}

export default addCompReducer;