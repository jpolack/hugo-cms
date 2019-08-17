const auth = (state = {}, action) => {
  switch (action.type) {
    case 'AUTHENTICATE':
      return {
        ...state,
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
};

export default auth;
