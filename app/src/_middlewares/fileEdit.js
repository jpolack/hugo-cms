import base64 from 'base-64';
import utf8 from 'utf8';
import { PUSH_FILEEDIT, PUSHED_FILEEDIT } from '../_actions/FILEEDIT';

const pushFileData = async (accessToken, url, newContent, oldSha, filepath) => {
  const fileResult = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      message: `Updating ${filepath}`,
      content: newContent,
      sha: oldSha,
    }),
  });
  const fileData = await fileResult.json();
  return fileData;
};

const customMiddleWare = (store) => (next) => async (action) => {
  next(action);
  if (action.type !== PUSH_FILEEDIT().type) {
    return;
  }

  const state = store.getState();

  const file = state.loadState.fileData;

  let metaContent = '';
  if (action.metaData) {
    metaContent = `---\ntitle: ${JSON.stringify(action.metaData.title)}\ndate: ${action.metaData.date}\ndraft: ${action.metaData.draft}\nweight: ${action.metaData.weight}\ntags: ${action.metaData.tags}\n---\n\n`;
  }

  const content = metaContent + action.fileContent;

  await pushFileData(
    state.authenticationState.accessToken,
    file.url,
    base64.encode(utf8.encode(content)),
    file.sha,
    file.path,
  );

  next(PUSHED_FILEEDIT());
};

export default customMiddleWare;
