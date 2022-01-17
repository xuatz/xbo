import axios from 'axios'

let API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9000',
  withCredentials: true,
  timeout: 5000,
})

export const deleteBookmark = (id) => {
  console.log('deleteBookmark', id)
  return (dispatch) => {
    dispatch({
      type: 'BOOKMARKS_REMOVE_BY_ID',
      id,
    })
    return API.delete('/bookmarks/' + id)
      .then((res) => {
        // console.log(res);
        // if (res.status === 200) {
        // }
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  }
}

export const getBookmarksUncategorised = () => {
  return (dispatch) => {
    return API.get('/bookmarks?type=magic').then((res) => {
      if (res.status === 200) {
        dispatch({
          type: 'BOOKMARKS_UNCATEGORISED_REPLACE',
          uncategorised: res.data || [],
        })
      }
    })
  }
}

export const fetchBookmarks = () => {
  return (dispatch) => {
    //'api.xbo.xuatz.com'
    return API.get('/bookmarks')
      .then((res) => {
        if (res.data !== 'OK') {
          dispatch({
            type: 'BOOKMARKS_REPLACE',
            bookmarks: res.data || [],
          })
        }

        return API.get('/bookmarks/fetch', {
          timeout: 0,
        })
      })
      .then((res) => {
        if (res.data !== 'OK') {
          dispatch({
            type: 'BOOKMARKS_REPLACE',
            bookmarks: res.data || [],
          })
        }
      })
  }
}

export const updateBookmarkTags = (id, tags) => {
  return (dispatch) => {
    return API.put(`/bookmarks/${id}/tags`, { tags }).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: 'BOOKMARK_REPLACE',
          uncategorised: res.data,
        })
      }
    })
  }
}
