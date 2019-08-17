const initialState = {
  userData: {},
  repoData: [],
  repoDetailData: {
    files: [],
  },
  fileData: {},
};

const load = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCHED_USERDATA':
      return {
        ...state,
        userData: action.userData,
      };
    case 'FETCHED_REPODATA':
      return {
        ...state,
        repoData: action.repoData,
      };
    case 'FETCHED_REPODETAILDATA':
      return {
        ...state,
        repoDetailData: {
          name: action.repoName,
          path: action.path,
          files: action.repoDetailData,
        },
      };
    case 'FETCHED_FILEDATA':
      return {
        ...state,
        fileData: action.fileData,
      };
    default:
      return state;
  }
};

export default load;
