import * as types from '../constants/actionTypes.js'

const initialState = {
  components: [
    { 
      title: 'Drawer Navigator',
      expanded: true,
      subtitle: 'Drawer',
      children: [
        {
          title: 'Tab Navigator',
          expanded: true,
          subtitle: 'Tab',
          children: [
            {
              title: 'Tab A screen',
              subtitle: 'screen',
            },
            {
              title: 'Tab B screen',
              subtitle: 'screen'
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

