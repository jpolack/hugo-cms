import { FETCHED_FILEDATA, FETCH_FILEDATA } from '../_actions/FILEDATA';

const fetchFileData = async (accessToken, url) => {
  const fileResult = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const fileData = await fileResult.json();
  return fileData;
};

const customMiddleWare = (store) => (next) => async (action) => {
  next(action);
  if (action.type !== FETCH_FILEDATA().type) {
    return;
  }

  const state = store.getState();


  const foundFile = state.loadState.repoDetailData.files
    .find((file) => file.path === action.filePath);

  if (!foundFile) {
    return;
  }


  const fileData = await fetchFileData(state.authenticationState.accessToken, foundFile.url);

  next(FETCHED_FILEDATA(fileData));
};

export default customMiddleWare;
