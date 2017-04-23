const initialState = {
	sessionId: null,
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'USER_LOGIN':
			return {
				...state,
				sessionId: action.sessionId,
			}
		default:
			return state
	}
}
