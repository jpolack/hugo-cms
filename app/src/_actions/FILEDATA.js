export const FETCH_FILEDATA = (fileName) => ({
  type: 'FETCH_FILEDATA',
  name: fileName,
});

export const FETCHED_FILEDATA = (fileData) => ({
  type: 'FETCHED_FILEDATA',
  fileData,
});
