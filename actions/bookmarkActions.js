import Router from 'next/router';
import axios from 'axios';

let API = axios.create({
    baseURL: 'http://' + process.env.API_URL,
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
