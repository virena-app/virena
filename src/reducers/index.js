import {combineReducers} from 'redux';
import componentReducer from './componentReducer';

const reducers = combineReducers({
  data: componentReducer
})

export default reducers;