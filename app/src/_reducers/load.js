const initialState = {
  userData: {},
  repoData: {
    repositories: []
  },
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
        userData: {
          meta:{
            lastUpdate: Date.now() 
          },
          ...action.userData
        },
      };
    case 'FETCHED_REPODATA':
      return {
        ...state,
        repoData: {
          meta: {
            lastUpdate: Date.now()
          },
          repositories: action.repoData,
        }
      };
    case 'FETCHED_REPODETAILDATA':
      return {
        ...state,
        repoDetailData: {
          meta: {
            lastUpdate: Date.now()
          },
          name: action.repoName,
          path: action.path,
          files: action.repoDetailData,
        },
      };
    case 'FETCHED_FILEDATA':
      return {
        ...state,
        fileData: {
          meta: {
            lastUpdate: Date.now()
          },
          ...action.fileData
        },
      };
    default:
      return state;
  }
};

export default load;
