import {combineReducers} from 'redux';
import componentReducer from './componentReducer';


// const appReducers = combineReducers({
//   data: componentReducer
// })

// const rootReducer = (state, action) => {
//   if(action.type === 'RESET_STATE') {
//     state = undefined
//   }

//   return appReducers(state, action)
// }

const reducers = combineReducers({
  data: componentReducer
})

export default reducers;