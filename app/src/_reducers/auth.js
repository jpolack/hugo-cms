const auth = (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATED':
      return {
        ...state,
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
};

export default auth;
