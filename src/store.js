import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers"; //xz: because we have a index.js

const isBrowser = typeof window !== "undefined";
const composeEnhancers = isBrowser &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const enhancers = composeEnhancers(applyMiddleware(thunk));

const configureStore = initialState => {
    return createStore(rootReducer, initialState, enhancers);
};

export default configureStore;
