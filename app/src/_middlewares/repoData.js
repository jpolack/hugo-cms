import { FETCHED_REPODATA, FETCH_REPODATA } from '../_actions/REPODATA';

const fetchRepoData = async (accessToken, url) => {
  const userResult = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const userData = await userResult.json();
  return userData;
};

const customMiddleWare = (store) => (next) => async (action) => {
  next(action);
  if (action.type !== FETCH_REPODATA().type) {
    return;
  }

  const state = store.getState();

  const repoData = await fetchRepoData(state.authenticationState.accessToken, action.url);

  next(FETCHED_REPODATA(repoData));
};

export default customMiddleWare;
