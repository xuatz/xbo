const initialState = {
    isCheckingSession: true,
    isLoggedIn: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "USER_CHECK_SESSION":
            return {
                ...state,
                isCheckingSession: true
            };
        case "USER_LOGGED_IN":
            return {
                ...state,
                isCheckingSession: false,
                isLoggedIn: true
            };
        case "USER_LOGGED_OUT":
            return {
                ...state,
                isCheckingSession: false,
                isLoggedIn: false
            };
        default:
            return state;
    }
};
