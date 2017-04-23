import Router from 'next/router'
import axios from 'axios'

let API = axios.create({
	baseURL: 'http://' + process.env.API_URL,
	withCredentials: true,
	timeout: 5000,
})

export const login = form => {
	return dispatch => {
		console.log('hi21')
		return API.post('/login', {
			...form,
		})
			.then(res => {
				console.log('hi22')
				console.log(res)
				if (res.data && res.data.error) {
					return {
						error: res.data.error,
					}
				}

				if (res.status == 200) {
					dispatch({
						type: 'USER_LOGIN',
						sessionId: res.data.sessionId,
					})
				}

				return {
					status: res.status,
				}
			})
			.catch(err => {
				throw err
			})
	}
}

export const signup = form => {
	return dispatch => {
		return API.post('/signup', {
			...form,
		})
			.then(res => {
				console.log(res)
				if (res.data && res.data.error) {
					return {
						error: res.data.error,
					}
				}

				if (res.status == 200) {
					dispatch({
						type: 'USER_LOGIN',
						sessionId: res.data.sessionId,
					})
				}

				return {
					status: res.status,
				}
			})
			.catch(err => {
				throw err
			})
	}
}
