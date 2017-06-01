import axios from "axios";

let API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:9000",
    withCredentials: true,
    timeout: 5000
});

export const fetchBookmarks = () => {
    return dispatch => {
        //'api.xbo.xuatz.com'
        return API.get("/bookmarks")
            .then(res => {
                dispatch({
                    type: "BOOKMARKS_REPLACE",
                    bookmarks: res.data || []
                });
                return API.get("/bookmarks/fetch", {
                    timeout: 0
                });
            })
            .then(res => {
                dispatch({
                    type: "BOOKMARKS_REPLACE",
                    bookmarks: res.data || []
                });
                dispatch({ type: "BOOKMARKS_GROUP_BY_DOMAIN" });
                dispatch({
                    type: "BOOKMARKS_GROUP_BY_HASHTAG"
                });
            });
    };
};
