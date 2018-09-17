import * as types from '../constants/actionTypes';

// Add a component to the sortable tree for the right column
export const addComponent = (userInput) => ({
  type: types.ADD_COMPONENT,
  payload: userInput,
});

export const addUserInput = (userInput) => ({
  type: types.ADD_USERINPUT,
  payload: userInput
});