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

export const updateComponents = (components) => ({
  type: types.UPDATE_COMPONENTS,
  payload: components
})

export const deleteComponent = (key, path) => ({
  type: types.DELETE_COMPONENT,
  payload: { key, path }
})

export const addChild = (name, type, key, path) => ({
  type: types.ADD_CHILD,
  payload: {
    title: name,
    subtitle: type,
    key,
    path
  }
})

export const selectComponent = (name, key, path) => ({
  type: types.SELECT_COMPONENT,
  payload: {
    title: name,
    key,
    path
  }
})