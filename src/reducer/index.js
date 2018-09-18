import { combineReducers } from 'redux'
import compReducer from './compReducer'

const reducers = combineReducers({
  compReducer: compReducer,
})

export default reducers