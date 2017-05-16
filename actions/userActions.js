import Router from 'next/router';
import axios from 'axios';
import { Cookies } from 'react-cookie';

let API = axios.create({
	baseURL: 'http://' + process.env.API_URL,
	withCredentials: true,
	timeout: 5000
});

export const connectPushbullet = () => {};

export const checkUserSession = () => {
	return dispatch => {
		dispatch({
			type: 'USER_CHECK_SESSION'
		});

		return API.get('/auth/user')
			.then(res => {
				if (res.status == 200) {
					dispatch({ type: 'USER_LOGGED_IN' });
				} else {
					dispatch({ type: 'USER_LOGGED_OUT' });
				}
			})
			.catch(err => {
				dispatch({ type: 'USER_LOGGED_OUT' });
			});
	};
};

export const login = form => {
	return dispatch => {
		return API.post('/auth/login', {
			...form
		})
			.then(res => {
				if (res.data && res.data.error) {
					return {
						error: res.data.error
					};
				}

				if (res.status == 200) {
					dispatch({ type: 'USER_LOGGED_IN' });
				}

				return {
					status: res.status
				};
			})
			.catch(err => {
				throw err;
			});
	};
};

export const signup = form => {
	return dispatch => {
		return API.post('/auth/signup', {
			...form
		})
			.then(res => {
				console.log(res);
				if (res.data && res.data.error) {
					return {
						error: res.data.error
					};
				}

				if (res.status == 200) {
					dispatch({ type: 'USER_LOGGED_IN' });
				}

				return {
					status: res.status
				};
			})
			.catch(err => {
				throw err;
			});
	};
};
