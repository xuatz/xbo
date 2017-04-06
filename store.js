import { createStore, compose, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';

import axios from 'axios';

const groupByDomain = bookmarks => {
    let tmp = _.groupBy(bookmarks, bk => {
        return bk.stats && bk.stats.domain;
    });

    let domains = [];
    _.forIn(tmp, (value, key) => {
        if (key !== 'undefined') {
            domains.push({
                domain: key,
                bookmarks: value.map(bk => {
                    return bk._id;
                }),
            });
        }
    });

    return domains;
};

export const reducer = (
    state = {
        session: {
            user: null,
        },
        bookmarks: [],
    },
    action
) => {
    switch (action.type) {
        case 'PUSHES_REPLACE':
            return {
                ...state,
                bookmarks: action.bookmarks || state.bookmarks,
            };
        case 'BOOKMARKS_GROUP_BY_DOMAIN':
            return {
                ...state,
                stats: {
                    ...state.stats,
                    groupByDomain: groupByDomain(state.bookmarks),
                },
            };
        default:
            return state;
    }
};

//actions

let API = axios.create({
    baseURL: 'http://' + process.env.API_URL,
    timeout: 5000,
});

export const signup = form => {
    return dispatch => {
        console.log(form);

        return Promise.resolve({
            error: 'username taken',
        });
    };
};

export const fetchBookmarks = () => {
    return dispatch => {
        //'api.xbo.xuatz.com'
        return API.get('/bookmarks')
            .then(res => {
                dispatch({
                    type: 'PUSHES_REPLACE',
                    bookmarks: res.data || [],
                });
                dispatch({
                    type: 'BOOKMARKS_GROUP_BY_DOMAIN',
                });

                return API.get('/bookmarks/fetch', {
                    timeout: 0,
                });
            })
            .then(res => {
                dispatch({
                    type: 'PUSHES_REPLACE',
                    bookmarks: res.data || [],
                });
                dispatch({
                    type: 'BOOKMARKS_GROUP_BY_DOMAIN',
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
const composeEnhancers = isBrowser
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export const initStore = initialState => {
    return createStore(
        reducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware))
    );
};
