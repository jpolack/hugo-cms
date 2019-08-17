const load = (state = {}, action) => {
  switch (action.type) {
    case 'USERDATA':
      return {
        ...state,
        userData: action.userData,
      };
    case 'REPODATA':
      return {
        ...state,
        repoData: action.repoData,
      };
    default:
      return state;
  }
};

export default load;
