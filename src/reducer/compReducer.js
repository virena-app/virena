// import * as types from '../actionTypes/constants.js'

const initialState = {
  components: [
    { 
      title: 'Drawer Navigator',
      expanded: true,
      children: [
        {
          title: 'Tab Navigator',
          expanded: true,
          children: [
            {
              title: 'Tab A screen'
            },
            {
              title: 'Tab B screen'
            }
          ]
        }
      ]
    }
  ],
}

const compReducer = (state=initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default compReducer

