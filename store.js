import { createStore, compose, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';

import axios from 'axios';

export const reducer = (
    state = {
        pushes: [
            {
                title: 'sample',
                body: 'huat ah',
            },
            {
                title: 'sample 2',
                body: 'huat ah 2',
            },
        ],
        lastUpdate: 0,
        light: false,
    },
    action
) => {
    switch (action.type) {
        case 'FETCH_PUSHES':
            return {
                ...state,
                pushes: action.pushes || state.pushes,
            };
        default:
            return state;
    }
};

//actions

let API = axios.create({
    baseURL: process.env.API_URL || 'localhost:9000', //will be uncessary in future after i add in dotenv package
    timeout: 5000,
});

export const fetchPushes = () => {
    dispatch => {
        //'api.xbo.xuatz.com'
        return API.get('/pushes', {
            timeout: 0,
        })
            .then(res => {
                dispatch({
                    type: 'FETCH_PUSHES',
                    pushes: res.data || [],
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

const composeEnhancers = window
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose; // add support for Redux dev tools

export const initStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware))
    );
};
