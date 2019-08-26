import base64 from 'base-64';
import { PUSH_FILECREATE, PUSHED_FILECREATE } from '../_actions/FILECREATE';

const pushFileData = async (accessToken, username, repoName, path, createPath) => {
  const fileResult = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${path}${createPath}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      message: `creating ${path}${createPath}`,
      content: base64.encode(''),
    }),
  });
  const fileData = await fileResult.json();
  return fileData;
};

const customMiddleWare = (store) => (next) => async (action) => {
  if (action.type !== PUSH_FILECREATE().type) {
    next(action);
    return;
  }

  const state = store.getState();

  let { path } = state.loadState.repoDetailData;
  if (!path) {
    path = '';
  } else {
    path += '/';
  }

  if (action.createMetadata) {
    console.log('CREATE METADATA');
  }

  if (!action.path) {
    // TODO validation
    next(action);
    return;
  }

  await pushFileData(
    state.authenticationState.accessToken,
    state.loadState.userData.login,
    state.loadState.repoDetailData.name,
    path,
    action.path,
  );

  next(PUSHED_FILECREATE());
};

export default customMiddleWare;
