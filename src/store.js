import reducers from './reducers/index';
import {createStore} from 'redux';

const store = createStore(
  reducers
)

export default store;
