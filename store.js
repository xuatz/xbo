import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

import rootReducer from './reducers';

// add support for Redux dev tools
const isBrowser = typeof window !== 'undefined';
const composeEnhancers = isBrowser &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	: compose;

export const initStore = initialState => {
	return createStore(
		rootReducer,
		initialState,
		composeEnhancers(applyMiddleware(thunkMiddleware))
	);
};
