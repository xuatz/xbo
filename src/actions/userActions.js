import axios from 'axios';

let API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:9000',
  withCredentials: true,
  timeout: 5000
});

export const checkUserSession = () => {
  return dispatch => {
    dispatch({
      type: 'USER_CHECK_SESSION'
    });

    return API.get('/auth/user')
      .then(res => {
        console.log("hi2");
        console.log(res);
        if (res.status === 200) {
          dispatch({ type: 'USER_LOGGED_IN', user: res.data });
        } else {
          dispatch({ type: 'USER_LOGGED_OUT' });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'USER_LOGGED_OUT' });
      });
  };
};

export const logout = () => {
  return dispatch => {
    return API.get("/auth/logout").then(res => {
      console.log(res);
      dispatch({ type: "USER_LOGGED_OUT" });
    });
  };
};

export const login = form => {
  return async dispatch => {
    try {
      const res = await API.post('/auth/login', {}, { auth: form });
      if (res.data && res.data.error) {
        return {
          error: res.data.error
        };
      }
      if (res.status === 200) {
        dispatch({ type: 'USER_LOGGED_IN', user: res.data });
      }
      return {
        status: res.status
      };
    } catch (err) {
      console.error(err);
      return {
        status: 400,
        error: err.message
      };
    }
  };
};

export const logout = () => {
  return dispatch => {
    return API.get('/auth/logout').then(res => {
      dispatch({ type: 'USER_LOGGED_OUT' });
    });
  };
};

export const signup = form => {
  return async dispatch => {
    try {
      const res = await API.post('/auth/signup', {}, { auth: form });

      if (res.data && res.data.error) {
        return { error: res.data.error };
      }
      if (res.status === 200) {
        dispatch({ type: 'USER_LOGGED_IN' });
      }
      return { status: res.status };
    } catch (err) {
      console.error(err);
      return {
        status: 400,
        error: err.message
      };
    }
  };
};
