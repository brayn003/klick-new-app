import {
  createStore, applyMiddleware, compose,
} from 'redux';
import rootReducer from 'store';

import thunk from 'redux-thunk';

const enhancers = [];
const middleware = [thunk];

// if (process.env.NODE_ENV !== 'production') {
//   // middleware.push(logger);
// }

const composeWithDevTools = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers);

export default function initializeStore(initialState = {}) {
  return createStore(rootReducer, initialState, composedEnhancers);
}
