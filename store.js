import { createStore, compose, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';

import axios from 'axios';

export const reducer = (
    state = {
        bookmarks: []
    },
    action
) => {
    switch (action.type) {
        case 'PUSHES_REPLACE':
            return {
                ...state,
                bookmarks: action.bookmarks || state.bookmarks,
            };
        default:
            return state;
    }
};

//actions

let API = axios.create({
    baseURL: process.env.API_URL,
    timeout: 5000,
});

export const fetchBookmarks = () => {
    return dispatch => {
        //'api.xbo.xuatz.com'
        return API.get('/bookmarks')
            .then(res => {
                dispatch({
                    type: 'PUSHES_REPLACE',
                    bookmarks: res.data || [],
                });

                return API.get('/bookmarks/fetch', {
                    timeout: 0,
                })
            })
            .then(res => {
                dispatch({
                    type: 'PUSHES_REPLACE',
                    bookmarks: res.data || [],
                });
            })

            .catch(err => {
                console.log(err);
            });
    };
};

export const startClock = () =>
    dispatch => {
        return setInterval(
            () => dispatch({ type: 'TICK', light: true, ts: Date.now() }),
            800
        );
    };

// add support for Redux dev tools
const isBrowser = typeof window !== 'undefined';
const composeEnhancers = isBrowser ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export const initStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware))
    );
};
