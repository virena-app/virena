import { combineReducers } from 'redux'
import compReducer from './compReducer'
import addCompReducer from './addCompReducer';

const reducers = combineReducers({
  compReducer: compReducer,
})

export default reducers