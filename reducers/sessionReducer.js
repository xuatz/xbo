const initialState = {
	user: null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'USER_LOGIN':
			return {
				...state,
				user: action.user,
			}
		default:
			return state
	}
}
