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
