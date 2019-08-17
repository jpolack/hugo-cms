import { FETCHED_USERDATA, FETCH_USERDATA } from '../_actions/USERDATA';

const fetchUserData = async (accessToken) => {
  const userResult = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const userData = await userResult.json();
  return userData;
};

const customMiddleWare = (store) => (next) => async (action) => {
  if (action.type !== FETCH_USERDATA().type) {
    next(action);
    return;
  }

  const state = store.getState();

  const userData = await fetchUserData(state.authenticationState.accessToken);

  next(FETCHED_USERDATA(userData));
};

export default customMiddleWare;
