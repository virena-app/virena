import reducers from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

const store = createStore(
  reducers,
  applyMiddleware(thunk)
)

export default store;
