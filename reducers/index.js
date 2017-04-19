import { combineReducers } from 'redux'
import session from './sessionReducer';
import bookmarks from './bookmarksReducer';

const rootReducer = combineReducers({
    session,
    bookmarks
})

export default rootReducer