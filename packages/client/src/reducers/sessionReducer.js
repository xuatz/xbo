const initialState = {
  isCheckingSession: true,
  isLoggedIn: false,
  user: {
    providers: {},
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_AUTH_PROVIDER': {
      let providers = state.user.providers;
      providers[action.provider] = action.credentials;
      return {
        ...state,
        user: {
          ...state.user,
          providers,
        },
      };
    }
    case 'USER_CHECK_SESSION':
      return {
        ...state,
        isCheckingSession: true,
      };
    case 'USER_LOGGED_IN':
      return {
        ...state,
        isCheckingSession: false,
        isLoggedIn: true,
        user: action.user,
      };
    case 'USER_LOGGED_OUT':
      return {
        ...state,
        isCheckingSession: false,
        isLoggedIn: false,
        user: {},
      };
    default:
      return state;
  }
};
