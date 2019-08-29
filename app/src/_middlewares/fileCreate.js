import base64 from 'base-64';
import moment from 'moment';
import { PUSH_FILECREATE, PUSHED_FILECREATE } from '../_actions/FILECREATE';

const pushFileData = async (accessToken, username, repoName, path, createPath, content) => {
  const fileResult = await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${path}${createPath}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      message: `creating ${path}${createPath}`,
      content,
    }),
  });
  const fileData = await fileResult.json();
  return fileData;
};

const customMiddleWare = (store) => (next) => async (action) => {
  next(action);
  if (action.type !== PUSH_FILECREATE().type) {
    return;
  }

  const state = store.getState();

  let { path } = state.loadState.repoDetailData;
  if (!path) {
    path = '';
  } else {
    path += '/';
  }

  let content = base64.encode('');
  if (action.createMetadata) {
    content = base64.encode(`---\ntitle: ${JSON.stringify('')}\ndate: ${moment().format()}\ndraft: ${true}\nweight: 0\ntags: []\n---\n\n`);
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
    content,
  );

  next(PUSHED_FILECREATE());
};

export default customMiddleWare;
