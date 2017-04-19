import Router from 'next/router'
import axios from 'axios'

let API = axios.create({
	baseURL: 'http://' + process.env.API_URL,
	withCredentials: true,
	timeout: 5000,
})

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
						type: 'USER_LOGGED_IN',
						user: res.data.user,
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
