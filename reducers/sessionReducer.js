const initialState = {
    user: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGGED_IN':
            console.log('USER_LOGGED_IN')
            console.log(action.user)
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}