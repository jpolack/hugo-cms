const initialState = {
  userData: {
    meta: {
      loading: false,
    },
  },
  repoData: {
    meta: {
      loading: false,
    },
    repositories: [],
  },
  repoDetailData: {
    meta: {
      loading: false,
    },
    name: undefined,
    path: undefined,
    files: [],
  },
  fileData: {
    meta: {
      loading: false,
    },
  },
};

const load = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERDATA':
      return {
        ...state,
        userData: {
          ...state.userData,
          meta: {
            ...state.userData.meta,
            loading: true,
          },
        },
      };
    case 'FETCH_REPODATA':
      return {
        ...state,
        repoData: {
          ...state.repoData,
          meta: {
            ...state.repoData.meta,
            loading: true,
          },
        },
      };
    case 'FETCH_REPODETAILDATA':
      return {
        ...state,
        repoDetailData: {
          ...state.repoDetailData,
          meta: {
            ...state.repoDetailData.meta,
            loading: true,
          },
        },
      };
    case 'FETCH_FILEDATA':
      return {
        ...state,
        fileData: {
          ...state.fileData,
          meta: {
            ...state.fileData.meta,
            loading: true,
          },
        },
      };
    case 'FETCHED_USERDATA':
      return {
        ...state,
        userData: {
          meta: {
            loading: false,
            lastUpdate: Date.now(),
          },
          ...action.userData,
        },
      };
    case 'FETCHED_REPODATA':
      return {
        ...state,
        repoData: {
          meta: {
            loading: false,
            lastUpdate: Date.now(),
          },
          repositories: action.repoData,
        },
      };
    case 'FETCHED_REPODETAILDATA':
      return {
        ...state,
        repoDetailData: {
          meta: {
            loading: false,
            lastUpdate: Date.now(),
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
            loading: false,
            lastUpdate: Date.now(),
          },
          ...action.fileData,
        },
      };
    default:
      return state;
  }
};

export default load;
