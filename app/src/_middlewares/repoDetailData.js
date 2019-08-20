import { FETCHED_REPODETAILDATA, FETCH_REPODETAILDATA } from '../_actions/REPODETAILDATA';

const fetchRepoDetailData = async (accessToken, url, subpath) => {
  const replacer = subpath
    ? `/${subpath}`
    : '';

  const replacedUrl = url.replace(/\/\{\+path\}/i, replacer);
  const authorizationHeader = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const repoResult = await fetch(replacedUrl, authorizationHeader);
  const repoData = await repoResult.json();

  return repoData;
};

const customMiddleWare = (store) => (next) => async (action) => {
  if (action.type !== FETCH_REPODETAILDATA().type) {
    next(action);
    return;
  }
  const state = store.getState();

  const foundRepo = state.loadState.repoData.repositories
    .find((repo) => repo.name === action.repoName);

  const repoDetailData = await fetchRepoDetailData(
    state.authenticationState.accessToken, foundRepo.contents_url, action.path,
  );
  next(FETCHED_REPODETAILDATA(action.repoName, action.path, repoDetailData));
};

export default customMiddleWare;
