import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from './history';
import thunk from 'redux-thunk';
import reducers from './reducers/index.js'

const store = createStore(
  connectRouter(history)(reducers),
  compose(applyMiddleware(thunk, routerMiddleware(history)))
)

export default store;
